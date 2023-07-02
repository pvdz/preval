# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > Do while > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (([x, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = [x, y] = [$(3), $(4)];
  }
}
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpDoWhileFlag = tmpNestedAssignArrPatternRhs;
}
$(a, x, y);
`````

## Output

`````js filename=intro
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
const tmpArrElement$2 = $(3);
const tmpArrElement$4 = $(4);
let tmpClusterSSA_x = tmpArrElement$2;
let tmpClusterSSA_y = tmpArrElement$4;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpArrElement$3 = $(3);
  const tmpArrElement$5 = $(4);
  tmpClusterSSA_x = tmpArrElement$3;
  tmpClusterSSA_y = tmpArrElement$5;
}
const a = { a: 999, b: 1000 };
$(a, tmpClusterSSA_x, tmpClusterSSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 4
 - 4: 100
 - 5: 3
 - 6: 4
 - 7: 100
 - 8: 3
 - 9: 4
 - 10: 100
 - 11: 3
 - 12: 4
 - 13: 100
 - 14: 3
 - 15: 4
 - 16: 100
 - 17: 3
 - 18: 4
 - 19: 100
 - 20: 3
 - 21: 4
 - 22: 100
 - 23: 3
 - 24: 4
 - 25: 100
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
