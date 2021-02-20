# Preval test case

# pattern.md

> Normalize > Binding > Export-default > Pattern
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
const z = [10, 20, 30];
const arrPatternSplat = [...z];
const x = arrPatternSplat[0];
const y = arrPatternSplat[1];
export { x, y };
$(x, y, z);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
