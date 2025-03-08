# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt call complex complex
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
let tmpBinBothLhs /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$5);
  tmpBinBothLhs = tmpChainElementCall$1;
}
let tmpClusterSSA_a /*:unknown*/ = undefined;
const tmpChainElementCall$3 /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$3 == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$11 /*:unknown*/ = $(1);
  const tmpChainElementCall$5 /*:unknown*/ = $dotCall(tmpChainElementCall$3, $, undefined, tmpCalleeParam$11);
  tmpClusterSSA_a = tmpChainElementCall$5;
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpChainElementCall$5;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(tmpClusterSSA_a);
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
let tmpClusterSSA_a = undefined;
const tmpChainElementCall$3 = $($);
if (tmpChainElementCall$3 == null) {
  $(tmpBinBothLhs + undefined);
} else {
  const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, undefined, $(1));
  tmpClusterSSA_a = tmpChainElementCall$5;
  $(tmpBinBothLhs + tmpChainElementCall$5);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.($(1))) + (a = $($)?.($(1))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCalleeParam$1 = tmpChainElementCall;
  const tmpCalleeParam$3 = tmpChainRootCall;
  const tmpCalleeParam$5 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpCalleeParam$1, tmpCalleeParam$3, undefined, tmpCalleeParam$5);
  a = tmpChainElementCall$1;
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = $($);
const tmpIfTest$1 = tmpChainElementCall$3 != null;
if (tmpIfTest$1) {
  const tmpCalleeParam$7 = tmpChainElementCall$3;
  const tmpCalleeParam$9 = tmpChainRootCall$1;
  const tmpCalleeParam$11 = $(1);
  const tmpChainElementCall$5 = $dotCall(tmpCalleeParam$7, tmpCalleeParam$9, undefined, tmpCalleeParam$11);
  a = tmpChainElementCall$5;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
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
  const e = $dotCall( a, $, undefined, d );
  c = e;
}
let f = undefined;
const g = $( $ );
const h = g == null;
if (h) {
  const i = c + undefined;
  $( i );
}
else {
  const j = $( 1 );
  const k = $dotCall( g, $, undefined, j );
  f = k;
  const l = c + k;
  $( l );
}
$( f );
`````

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
