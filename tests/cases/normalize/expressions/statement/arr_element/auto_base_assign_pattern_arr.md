# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > statement > arr_element > auto_base_assign_pattern_arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
([b] = $([$(2)])) + ([b] = $([$(2)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...arrAssignPatternRhs];
b = arrPatternSplat[0];
const tmpCallCallee$1 = $;
const tmpArrElement$1 = $(2);
const tmpCalleeParam$1 = [tmpArrElement$1];
const arrAssignPatternRhs$1 = tmpCallCallee$1(tmpCalleeParam$1);
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
b = arrPatternSplat$1[0];
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const arrAssignPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...arrAssignPatternRhs];
b = arrPatternSplat[0];
const tmpArrElement$1 = $(2);
const tmpCalleeParam$1 = [tmpArrElement$1];
const arrAssignPatternRhs$1 = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
b = arrPatternSplat$1[0];
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 2
 - 4: [2]
 - 5: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
