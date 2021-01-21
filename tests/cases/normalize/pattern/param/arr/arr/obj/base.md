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
  let objPatternCrashTest = arrPatternStep_1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep_1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep_1.cannotDestructureThis;
  }
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

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternStep_1 = arrPatternSplat_1[0];
  let objPatternCrashTest = arrPatternStep_1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep_1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep_1.cannotDestructureThis;
  }
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

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
