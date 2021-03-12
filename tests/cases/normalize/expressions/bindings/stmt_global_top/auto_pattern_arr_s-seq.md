# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Bindings > Stmt global top > Auto pattern arr s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = ($(10), $(20), [1, 2]);
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = ($(10), $(20), [1, 2]);
$(a);
`````

## Normalized

`````js filename=intro
$(10);
$(20);
let bindingPatternArrRoot = [1, 2];
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(a);
`````

## Output

`````js filename=intro
$(10);
$(20);
const bindingPatternArrRoot = [1, 2];
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
