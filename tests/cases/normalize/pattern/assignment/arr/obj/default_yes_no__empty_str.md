# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > arr > obj > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{} = $('pass')] = '');
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    arrPatternStep = $('pass');
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
x = 'str';
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
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  arrPatternStep = $('pass');
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
$('ok');
`````
