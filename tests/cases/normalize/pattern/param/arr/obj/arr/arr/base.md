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
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let arrPatternSplat$2 = [...arrPatternStep$1];
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
('<hoisted func decl `f`>');
tmpElement$1 = [1, 2, 3];
tmpObjPropValue = [tmpElement$1, 10];
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg$1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  [...arrPatternStep$1];
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
tmpElement$1 = [1, 2, 3];
tmpObjPropValue = [tmpElement$1, 10];
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg$1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
