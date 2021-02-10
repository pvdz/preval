# Preval test case

# auto_ident_arr_pattern_assign.md

> normalize > expressions > statement > arr_element > auto_ident_arr_pattern_assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
([x, y] = [$(3), $(4)]) + ([x, y] = [$(3), $(4)]);
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const arrAssignPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
const tmpArrElement$2 = $(3);
const tmpArrElement$3 = $(4);
const arrAssignPatternRhs$1 = [tmpArrElement$2, tmpArrElement$3];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
x = arrPatternSplat$1[0];
y = arrPatternSplat$1[1];
$(a, x, y);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 3
 - 4: 4
 - 5: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
