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
tmpElement = { x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 };
tmpArg_1 = [tmpElement, 10];
tmpArg = f(tmpArg_1, 100);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpElement = { x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 };
tmpArg_1 = [tmpElement, 10];
tmpArg = f(tmpArg_1, 100);
$(tmpArg);
`````