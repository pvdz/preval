# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: [...y],
  },
]) {
  return y;
}
$(f([{ x: [1, 2, 3], y: 11 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat_1 = [...objPatternNoDefault];
  let y = arrPatternSplat_1.slice(0);
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg_1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  var x = x.x;
  var x = [...x];
  var x = x.x(8);
  return x;
}
var x;
var x;
var x;
var x;
x = [8, 8, 8];
x = { x: x, x: 8 };
x = [x, 8, 8];
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat_1 = [...objPatternNoDefault];
  let y = arrPatternSplat_1.slice(0);
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg_1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
