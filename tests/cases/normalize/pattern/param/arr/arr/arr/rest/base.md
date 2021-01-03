# Preval test case

# base.md

> normalize > pattern > param > arr > arr > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[[...x]]]) {
  return x;
}
$(f([[[1, 2, 3], 20, 30], 40, 50], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternStep_1 = arrPatternSplat_1[0];
  let arrPatternSplat_2 = [...arrPatternStep_1];
  let x = arrPatternSplat_2.slice(0);
  return x;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
var tmpElement_2;
tmpElement_1 = [1, 2, 3];
tmpElement = [tmpElement_1, 20, 30];
tmpArg_1 = [tmpElement, 40, 50];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternStep_1 = arrPatternSplat_1[0];
  let arrPatternSplat_2 = [...arrPatternStep_1];
  let x = arrPatternSplat_2.slice(0);
  return x;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
tmpElement_1 = [1, 2, 3];
tmpElement = [tmpElement_1, 20, 30];
tmpArg_1 = [tmpElement, 40, 50];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````