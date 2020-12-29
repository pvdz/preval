# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [{ ...y }] }) {
  return y;
}
$(f({ x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let arrPatternSplat = [...arrPatternStep];
  let arrPatternStep_1 = arrPatternSplat[0];
  let y = objPatternRest(arrPatternStep_1, []);
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpArg_1 = { x: ((tmpElement = { x: 1, y: 2, c: 3 }), [tmpElement, 13, 14]), a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let arrPatternSplat = [...arrPatternStep];
  let arrPatternStep_1 = arrPatternSplat[0];
  let y = objPatternRest(arrPatternStep_1, []);
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpElement;
tmpArg_1 = { x: ((tmpElement = { x: 1, y: 2, c: 3 }), [tmpElement, 13, 14]), a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
