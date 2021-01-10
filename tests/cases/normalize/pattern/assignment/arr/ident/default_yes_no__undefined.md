# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > arr > ident > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x = $('fail')] = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault;
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
x = x;
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
var x;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault;
}
$('bad');
`````
