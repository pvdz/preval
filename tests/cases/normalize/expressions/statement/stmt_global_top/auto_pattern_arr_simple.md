# Preval test case

# auto_pattern_arr_simple.md

> Normalize > Expressions > Statement > Stmt global top > Auto pattern arr simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

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
