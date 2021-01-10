# Preval test case

# default_yes_no__arr_123.md

> normalize > pattern > param >  > arr > arr > default_yes_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[] = $(['pass2'])] = [1, 2, 3, 4, 5]);
$('ok');
`````

## Normalized

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
arrAssignPatternRhs = [1, 2, 3, 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['pass2'];
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
x = [8, 8, 8, 8, 8];
x = [...x];
x = x[8];
{
  var x = x * x;
  if (x) {
    x = ['str'];
    x = x(x);
  } else {
    x = x;
  }
}
x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
arrAssignPatternRhs = [1, 2, 3, 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['pass2'];
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
arrPatternSplat_1 = [...arrPatternStep];
$('ok');
`````
