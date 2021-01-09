# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[{}]]) {
  return 'ok';
}
$(f([[{ x: 1 }, 20, 30], 40, 50], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternStep_1 = arrPatternSplat_1[0];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
tmpElement_1 = { x: 1 };
tmpElement = [tmpElement_1, 20, 30];
tmpArg_1 = [tmpElement, 40, 50];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  var x = [...x];
  var x = x[8];
  return 'str';
}
var x;
var x;
var x;
var x;
x = { x: 8 };
x = [x, 8, 8];
x = [x, 8, 8];
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  arrPatternSplat_1[0];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
tmpElement_1 = { x: 1 };
tmpElement = [tmpElement_1, 20, 30];
tmpArg_1 = [tmpElement, 40, 50];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
