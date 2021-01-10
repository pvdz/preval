# Preval test case

# default_yes_no__arr_obj_123.md

> normalize > pattern >  > param > arr > obj > default_yes_no__arr_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{} = $('fail')] = [{ x: 1, y: 2, z: 3 }, 20, 30]);
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
tmpElement = { x: 1, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    arrPatternStep = $('fail');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
x = { x: 8, x: 8, x: 8 };
x = [x, 8, 8];
x = [...x];
x = x[8];
{
  var x = x * x;
  if (x) {
    x = x('str');
  } else {
    x = x;
  }
}
x('str');
`````

## Output

`````js filename=intro
var tmpElement;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
tmpElement = { x: 1, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  arrPatternStep = $('fail');
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
$('ok');
`````
