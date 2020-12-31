# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [[{}]] }) {
  return 'ok';
}
$(f({ x: [[{ a: 1, b: 2, c: 3 }, 14], 13], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternStep_1 = arrPatternSplat_1[0];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
var tmpElement_2;
tmpArg_1 = { x: ((tmpElement_1 = { a: 1, b: 2, c: 3 }), (tmpElement = [tmpElement_1, 14]), [tmpElement, 13]), a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
tmpArg_1 = { x: ((tmpElement_1 = { a: 1, b: 2, c: 3 }), (tmpElement = [tmpElement_1, 14]), [tmpElement, 13]), a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
