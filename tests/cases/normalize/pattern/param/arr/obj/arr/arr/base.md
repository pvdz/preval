# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: [[]],
  },
]) {
  return 'ok';
}
$(f([{ x: [[1, 2, 3], 10], y: 11 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat_1 = [...objPatternNoDefault];
  let arrPatternStep_1 = arrPatternSplat_1[0];
  let arrPatternSplat_2 = [...arrPatternStep_1];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
tmpElement = { x: ((tmpElement_1 = [1, 2, 3]), [tmpElement_1, 10]), y: 11 };
tmpArg_1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat_1 = [...objPatternNoDefault];
  let arrPatternStep_1 = arrPatternSplat_1[0];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
tmpElement = { x: ((tmpElement_1 = [1, 2, 3]), [tmpElement_1, 10]), y: 11 };
tmpArg_1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
