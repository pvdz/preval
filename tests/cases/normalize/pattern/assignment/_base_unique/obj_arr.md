# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let y = 1; }
({x: [ y ]} = 1);
{ let y = 1; }
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var y_1;
{
  let y = 1;
}
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y_1 = arrPatternSplat[0];
{
  let y_2 = 1;
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
{
  var x = 8;
}
x = 8;
x = x.x;
x = [...x];
x = x[8];
{
  var x = 8;
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var y_1;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
y_1 = arrPatternSplat[0];
`````
