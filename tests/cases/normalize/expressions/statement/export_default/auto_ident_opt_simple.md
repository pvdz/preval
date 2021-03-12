# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident opt simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
export default b?.x;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = b?.x;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpAnonDefaultExport = tmpChainElementObject;
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.x;
  tmpAnonDefaultExport = tmpChainElementObject;
}
export { tmpAnonDefaultExport as default };
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
