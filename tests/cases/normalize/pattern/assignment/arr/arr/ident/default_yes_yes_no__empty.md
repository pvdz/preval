# Preval test case

# default_yes_yes_no__empty.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x = $('fail')] = $(['fail2'])] = 1);
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
arrAssignPatternRhs = 1;
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

## Output

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternBeforeDefault_1;
arrAssignPatternRhs = 1;
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
