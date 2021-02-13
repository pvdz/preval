# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10, y = 20;
({x: [ y ]} = 1)
`````

## Normalized

`````js filename=intro
let x = 10;
let y = 20;
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
`````

## Output

`````js filename=intro
let y = 20;
const objPatternNoDefault = (1).x;
const arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
