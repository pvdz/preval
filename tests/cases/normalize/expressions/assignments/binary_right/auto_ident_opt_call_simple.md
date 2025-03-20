# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $?.(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
  $(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpChainElementCall;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpChainElementCall);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
if ($ == null) {
  $(tmpBinBothLhs + undefined);
  $(undefined);
} else {
  const tmpChainElementCall = $(1);
  $(tmpBinBothLhs + tmpChainElementCall);
  $(tmpChainElementCall);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $ == null;
if (b) {
  const c = a + undefined;
  $( c );
  $( undefined );
}
else {
  const d = $( 1 );
  const e = a + d;
  $( e );
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 101
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
