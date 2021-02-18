# Preval test case

# auto_ident_arr_pattern_assign.md

> normalize > expressions > bindings > switch_case > auto_ident_arr_pattern_assign
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = 1,
      y = 2;

    let a = ([x, y] = [$(3), $(4)]);
    $(a, x, y);
}
`````

## Normalized

`````js filename=intro
let x;
let y;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  x = 1;
  y = 2;
  a = undefined;
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  $(a, x, y);
}
`````

## Output

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const SSA_x$1 = arrPatternSplat[0];
const SSA_y$1 = arrPatternSplat[1];
$(tmpNestedAssignArrPatternRhs, SSA_x$1, SSA_y$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: [3, 4], 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
