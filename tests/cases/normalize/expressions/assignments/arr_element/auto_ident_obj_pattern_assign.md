# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > Arr element > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(
  (a = { x, y } = { x: $(3), y: $(4) }) + (a = { x, y } = { x: $(3), y: $(4) })
);
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
let tmpBinBothLhs = a;
const tmpObjLitVal$2 = $(3);
const tmpObjLitVal$3 = $(4);
const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
x = tmpNestedAssignObjPatternRhs$1.x;
y = tmpNestedAssignObjPatternRhs$1.y;
a = tmpNestedAssignObjPatternRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
tmpNestedAssignObjPatternRhs.x;
tmpNestedAssignObjPatternRhs.y;
const tmpObjLitVal$2 = $(3);
const tmpObjLitVal$3 = $(4);
const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
const SSA_x$1 = tmpNestedAssignObjPatternRhs$1.x;
const SSA_y$1 = tmpNestedAssignObjPatternRhs$1.y;
const tmpCalleeParam = tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignObjPatternRhs$1, SSA_x$1, SSA_y$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 3
 - 4: 4
 - 5: '[object Object][object Object]'
 - 6: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
