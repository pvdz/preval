# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Statement > Export default > Auto ident obj pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
export default { x, y } = { x: $(3), y: $(4) };
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ({ x: x, y: y } = { x: $(3), y: $(4) });
export { tmpAnonDefaultExport as default };
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpAnonDefaultExport = tmpNestedAssignObjPatternRhs;
export { tmpAnonDefaultExport as default };
$(a, x, y);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
tmpAnonDefaultExport = tmpNestedAssignObjPatternRhs;
export { tmpAnonDefaultExport as default };
$(a, tmpObjLitVal, tmpObjLitVal$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
let b = undefined;
const c = $( 3 );
const d = $( 4 );
const e = {
  x: c,
  y: d,
};
b = e;
export { b as default };
$( a, c, d );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
