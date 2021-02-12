# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10, y = 20, z = 30;
({x: {y: {z}}} = 1);
`````

## Normalized

`````js filename=intro
let x = 10;
let y = 20;
let z = 30;
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
z = objPatternNoDefault$1.z;
`````

## Output

`````js filename=intro
let x = 10;
let y = 20;
let z = 30;
const objPatternNoDefault = (1).x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
z = objPatternNoDefault$1.z;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
