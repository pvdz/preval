# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $($)?.(1);
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
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
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
  const tmpChainElementCall$1 = tmpChainElementCall.call($, 1);
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
