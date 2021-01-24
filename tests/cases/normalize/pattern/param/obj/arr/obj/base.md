# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [{}] }) {
  return 'ok';
}
$(f({ x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternCrashTest = arrPatternStep === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpObjPropValue;
('<hoisted func decl `f`>');
tmpElement = { x: 1, y: 2, c: 3 };
tmpObjPropValue = [tmpElement, 13, 14];
tmpArg$1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternCrashTest = arrPatternStep === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpObjPropValue;
tmpElement = { x: 1, y: 2, c: 3 };
tmpObjPropValue = [tmpElement, 13, 14];
tmpArg$1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
