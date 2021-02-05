# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> normalize > expressions > statement > binary_both > auto_ident_obj_pattern_assign_seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })) +
  ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpAssignObjPatternRhs.x;
y = tmpAssignObjPatternRhs.y;
tmpAssignObjPatternRhs;
$(x);
$(y);
const tmpObjLitVal$2 = $(3);
const tmpObjLitVal$3 = $(4);
const tmpAssignObjPatternRhs$1 = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
x = tmpAssignObjPatternRhs$1.x;
y = tmpAssignObjPatternRhs$1.y;
tmpAssignObjPatternRhs$1;
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpAssignObjPatternRhs.x;
y = tmpAssignObjPatternRhs.y;
$(x);
$(y);
const tmpObjLitVal$2 = $(3);
const tmpObjLitVal$3 = $(4);
const tmpAssignObjPatternRhs$1 = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
x = tmpAssignObjPatternRhs$1.x;
y = tmpAssignObjPatternRhs$1.y;
$(a, x, y);
`````

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

Normalized calls: Same

Final output calls: Same
