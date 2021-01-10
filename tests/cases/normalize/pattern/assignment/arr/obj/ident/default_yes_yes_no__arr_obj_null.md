# Preval test case

# default_yes_yes_no__arr_obj_null.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('fail') } = $({ x: 'fail2' })] = [{ x: null, y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
tmpElement = { x: null, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { x: 'fail2' };
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
objPatternBeforeDefault = arrPatternStep.x;
{
  let ifTestTmp_1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    x = $('fail');
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
var x;
var x;
x = { x: /regex/, x: 8, x: 8 };
x = [x, 8, 8];
x = [...x];
x = x[8];
{
  var x = x * x;
  if (x) {
    x = { x: 'str' };
    x = x(x);
  } else {
    x = x;
  }
}
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
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
tmpElement = { x: null, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { x: 'fail2' };
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
objPatternBeforeDefault = arrPatternStep.x;
let ifTestTmp_1 = objPatternBeforeDefault === undefined;
if (ifTestTmp_1) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````
