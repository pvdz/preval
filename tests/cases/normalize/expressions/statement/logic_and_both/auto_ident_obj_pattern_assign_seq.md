# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > Logic and both > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })) &&
  ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })) && ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpIfTest;
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpIfTest = tmpNestedAssignObjPatternRhs;
if (tmpIfTest) {
  $(x);
  $(y);
  const tmpObjLitVal$2 = $(3);
  const tmpObjLitVal$3 = $(4);
  const tmpAssignObjPatternRhs = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
  x = tmpAssignObjPatternRhs.x;
  y = tmpAssignObjPatternRhs.y;
}
$(a, x, y);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
let SSA_x = tmpNestedAssignObjPatternRhs.x;
let SSA_y = tmpNestedAssignObjPatternRhs.y;
if (tmpNestedAssignObjPatternRhs) {
  $(SSA_x);
  $(SSA_y);
  const tmpObjLitVal$2 = $(3);
  const tmpObjLitVal$3 = $(4);
  const tmpAssignObjPatternRhs = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
  SSA_x = tmpAssignObjPatternRhs.x;
  SSA_y = tmpAssignObjPatternRhs.y;
}
$(a, SSA_x, SSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 3
 - 6: 4
 - 7: 3
 - 8: 4
 - 9: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
