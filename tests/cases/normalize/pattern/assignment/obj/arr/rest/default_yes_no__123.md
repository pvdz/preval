# Preval test case

# default_yes_no__123.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [...y] = $(['fail']) } = { x: [1, 2, 3], a: 11, b: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
var y;
tmpObjPropValue = [1, 2, 3];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
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
y = arrPatternSplat.slice(0);
$(y);
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
x = [8, 8, 8];
x = { x: x, x: 8, x: 8 };
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
x = x.x(8);
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var arrPatternSplat;
var y;
tmpObjPropValue = [1, 2, 3];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['fail'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
arrPatternSplat = [...objPatternAfterDefault];
y = arrPatternSplat.slice(0);
$(y);
`````
