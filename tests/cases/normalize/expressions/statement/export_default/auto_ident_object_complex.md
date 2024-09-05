# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default { x: $(1), y: 2, z: $(3) };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = { x: $(1), y: 2, z: $(3) };
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
const tmpAnonDefaultExport = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const tmpAnonDefaultExport = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = {
  x: a,
  y: 2,
  z: b,
};
export { c as default };
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
