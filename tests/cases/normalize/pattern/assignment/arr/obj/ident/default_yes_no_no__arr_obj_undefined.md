# Preval test case

# default_yes_no_no__arr_obj_undefined.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__arr_obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('pass') }] = [{ x: undefined, y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
tmpElement = { x: undefined, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternBeforeDefault = arrPatternStep.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
}
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
x = { x: x, x: 8, x: 8 };
x = [x, 8, 8];
x = [...x];
x = x[8];
x = x.x;
{
  var x = x * x;
  if (x) {
    x = x('str');
  } else {
    x = x;
  }
}
x(x);
`````

## Output

`````js filename=intro
var tmpElement;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
tmpElement = { x: undefined, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternBeforeDefault = arrPatternStep.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````
