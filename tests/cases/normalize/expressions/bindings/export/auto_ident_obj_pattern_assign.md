# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Bindings > Export > Auto ident obj pattern assign
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

export let a = ({ x, y } = { x: $(3), y: $(4) });
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = ({ x: x, y: y } = { x: $(3), y: $(4) });
export { a };
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = undefined;
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
export { a };
$(a, x, y);
`````

## Output

`````js filename=intro
let a = undefined;
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
a = tmpNestedAssignObjPatternRhs;
export { a };
$(a, tmpObjLitVal, tmpObjLitVal$1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
