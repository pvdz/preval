# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.($(1)) + $($)?.($(1));
$(a);
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
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCallCallee = $dotCall;
  const tmpCalleeParam = tmpChainElementCall;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  tmpBinBothLhs = tmpChainElementCall$1;
} else {
}
let tmpBinBothRhs = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = tmpChainRootCall$1($);
const tmpIfTest$1 = tmpChainElementCall$3 != null;
if (tmpIfTest$1) {
  const tmpCallCallee$1 = $dotCall;
  const tmpCalleeParam$5 = tmpChainElementCall$3;
  const tmpCalleeParam$7 = tmpChainRootCall$1;
  const tmpCalleeParam$9 = $(1);
  const tmpChainElementCall$5 = tmpCallCallee$1(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
  tmpBinBothRhs = tmpChainElementCall$5;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
let tmpBinBothLhs = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
  tmpBinBothLhs = tmpChainElementCall$1;
}
let tmpBinBothRhs = undefined;
const tmpChainElementCall$3 = $($);
const tmpIfTest$1 = tmpChainElementCall$3 == null;
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$9 = $(1);
  const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, tmpCalleeParam$9);
  tmpBinBothRhs = tmpChainElementCall$5;
}
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  const d = $( 1 );
  const e = $dotCall( b, $, d );
  a = e;
}
let f = undefined;
const g = $( $ );
const h = g == null;
if (h) {

}
else {
  const i = $( 1 );
  const j = $dotCall( g, $, i );
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

## Result

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

Final output calls: Same
