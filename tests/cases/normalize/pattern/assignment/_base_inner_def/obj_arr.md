# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: [ y = a ]} = 1);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
y = tmpTernaryTest ? a : arrPatternBeforeDefault;
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
x = 8;
x = x.x;
x = [...x];
x = x[8];
x = x * x;
x = x ? x : x;
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
y = tmpTernaryTest ? a : arrPatternBeforeDefault;
`````
