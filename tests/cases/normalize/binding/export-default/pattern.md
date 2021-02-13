# Preval test case

# pattern.md

> normalize > assignment > export-default > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let z = [10, 20, 30];
export let [x, y] = z;
$(x, y, z);
`````

## Normalized

`````js filename=intro
let z = [10, 20, 30];
let bindingPatternArrRoot = z;
let arrPatternSplat = [...bindingPatternArrRoot];
let x = arrPatternSplat[0];
let y = arrPatternSplat[1];
export { x, y };
$(x, y, z);
`````

## Output

`````js filename=intro
let z = [10, 20, 30];
let arrPatternSplat = [...z];
let x = arrPatternSplat[0];
let y = arrPatternSplat[1];
export { x, y };
$(x, y, z);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
