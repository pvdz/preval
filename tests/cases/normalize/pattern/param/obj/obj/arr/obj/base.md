# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: [{}],
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: [{ a: 1, b: 2, c: 3 }, 15], z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  let arrPatternSplat = [...objPatternNoDefault_1];
  let arrPatternStep = arrPatternSplat[0];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpArg_1 = { x: { x: 13, y: ((tmpElement = { a: 1, b: 2, c: 3 }), [tmpElement, 15]), z: 14 }, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  let arrPatternSplat = [...objPatternNoDefault_1];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpArg_1 = { x: { x: 13, y: ((tmpElement = { a: 1, b: 2, c: 3 }), [tmpElement, 15]), z: 14 }, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
