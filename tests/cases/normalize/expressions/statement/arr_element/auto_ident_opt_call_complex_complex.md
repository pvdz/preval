# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.($(1)) + $($)?.($(1));
$(a);
`````

## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
  tmpBinBothLhs = tmpChainElementCall$1;
}
let tmpBinBothRhs /*:unknown*/ = undefined;
const tmpChainElementCall$3 /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$3 == null;
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$9 /*:unknown*/ = $(1);
  const tmpChainElementCall$5 /*:unknown*/ = $dotCall(tmpChainElementCall$3, $, undefined, tmpCalleeParam$9);
  tmpBinBothRhs = tmpChainElementCall$5;
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  tmpBinBothLhs = $dotCall(tmpChainElementCall, $, undefined, $(1));
}
let tmpBinBothRhs = undefined;
const tmpChainElementCall$3 = $($);
if (!(tmpChainElementCall$3 == null)) {
  tmpBinBothRhs = $dotCall(tmpChainElementCall$3, $, undefined, $(1));
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.($(1)) + $($)?.($(1));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCalleeParam = tmpChainElementCall;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
  tmpBinBothLhs = tmpChainElementCall$1;
} else {
}
let tmpBinBothRhs = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = $($);
const tmpIfTest$1 = tmpChainElementCall$3 != null;
if (tmpIfTest$1) {
  const tmpCalleeParam$5 = tmpChainElementCall$3;
  const tmpCalleeParam$7 = tmpChainRootCall$1;
  const tmpCalleeParam$9 = $(1);
  const tmpChainElementCall$5 = $dotCall(tmpCalleeParam$5, tmpCalleeParam$7, undefined, tmpCalleeParam$9);
  tmpBinBothRhs = tmpChainElementCall$5;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  const d = $( 1 );
  const e = $dotCall( b, $, undefined, d );
  a = e;
}
let f = undefined;
const g = $( $ );
const h = g == null;
if (h) {

}
else {
  const i = $( 1 );
  const j = $dotCall( g, $, undefined, i );
  f = j;
}
a + f;
const k = {
  a: 999,
  b: 1000,
};
$( k );
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
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
