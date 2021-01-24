# Preval test case

# base.md

> normalize > pattern > param > arr > arr > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[[[{}]]]]) {
  return 'ok';
}
$(f([[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let arrPatternSplat$2 = [...arrPatternStep$1];
  let arrPatternStep$2 = arrPatternSplat$2[0];
  let arrPatternSplat$3 = [...arrPatternStep$2];
  let arrPatternStep$3 = arrPatternSplat$3[0];
  let objPatternCrashTest = arrPatternStep$3 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep$3 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep$3.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpElement$1;
var tmpElement$2;
var tmpElement$3;
('<hoisted func decl `f`>');
tmpElement$3 = { x: 1 };
tmpElement$2 = [tmpElement$3, 6, 7];
tmpElement$1 = [tmpElement$2, 4, 5];
tmpElement = [tmpElement$1, 20, 30];
tmpArg$1 = [tmpElement, 40, 50];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let arrPatternSplat$2 = [...arrPatternStep$1];
  let arrPatternStep$2 = arrPatternSplat$2[0];
  let arrPatternSplat$3 = [...arrPatternStep$2];
  let arrPatternStep$3 = arrPatternSplat$3[0];
  let objPatternCrashTest = arrPatternStep$3 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep$3 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep$3.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpElement$1;
var tmpElement$2;
var tmpElement$3;
tmpElement$3 = { x: 1 };
tmpElement$2 = [tmpElement$3, 6, 7];
tmpElement$1 = [tmpElement$2, 4, 5];
tmpElement = [tmpElement$1, 20, 30];
tmpArg$1 = [tmpElement, 40, 50];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
