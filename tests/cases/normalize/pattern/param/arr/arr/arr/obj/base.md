# Preval test case

# base.md

> normalize > pattern > param > arr > arr > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[[[{}]]]]) {
  return 'ok';
}
$(f([[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternStep_1 = arrPatternSplat_1[0];
  let arrPatternSplat_2 = [...arrPatternStep_1];
  let arrPatternStep_2 = arrPatternSplat_2[0];
  let arrPatternSplat_3 = [...arrPatternStep_2];
  let arrPatternStep_3 = arrPatternSplat_3[0];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
var tmpElement_2;
var tmpElement_3;
var tmpElement_4;
var tmpElement_5;
var tmpElement_6;
tmpElement_3 = { x: 1 };
tmpElement_2 = [tmpElement_3, 6, 7];
tmpElement_1 = [tmpElement_2, 4, 5];
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
  let arrPatternStep_2 = arrPatternSplat_2[0];
  let arrPatternSplat_3 = [...arrPatternStep_2];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
var tmpElement_2;
var tmpElement_3;
tmpElement_3 = { x: 1 };
tmpElement_2 = [tmpElement_3, 6, 7];
tmpElement_1 = [tmpElement_2, 4, 5];
tmpElement = [tmpElement_1, 20, 30];
tmpArg_1 = [tmpElement, 40, 50];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````