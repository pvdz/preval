# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident obj pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(
  (a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })) &&
    (a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) }))
);
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs;
  $(x);
  $(y);
  const tmpObjLitVal$2 = $(3);
  const tmpObjLitVal$3 = $(4);
  const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
  x = tmpNestedAssignObjPatternRhs$1.x;
  y = tmpNestedAssignObjPatternRhs$1.y;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output

`````js filename=intro
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
let SSA_x = tmpNestedAssignObjPatternRhs.x;
let SSA_y = tmpNestedAssignObjPatternRhs.y;
let SSA_a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  $(SSA_x);
  $(SSA_y);
  const tmpObjLitVal$2 = $(3);
  const tmpObjLitVal$3 = $(4);
  const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$2, y: tmpObjLitVal$3 };
  SSA_x = tmpNestedAssignObjPatternRhs$1.x;
  SSA_y = tmpNestedAssignObjPatternRhs$1.y;
  SSA_a = tmpNestedAssignObjPatternRhs$1;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs$1;
}
$(tmpCalleeParam);
$(SSA_a, SSA_x, SSA_y);
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
 - 9: { x: '3', y: '4' }
 - 10: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
