# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: [y],
  },
]) {
  return y;
}
$(f([{ x: [1, 2, 3] }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternStep_1 = arrPatternStep.x;
  let arrPatternSplat_1 = [...arrPatternStep_1];
  let y = arrPatternSplat_1[0];
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpElement = { x: [1, 2, 3] };
tmpArg_1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternStep_1 = arrPatternStep.x;
  let arrPatternSplat_1 = [...arrPatternStep_1];
  let y = arrPatternSplat_1[0];
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpElement = { x: [1, 2, 3] };
tmpArg_1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
