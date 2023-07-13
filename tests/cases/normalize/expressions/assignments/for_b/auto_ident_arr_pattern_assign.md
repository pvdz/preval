# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > For b > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; (a = [x, y] = [$(3), $(4)]); $(1));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  while ((a = [x, y] = [$(3), $(4)])) {
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
while (true) {
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
$(3);
$(4);
$(1);
$(3);
$(4);
$(1);
$(3);
$(4);
$(1);
$(3);
$(4);
$(1);
$(3);
$(4);
$(1);
$(3);
$(4);
$(1);
$(3);
$(4);
$(1);
$(3);
$(4);
$(1);
$(3);
$(4);
$(1);
$(3);
$(4);
$(1);
const tmpArrElement$2 = $(3);
const tmpArrElement$4 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$4];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
let tmpClusterSSA_x$2 = arrPatternSplat$1[0];
let tmpClusterSSA_y$2 = arrPatternSplat$1[1];
let tmpClusterSSA_a$2 = tmpNestedAssignArrPatternRhs$1;
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpArrElement$3 = $(3);
  const tmpArrElement$5 = $(4);
  const tmpNestedAssignArrPatternRhs$2 = [tmpArrElement$3, tmpArrElement$5];
  const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$2];
  tmpClusterSSA_x$2 = arrPatternSplat$2[0];
  tmpClusterSSA_y$2 = arrPatternSplat$2[1];
  tmpClusterSSA_a$2 = tmpNestedAssignArrPatternRhs$2;
  $(1);
}
$(tmpClusterSSA_a$2, tmpClusterSSA_x$2, tmpClusterSSA_y$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 1
 - 4: 3
 - 5: 4
 - 6: 1
 - 7: 3
 - 8: 4
 - 9: 1
 - 10: 3
 - 11: 4
 - 12: 1
 - 13: 3
 - 14: 4
 - 15: 1
 - 16: 3
 - 17: 4
 - 18: 1
 - 19: 3
 - 20: 4
 - 21: 1
 - 22: 3
 - 23: 4
 - 24: 1
 - 25: 3
 - 26: 4
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
