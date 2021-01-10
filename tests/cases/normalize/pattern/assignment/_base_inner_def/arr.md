# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
([ x = a ] = 1);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = a;
  } else {
    x = arrPatternBeforeDefault;
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
x = 8;
x = [...x];
x = x[8];
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
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = a;
} else {
  x = arrPatternBeforeDefault;
}
`````
