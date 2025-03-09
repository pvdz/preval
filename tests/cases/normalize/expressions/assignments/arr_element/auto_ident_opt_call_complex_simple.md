# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.(1)) + (a = $($)?.(1)));
$(a);
`````

## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpBinBothLhs /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  tmpBinBothLhs = tmpChainElementCall$1;
}
const tmpChainElementCall$3 /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$3 == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
  $(undefined);
} else {
  const tmpChainElementCall$5 /*:unknown*/ = $dotCall(tmpChainElementCall$3, $, undefined, 1);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpChainElementCall$5;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpChainElementCall$5);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpBinBothLhs = undefined;
if (!tmpIfTest) {
  tmpBinBothLhs = $dotCall(tmpChainElementCall, $, undefined, 1);
}
const tmpChainElementCall$3 = $($);
if (tmpChainElementCall$3 == null) {
  $(tmpBinBothLhs + undefined);
  $(undefined);
} else {
  const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, undefined, 1);
  $(tmpBinBothLhs + tmpChainElementCall$5);
  $(tmpChainElementCall$5);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.(1)) + (a = $($)?.(1)));
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
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, 1);
  a = tmpChainElementCall$1;
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = $($);
const tmpIfTest$1 = tmpChainElementCall$3 != null;
if (tmpIfTest$1) {
  const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, tmpChainRootCall$1, undefined, 1);
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
  const d = $dotCall( a, $, undefined, 1 );
  c = d;
}
const e = $( $ );
const f = e == null;
if (f) {
  const g = c + undefined;
  $( g );
  $( undefined );
}
else {
  const h = $dotCall( e, $, undefined, 1 );
  const i = c + h;
  $( i );
  $( h );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 2
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
