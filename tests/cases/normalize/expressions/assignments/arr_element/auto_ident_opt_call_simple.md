# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) + (a = $?.(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  tmpBinBothLhs = $(1);
}
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
  $(undefined);
} else {
  const tmpClusterSSA_a$2 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$2;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a$2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $ == null;
let tmpBinBothLhs = undefined;
if (!tmpIfTest) {
  tmpBinBothLhs = $(1);
}
if ($ == null) {
  $(tmpBinBothLhs + undefined);
  $(undefined);
} else {
  const tmpClusterSSA_a$2 = $(1);
  $(tmpBinBothLhs + tmpClusterSSA_a$2);
  $(tmpClusterSSA_a$2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
let b = undefined;
if (a) {

}
else {
  b = $( 1 );
}
const c = $ == null;
if (c) {
  const d = b + undefined;
  $( d );
  $( undefined );
}
else {
  const e = $( 1 );
  const f = b + e;
  $( f );
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
const tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpIfTest$1 = tmpChainRootCall$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementCall$1 = tmpChainRootCall$1(1);
  a = tmpChainElementCall$1;
} else {
}
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
