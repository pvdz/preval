# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.($(1))) + (a = $($)?.($(1))));
$(a);
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpBinBothLhs = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$1);
}
const tmpChainElementCall$3 /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$3 == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
  $(undefined);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpClusterSSA_a$2 /*:unknown*/ = $dotCall(tmpChainElementCall$3, $, undefined, tmpCalleeParam$3);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$2;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a$2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpBinBothLhs = undefined;
if (!tmpIfTest) {
  tmpBinBothLhs = $dotCall(tmpChainElementCall, $, undefined, $(1));
}
const tmpChainElementCall$3 = $($);
if (tmpChainElementCall$3 == null) {
  $(tmpBinBothLhs + undefined);
  $(undefined);
} else {
  const tmpClusterSSA_a$2 = $dotCall(tmpChainElementCall$3, $, undefined, $(1));
  $(tmpBinBothLhs + tmpClusterSSA_a$2);
  $(tmpClusterSSA_a$2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
let c = undefined;
if (b) {

}
else {
  const d = $( 1 );
  c = $dotCall( a, $, undefined, d );
}
const e = $( $ );
const f = e == null;
if (f) {
  const g = c + undefined;
  $( g );
  $( undefined );
}
else {
  const h = $( 1 );
  const i = $dotCall( e, $, undefined, h );
  const j = c + i;
  $( j );
  $( i );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  let tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, tmpCalleeParam$1);
  a = tmpChainElementCall$1;
} else {
}
const tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = $($);
const tmpIfTest$1 = tmpChainElementCall$3 != null;
if (tmpIfTest$1) {
  let tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, tmpChainRootCall$1, undefined, tmpCalleeParam$3);
  a = tmpChainElementCall$5;
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
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: '<$>'
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
