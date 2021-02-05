# Preval test case

# auto_ident_opt_call_complex_complex.md

> normalize > expressions > assignments > arr_element > auto_ident_opt_call_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)?.($(1))) + (a = $($)?.($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$2 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$2);
  tmpNestedComplexRhs = tmpChainElementCall$1;
}
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1 = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$2 = tmpChainRootCall$1($);
if (tmpChainElementCall$2) {
  const tmpCallObj$1 = tmpChainElementCall$2;
  const tmpCallVal$1 = tmpCallObj$1.call;
  const tmpCalleeParam$3 = tmpChainRootCall$1;
  const tmpCalleeParam$4 = $(1);
  const tmpChainElementCall$3 = tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$3, tmpCalleeParam$4);
  tmpNestedComplexRhs$1 = tmpChainElementCall$3;
}
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$2 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$2);
  tmpNestedComplexRhs = tmpChainElementCall$1;
}
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1 = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$2 = tmpChainRootCall$1($);
if (tmpChainElementCall$2) {
  const tmpCallObj$1 = tmpChainElementCall$2;
  const tmpCallVal$1 = tmpCallObj$1.call;
  const tmpCalleeParam$3 = tmpChainRootCall$1;
  const tmpCalleeParam$4 = $(1);
  const tmpChainElementCall$3 = tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$3, tmpCalleeParam$4);
  tmpNestedComplexRhs$1 = tmpChainElementCall$3;
}
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

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

Normalized calls: Same

Final output calls: Same
