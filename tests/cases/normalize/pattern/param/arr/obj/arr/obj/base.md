# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: [{}],
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
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let objPatternCrashTest = arrPatternStep$1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep$1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep$1.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
('<hoisted func decl `f`>');
tmpElement$1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = [tmpElement$1, 12];
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg$1 = [tmpElement, 10];
tmpArg = f(tmpArg$1, 100);
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
  let objPatternCrashTest = arrPatternStep$1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep$1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep$1.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
tmpElement$1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = [tmpElement$1, 12];
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg$1 = [tmpElement, 10];
tmpArg = f(tmpArg$1, 100);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
