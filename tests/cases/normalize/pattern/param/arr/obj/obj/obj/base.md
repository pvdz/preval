# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: {
      y: {},
    },
  },
]) {
  return 'ok';
}
$(f([{ x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 }, 10], 100));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg_1 = [tmpElement, 10];
tmpArg = f(tmpArg_1, 100);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  var x = x.x;
  var x = x.x;
  return 'str';
}
var x;
var x;
var x;
var x;
var x;
x = { x: 8, x: 8, x: 8 };
x = { x: 8, x: x, x: 8 };
x = { x: x, x: 8 };
x = [x, 8];
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  objPatternNoDefault.y;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg_1 = [tmpElement, 10];
tmpArg = f(tmpArg_1, 100);
$(tmpArg);
`````
