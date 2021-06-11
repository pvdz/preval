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

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = $($)?.(1);
export { tmpAnonDefaultExport as default };
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
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
  tmpAnonDefaultExport = tmpChainElementCall$1;
} else {
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
let tmpAnonDefaultExport = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
  tmpAnonDefaultExport = tmpChainElementCall$1;
}
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
