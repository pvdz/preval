# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$((a = [x, y] = [$(3), $(4)]) && (a = [x, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$((a = [x, y] = [$(3), $(4)]) && (a = [x, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs;
  const tmpArrElement$3 = $(3);
  const tmpArrElement$5 = $(4);
  const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$3, tmpArrElement$5];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  x = arrPatternSplat$1[0];
  y = arrPatternSplat$1[1];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
let tmpSSA_x = arrPatternSplat[0];
let tmpSSA_y = arrPatternSplat[1];
let tmpSSA_a = tmpNestedAssignArrPatternRhs;
let tmpCalleeParam = tmpSSA_a;
if (tmpCalleeParam) {
  const tmpArrElement$3 = $(3);
  const tmpArrElement$5 = $(4);
  const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$3, tmpArrElement$5];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  tmpSSA_x = arrPatternSplat$1[0];
  tmpSSA_y = arrPatternSplat$1[1];
  tmpSSA_a = tmpNestedAssignArrPatternRhs$1;
  tmpCalleeParam = tmpNestedAssignArrPatternRhs$1;
}
$(tmpCalleeParam);
$(tmpSSA_a, tmpSSA_x, tmpSSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 3
 - 4: 4
 - 5: [3, 4]
 - 6: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
