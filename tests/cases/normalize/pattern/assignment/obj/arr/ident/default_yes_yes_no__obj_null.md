# Preval test case

# default_yes_yes_no__obj_null.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [y = 'fail'] = $(['fail2']) } = { x: null, a: 11, b: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = { x: null, a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail2'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
arrPatternSplat = [...objPatternAfterDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
{
  let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    y = 'fail';
  } else {
    y = arrPatternBeforeDefault;
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
x = x[8];
{
  var x = x * x;
  if (x) {
    x = 'str';
  } else {
    x = x;
  }
}
x('str');
`````

## Output

`````js filename=intro
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
var arrPatternBeforeDefault;
var y;
objAssignPatternRhs = { x: null, a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['fail2'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
arrPatternSplat = [...objPatternAfterDefault];
arrPatternBeforeDefault = arrPatternSplat[0];
let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
if (ifTestTmp_1) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$('bad');
`````
