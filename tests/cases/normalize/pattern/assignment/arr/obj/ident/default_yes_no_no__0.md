# Preval test case

# default_yes_no_no__0.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x = $('pass') }] = 0);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
arrAssignPatternRhs = 0;
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
$('bad');
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
    x = x('str');
  } else {
    x = x;
  }
}
x('str');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternBeforeDefault;
var x;
arrAssignPatternRhs = 0;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternBeforeDefault = arrPatternStep.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$('bad');
`````
