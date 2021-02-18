# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> normalize > expressions > assignments > for_let > auto_ident_obj_pattern_assign_seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let xyz = (a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })); ; $(1))
  $(xyz);
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
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a, x, y);
`````

## Output

`````js filename=intro
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
const SSA_x = tmpNestedAssignObjPatternRhs.x;
const SSA_y = tmpNestedAssignObjPatternRhs.y;
while (true) {
  $(tmpNestedAssignObjPatternRhs);
  $(1);
}
$(tmpNestedAssignObjPatternRhs, SSA_x, SSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: { x: '3', y: '4' }
 - 6: 1
 - 7: { x: '3', y: '4' }
 - 8: 1
 - 9: { x: '3', y: '4' }
 - 10: 1
 - 11: { x: '3', y: '4' }
 - 12: 1
 - 13: { x: '3', y: '4' }
 - 14: 1
 - 15: { x: '3', y: '4' }
 - 16: 1
 - 17: { x: '3', y: '4' }
 - 18: 1
 - 19: { x: '3', y: '4' }
 - 20: 1
 - 21: { x: '3', y: '4' }
 - 22: 1
 - 23: { x: '3', y: '4' }
 - 24: 1
 - 25: { x: '3', y: '4' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
