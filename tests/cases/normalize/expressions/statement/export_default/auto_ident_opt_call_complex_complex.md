# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $($)?.($(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCallObj = tmpChainElementCall;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = tmpChainRootCall;
  const tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
  tmpAnonDefaultExport = tmpChainElementCall$1;
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCallVal = tmpChainElementCall.call;
  const tmpCalleeParam$1 = $(1);
  const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementCall, $, tmpCalleeParam$1);
  tmpAnonDefaultExport = tmpChainElementCall$1;
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
