# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
([{ x = a }] = 1);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternBeforeDefault = arrPatternStep.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = a;
  } else {
    x = objPatternBeforeDefault;
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
x = 8;
x = [...x];
x = x[8];
x = x.x;
{
  var x = x * x;
  if (x) {
    x = x;
  } else {
    x = x;
  }
}
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternBeforeDefault = arrPatternStep.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = a;
} else {
  x = objPatternBeforeDefault;
}
`````
