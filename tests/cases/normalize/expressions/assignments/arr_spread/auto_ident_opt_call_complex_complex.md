# Preval test case

# auto_ident_opt_call_complex_complex.md

> normalize > expressions > assignments > arr_spread > auto_ident_opt_call_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = $($)?.($(1)))]);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpArrSpread;
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
tmpArrSpread = tmpNestedComplexRhs;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpArrSpread;
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
tmpArrSpread = tmpNestedComplexRhs;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
