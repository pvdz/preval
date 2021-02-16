# Preval test case

# auto_pattern_arr_simple.md

> normalize > expressions > assignments > logic_or_right > auto_pattern_arr_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a, b] = [1, 2];
$(a, b);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = [1, 2];
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let b = arrPatternSplat[1];
$(a, b);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2];
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
const b = arrPatternSplat[1];
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
