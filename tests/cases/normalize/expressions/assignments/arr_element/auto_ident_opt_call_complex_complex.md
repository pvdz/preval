# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.($(1))) + (a = $($)?.($(1))));
$(a);
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
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCallCallee$1 = $dotCall;
  const tmpCalleeParam$1 = tmpChainElementCall;
  const tmpCalleeParam$3 = tmpChainRootCall;
  const tmpCalleeParam$5 = $(1);
  const tmpChainElementCall$1 = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
  a = tmpChainElementCall$1;
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = tmpChainRootCall$1($);
const tmpIfTest$1 = tmpChainElementCall$3 != null;
if (tmpIfTest$1) {
  const tmpCallCallee$3 = $dotCall;
  const tmpCalleeParam$7 = tmpChainElementCall$3;
  const tmpCalleeParam$9 = tmpChainRootCall$1;
  const tmpCalleeParam$11 = $(1);
  const tmpChainElementCall$5 = tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9, tmpCalleeParam$11);
  a = tmpChainElementCall$5;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpBinBothLhs = undefined;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$5 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$5);
  a = tmpChainElementCall$1;
  tmpBinBothLhs = tmpChainElementCall$1;
}
const tmpChainElementCall$3 = $($);
const tmpIfTest$1 = tmpChainElementCall$3 == null;
let tmpCalleeParam = undefined;
if (tmpIfTest$1) {
  tmpCalleeParam = tmpBinBothLhs + a;
  $(tmpCalleeParam);
} else {
  const tmpCalleeParam$11 = $(1);
  const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, tmpCalleeParam$11);
  a = tmpChainElementCall$5;
  tmpCalleeParam = tmpBinBothLhs + tmpChainElementCall$5;
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  const e = $( 1 );
  const f = $dotCall( b, $, e );
  a = f;
  d = f;
}
const g = $( $ );
const h = g == null;
let i = undefined;
if (h) {
  i = d + a;
  $( i );
}
else {
  const j = $( 1 );
  const k = $dotCall( g, $, j );
  a = k;
  i = d + k;
  $( i );
}
$( a );
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
 - 7: 2
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
