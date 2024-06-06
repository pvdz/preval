# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Export default > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
export default a = b?.x.y.z;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: { z: 100 } } };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = b?.x.y.z);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$3 = tmpChainElementObject$1.z;
  a = tmpChainElementObject$3;
} else {
}
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
$(100);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 100;
export { a as default from "undefined"
$( 100 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
