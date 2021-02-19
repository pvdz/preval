# Preval test case

# auto_ident_opt_call_complex_complex.md

> normalize > expressions > statement > binary_both > auto_ident_opt_call_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

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
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = tmpChainRootCall;
  const tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
  tmpBinBothLhs = tmpChainElementCall$1;
}
let tmpBinBothRhs = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$2 = tmpChainRootCall$1($);
const tmpIfTest$1 = tmpChainElementCall$2 != null;
if (tmpIfTest$1) {
  const tmpCallObj$1 = tmpChainElementCall$2;
  const tmpCallVal$1 = tmpCallObj$1.call;
  const tmpCalleeParam$2 = tmpChainRootCall$1;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$3 = tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$2, tmpCalleeParam$3);
  tmpBinBothRhs = tmpChainElementCall$3;
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCallVal = tmpChainElementCall.call;
  const tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementCall, $, tmpCalleeParam$1);
  tmpBinBothLhs = tmpChainElementCall$1;
}
let tmpBinBothRhs = undefined;
const tmpChainElementCall$2 = $($);
const tmpIfTest$1 = tmpChainElementCall$2 != null;
if (tmpIfTest$1) {
  const tmpCallVal$1 = tmpChainElementCall$2.call;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$3 = tmpCallVal$1.call(tmpChainElementCall$2, $, tmpCalleeParam$3);
  tmpBinBothRhs = tmpChainElementCall$3;
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
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

Normalized calls: Same

Final output calls: Same
