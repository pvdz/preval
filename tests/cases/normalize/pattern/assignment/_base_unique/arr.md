# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; } 
([ x ] = 1);
{ let x = 1; }
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var x_1;
{
  let x = 1;
}
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
x_1 = arrPatternSplat[0];
{
  let x_2 = 1;
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
{
  var x = 8;
}
x = 8;
x = [...x];
x = x[8];
{
  var x = 8;
}
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var x_1;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
x_1 = arrPatternSplat[0];
`````
