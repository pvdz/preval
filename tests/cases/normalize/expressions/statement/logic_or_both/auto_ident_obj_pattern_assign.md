# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Statement > Logic or both > Auto ident obj pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
({ x, y } = { x: $(3), y: $(4) }) || ({ x, y } = { x: $(3), y: $(4) });
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
({ x, y } = { x: $(3), y: $(4) }) || ({ x, y } = { x: $(3), y: $(4) });
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpIfTest = tmpNestedAssignObjPatternRhs;
if (tmpIfTest) {
} else {
  const tmpObjLitVal$3 = $(3);
  const tmpObjLitVal$5 = $(4);
  const tmpAssignObjPatternRhs = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
  x = tmpAssignObjPatternRhs.x;
  y = tmpAssignObjPatternRhs.y;
}
$(a, x, y);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
let tmpSSA_x = tmpNestedAssignObjPatternRhs.x;
let tmpSSA_y = tmpNestedAssignObjPatternRhs.y;
if (tmpNestedAssignObjPatternRhs) {
} else {
  const tmpObjLitVal$3 = $(3);
  const tmpObjLitVal$5 = $(4);
  const tmpAssignObjPatternRhs = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
  tmpSSA_x = tmpAssignObjPatternRhs.x;
  tmpSSA_y = tmpAssignObjPatternRhs.y;
}
$(a, tmpSSA_x, tmpSSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
