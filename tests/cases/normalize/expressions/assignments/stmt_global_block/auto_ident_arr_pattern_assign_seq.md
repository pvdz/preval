# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1,
    y = 2;

  let a = { a: 999, b: 1000 };
  a = [x, y] = ($(x), $(y), [$(3), $(4)]);
  $(a, x, y);
}
`````

## Pre Normal

`````js filename=intro
{
  let x = 1,
    y = 2;
  let a = { a: 999, b: 1000 };
  a = [x, y] = ($(x), $(y), [$(3), $(4)]);
  $(a, x, y);
}
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
const SSA_x = arrPatternSplat[0];
const SSA_y = arrPatternSplat[1];
$(tmpNestedAssignArrPatternRhs, SSA_x, SSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
