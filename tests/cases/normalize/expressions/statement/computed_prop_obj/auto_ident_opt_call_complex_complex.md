# Preval test case

# auto_ident_opt_call_complex_complex.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_opt_call_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($($)?.($(1)))["a"];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = tmpChainRootCall;
  const tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
  tmpCompObj = tmpChainElementCall$1;
}
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
({});
let tmpCompObj = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = tmpChainRootCall;
  const tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
  tmpCompObj = tmpChainElementCall$1;
}
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
