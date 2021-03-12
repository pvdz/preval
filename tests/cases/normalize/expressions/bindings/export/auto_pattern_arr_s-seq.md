# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Bindings > Export > Auto pattern arr s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let [a] = ($(10), $(20), [1, 2]);
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = ($(10), $(20), [1, 2]);
export { a };
$(a);
`````

## Normalized

`````js filename=intro
$(10);
$(20);
let bindingPatternArrRoot = [1, 2];
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
export { a };
$(a);
`````

## Output

`````js filename=intro
$(10);
$(20);
const bindingPatternArrRoot = [1, 2];
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
