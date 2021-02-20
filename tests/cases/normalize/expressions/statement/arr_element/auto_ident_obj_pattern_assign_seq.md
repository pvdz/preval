# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > Arr element > Auto ident obj pattern assign seq
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
let tmpBinBothLhs;
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpBinBothLhs = tmpNestedAssignObjPatternRhs;
let tmpBinBothRhs;
$(x);
$(y);
const tmpObjLitVal$2 = $(3);
const tmpObjLitVal$3 = $(4);
const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
x = tmpNestedAssignObjPatternRhs$1.x;
y = tmpNestedAssignObjPatternRhs$1.y;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
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
const SSA_x = tmpNestedAssignObjPatternRhs.x;
const SSA_y = tmpNestedAssignObjPatternRhs.y;
$(SSA_x);
$(SSA_y);
const tmpObjLitVal$2 = $(3);
const tmpObjLitVal$3 = $(4);
const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
const SSA_x$1 = tmpNestedAssignObjPatternRhs$1.x;
const SSA_y$1 = tmpNestedAssignObjPatternRhs$1.y;
tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
$(a, SSA_x$1, SSA_y$1);
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

Normalized calls: Same

Final output calls: Same
