# Preval test case

# default_yes_yes_no__arr_undefined.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('pass') } = $({ x: 'pass2' })] = [undefined, 20, 30]);
$(x);
`````

## Normalized

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternBeforeDefault;
arrAssignPatternRhs = [undefined, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { x: 'pass2' };
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
objPatternBeforeDefault = arrPatternStep.x;
{
  let ifTestTmp_1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
}
$(x);
`````

## Output

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternBeforeDefault;
arrAssignPatternRhs = [undefined, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { x: 'pass2' };
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
objPatternBeforeDefault = arrPatternStep.x;
let ifTestTmp_1 = objPatternBeforeDefault === undefined;
if (ifTestTmp_1) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````
