# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ ...x } = $({ a: 'fail' })] = 'abc');
$(x);
`````

## Normalized

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var x;
arrAssignPatternRhs = 'abc';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { a: 'fail' };
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
}
x = objPatternRest(arrPatternStep, []);
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
x = 'str';
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
x = x(x, []);
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var x;
arrAssignPatternRhs = 'abc';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { a: 'fail' };
  arrPatternStep = $(tmpArg);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
x = objPatternRest(arrPatternStep, []);
$(x);
`````
