# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: [
    {
      y: {},
    },
  ],
}) {
  return 'ok';
}
$(f({ x: [{ x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault_1 = arrPatternStep.y;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
var tmpElement;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { a: 1, b: 2, c: 3 };
tmpElement = { x: 15, y: tmpObjPropValue_1, c: 16 };
tmpObjPropValue = [tmpElement, 13, 14];
tmpArg_1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  var x = [...x];
  var x = x[8];
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
x = [x, 8, 8];
x = { x: x, x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  arrPatternStep.y;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
var tmpElement;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { a: 1, b: 2, c: 3 };
tmpElement = { x: 15, y: tmpObjPropValue_1, c: 16 };
tmpObjPropValue = [tmpElement, 13, 14];
tmpArg_1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
