# Preval test case

# auto_ident_opt_call_complex_complex.md

> normalize > expressions > statement > arr_element > auto_ident_opt_call_complex_complex
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
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = tmpChainRootCall;
  const tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
}
const tmpChainRootCall$1 = $;
const tmpChainElementCall$2 = tmpChainRootCall$1($);
if (tmpChainElementCall$2) {
  const tmpCallObj$1 = tmpChainElementCall$2;
  const tmpCallVal$1 = tmpCallObj$1.call;
  const tmpCalleeParam$2 = tmpChainRootCall$1;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$3 = tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$2, tmpCalleeParam$3);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = tmpChainRootCall;
  const tmpCalleeParam$1 = $(1);
  tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
}
const tmpChainRootCall$1 = $;
const tmpChainElementCall$2 = tmpChainRootCall$1($);
if (tmpChainElementCall$2) {
  const tmpCallObj$1 = tmpChainElementCall$2;
  const tmpCallVal$1 = tmpCallObj$1.call;
  const tmpCalleeParam$2 = tmpChainRootCall$1;
  const tmpCalleeParam$3 = $(1);
  tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$2, tmpCalleeParam$3);
}
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
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
