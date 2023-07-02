# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > For let > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let xyz = (a = [x, y] = ($(x), $(y), [$(3), $(4)])); ; $(1)) $(xyz);
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  let xyz = (a = [x, y] = ($(x), $(y), [$(3), $(4)]));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
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
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_x = arrPatternSplat[0];
const tmpClusterSSA_y = arrPatternSplat[1];
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
$(tmpNestedAssignArrPatternRhs);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpNestedAssignArrPatternRhs);
  $(1);
}
$(tmpNestedAssignArrPatternRhs, tmpClusterSSA_x, tmpClusterSSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: [3, 4]
 - 6: 1
 - 7: [3, 4]
 - 8: 1
 - 9: [3, 4]
 - 10: 1
 - 11: [3, 4]
 - 12: 1
 - 13: [3, 4]
 - 14: 1
 - 15: [3, 4]
 - 16: 1
 - 17: [3, 4]
 - 18: 1
 - 19: [3, 4]
 - 20: 1
 - 21: [3, 4]
 - 22: 1
 - 23: [3, 4]
 - 24: 1
 - 25: [3, 4]
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
