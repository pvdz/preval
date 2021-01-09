# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: [ y ]} = 1)
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var y;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
x = 8;
x = x.x;
x = [...x];
x = x[8];
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var y;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y = arrPatternSplat[0];
`````
