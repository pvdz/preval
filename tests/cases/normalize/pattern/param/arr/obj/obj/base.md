# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: {},
  },
]) {
  return 'ok';
}
$(f([{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10], 100));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
tmpElement = { x: ((tmpElement_1 = { a: 1, b: 2, c: 3 }), [tmpElement_1, 12]), y: 11 };
tmpArg_1 = [tmpElement, 10];
tmpArg = f(tmpArg_1, 100);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpElement;
var tmpElement_1;
tmpElement = { x: ((tmpElement_1 = { a: 1, b: 2, c: 3 }), [tmpElement_1, 12]), y: 11 };
tmpArg_1 = [tmpElement, 10];
tmpArg = f(tmpArg_1, 100);
$(tmpArg);
`````
