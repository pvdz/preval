# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [[y]] }) {
  return y;
}
$(f({ x: [[1, 2, 3], 13], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let y = arrPatternSplat_1[0];
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpArg_1 = { x: ((tmpElement = [1, 2, 3]), [tmpElement, 13]), a: 11, b: 12 };
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
  let y = arrPatternSplat_1[0];
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpArg_1 = { x: ((tmpElement = [1, 2, 3]), [tmpElement, 13]), a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````