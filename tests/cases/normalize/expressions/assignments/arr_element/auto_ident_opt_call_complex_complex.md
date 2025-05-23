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
  const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpChainElementCall$3, $, undefined, tmpCalleeParam$3);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a);
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
  const tmpClusterSSA_a = $dotCall(tmpChainElementCall$3, $, undefined, $(1));
  $(tmpBinBothLhs + tmpClusterSSA_a);
  $(tmpClusterSSA_a);
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
