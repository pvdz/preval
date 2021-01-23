# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x }]) {
  return x;
}
$(f([{ x: 1, y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = objPatternRest(arrPatternStep, [], undefined);
  return x;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
tmpElement = { x: 1, y: 2, z: 3 };
tmpArg$1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = objPatternRest(arrPatternStep, [], undefined);
  return x;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
tmpElement = { x: 1, y: 2, z: 3 };
tmpArg$1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: {"x":1,"y":2,"z":3}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
