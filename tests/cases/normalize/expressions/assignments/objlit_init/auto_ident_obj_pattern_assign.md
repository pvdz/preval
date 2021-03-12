# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$({ x: (a = { x, y } = { x: $(3), y: $(4) }) });
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$({ x: (a = { x, y } = { x: $(3), y: $(4) }) });
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal$1 = $(3);
const tmpObjLitVal$2 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal$1, y: tmpObjLitVal$2 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = $(3);
const tmpObjLitVal$2 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal$1, y: tmpObjLitVal$2 };
const SSA_x = tmpNestedAssignObjPatternRhs.x;
const SSA_y = tmpNestedAssignObjPatternRhs.y;
const tmpCalleeParam = { x: tmpNestedAssignObjPatternRhs };
$(tmpCalleeParam);
$(tmpNestedAssignObjPatternRhs, SSA_x, SSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { x: '{"x":"3","y":"4"}' }
 - 4: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
