# Preval test case

# default_yes_yes_no__arr_null.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x = $('fail')] = $(['fail2'])] = [null, 4, 5]);
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault_1;
var x;
arrAssignPatternRhs = [null, 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail2'];
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
{
  let ifTestTmp_1 = arrPatternBeforeDefault_1 === undefined;
  if (ifTestTmp_1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault_1;
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
var x;
var x;
var x;
x = [/regex/, 8, 8];
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
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault_1;
var x;
arrAssignPatternRhs = [null, 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['fail2'];
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
arrPatternSplat_1 = [...arrPatternStep];
arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
let ifTestTmp_1 = arrPatternBeforeDefault_1 === undefined;
if (ifTestTmp_1) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault_1;
}
$('bad');
`````
