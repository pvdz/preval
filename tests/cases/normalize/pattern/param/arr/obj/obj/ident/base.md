# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: { y },
  },
]) {
  return y;
}
$(f([{ x: { x: 1, y: 2, z: 3 }, y: 11 }, 10], 100));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternStep_1 = arrPatternStep.x;
  let y = arrPatternStep_1.y;
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpElement = { x: { x: 1, y: 2, z: 3 }, y: 11 };
tmpArg_1 = [tmpElement, 10];
tmpArg = f(tmpArg_1, 100);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternStep_1 = arrPatternStep.x;
  let y = arrPatternStep_1.y;
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpElement = { x: { x: 1, y: 2, z: 3 }, y: 11 };
tmpArg_1 = [tmpElement, 10];
tmpArg = f(tmpArg_1, 100);
$(tmpArg);
`````
