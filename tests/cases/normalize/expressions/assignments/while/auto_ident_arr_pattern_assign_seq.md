# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > While > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
while ((a = [x, y] = ($(x), $(y), [$(3), $(4)]))) $(100);
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
while ((a = [x, y] = ($(x), $(y), [$(3), $(4)]))) $(100);
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
while (true) {
  $(x);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
$(100);
$(tmpArrElement);
$(tmpArrElement$1);
const tmpArrElement$2 = $(3);
const tmpArrElement$4 = $(4);
$(100);
$(tmpArrElement$2);
$(tmpArrElement$4);
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(4);
$(100);
$(tmpArrElement$3);
$(tmpArrElement$5);
const tmpArrElement$6 = $(3);
const tmpArrElement$8 = $(4);
$(100);
$(tmpArrElement$6);
$(tmpArrElement$8);
const tmpArrElement$7 = $(3);
const tmpArrElement$9 = $(4);
$(100);
$(tmpArrElement$7);
$(tmpArrElement$9);
const tmpArrElement$10 = $(3);
const tmpArrElement$12 = $(4);
$(100);
$(tmpArrElement$10);
$(tmpArrElement$12);
const tmpArrElement$11 = $(3);
const tmpArrElement$13 = $(4);
$(100);
$(tmpArrElement$11);
$(tmpArrElement$13);
const tmpArrElement$14 = $(3);
const tmpArrElement$16 = $(4);
$(100);
$(tmpArrElement$14);
$(tmpArrElement$16);
const tmpArrElement$15 = $(3);
const tmpArrElement$17 = $(4);
$(100);
$(tmpArrElement$15);
$(tmpArrElement$17);
const tmpArrElement$18 = $(3);
const tmpArrElement$20 = $(4);
$(100);
$(tmpArrElement$18);
$(tmpArrElement$20);
const tmpArrElement$19 = $(3);
const tmpArrElement$21 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$19, tmpArrElement$21];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
let tmpClusterSSA_x$2 = arrPatternSplat$1[0];
let tmpClusterSSA_y$2 = arrPatternSplat$1[1];
let tmpClusterSSA_a$2 = tmpNestedAssignArrPatternRhs$1;
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpClusterSSA_x$2);
  $(tmpClusterSSA_y$2);
  const tmpArrElement$22 = $(3);
  const tmpArrElement$24 = $(4);
  const tmpNestedAssignArrPatternRhs$2 = [tmpArrElement$22, tmpArrElement$24];
  const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$2];
  tmpClusterSSA_x$2 = arrPatternSplat$2[0];
  tmpClusterSSA_y$2 = arrPatternSplat$2[1];
  tmpClusterSSA_a$2 = tmpNestedAssignArrPatternRhs$2;
  $(100);
}
$(tmpClusterSSA_a$2, tmpClusterSSA_x$2, tmpClusterSSA_y$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 100
 - 6: 3
 - 7: 4
 - 8: 3
 - 9: 4
 - 10: 100
 - 11: 3
 - 12: 4
 - 13: 3
 - 14: 4
 - 15: 100
 - 16: 3
 - 17: 4
 - 18: 3
 - 19: 4
 - 20: 100
 - 21: 3
 - 22: 4
 - 23: 3
 - 24: 4
 - 25: 100
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
