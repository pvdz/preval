# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > Arr element > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$((a = [x, y] = [$(3), $(4)]) + (a = [x, y] = [$(3), $(4)]));
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
let tmpBinBothLhs = a;
const tmpArrElement$2 = $(3);
const tmpArrElement$3 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$3];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
x = arrPatternSplat$1[0];
y = arrPatternSplat$1[1];
a = tmpNestedAssignArrPatternRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
arrPatternSplat[1];
const tmpArrElement$2 = $(3);
const tmpArrElement$3 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$3];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
const SSA_x$1 = arrPatternSplat$1[0];
const SSA_y$1 = arrPatternSplat$1[1];
const tmpCalleeParam = tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignArrPatternRhs$1, SSA_x$1, SSA_y$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 3
 - 4: 4
 - 5: '3,43,4'
 - 6: [3, 4], 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
