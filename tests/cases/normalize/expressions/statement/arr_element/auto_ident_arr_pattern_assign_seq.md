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
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const arrAssignPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
$(x);
$(y);
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
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const arrAssignPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
$(x);
$(y);
const tmpArrElement$2 = $(3);
const tmpArrElement$3 = $(4);
const arrAssignPatternRhs$1 = [tmpArrElement$2, tmpArrElement$3];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
x = arrPatternSplat$1[0];
y = arrPatternSplat$1[1];
$(a, x, y);
`````

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