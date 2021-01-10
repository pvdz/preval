# Preval test case

# default_yes_no__obj_null.md

> normalize > pattern >  > param > obj > arr > default_yes_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [] = $(['fail']) } = { x: null, a: 11, b: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
objAssignPatternRhs = { x: null, a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
arrPatternSplat = [...objPatternAfterDefault];
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
x = { x: /regex/, x: 8, x: 8 };
x = x.x;
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
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
objAssignPatternRhs = { x: null, a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['fail'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
arrPatternSplat = [...objPatternAfterDefault];
$('bad');
`````
