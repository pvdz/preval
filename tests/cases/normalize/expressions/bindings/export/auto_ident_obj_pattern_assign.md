# Preval test case

# auto_ident_obj_pattern_assign.md

> normalize > expressions > bindings > export > auto_ident_obj_pattern_assign
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

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a;
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
let x = 1;
let y = 2;
let a;
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
export { a };
$(a, x, y);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same