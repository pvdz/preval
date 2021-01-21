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
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
let x = 10;
let y = 20;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
let y = 20;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
