# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > statement > binary_right > auto_base_assign_pattern_arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$(100) + ([b] = $([$(2)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$(100);
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...arrAssignPatternRhs];
b = arrPatternSplat[0];
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$(100);
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const arrAssignPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...arrAssignPatternRhs];
b = arrPatternSplat[0];
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same