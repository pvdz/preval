# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> normalize > expressions > statement > arr_element > auto_ident_arr_pattern_assign_seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
([x, y] = ($(x), $(y), [$(3), $(4)])) + ([x, y] = ($(x), $(y), [$(3), $(4)]));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpBinBothLhs;
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinBothLhs = tmpNestedAssignArrPatternRhs;
let tmpBinBothRhs;
$(x);
$(y);
const tmpArrElement$2 = $(3);
const tmpArrElement$3 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$3];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
x = arrPatternSplat$1[0];
y = arrPatternSplat$1[1];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, x, y);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const SSA_x = arrPatternSplat[0];
const SSA_y = arrPatternSplat[1];
$(SSA_x);
$(SSA_y);
const tmpArrElement$2 = $(3);
const tmpArrElement$3 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$3];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
const SSA_x$1 = arrPatternSplat$1[0];
const SSA_y$1 = arrPatternSplat$1[1];
tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(a, SSA_x$1, SSA_y$1);
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
 - 9: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
