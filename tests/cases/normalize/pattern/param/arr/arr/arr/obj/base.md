# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Arr > Obj > Base
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

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [[[[{}]]]] = tmpParamPattern;
  return 'ok';
};
$(f([[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
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
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement$3 = { x: 1 };
const tmpArrElement$2 = [tmpArrElement$3, 6, 7];
const tmpArrElement$1 = [tmpArrElement$2, 4, 5];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternStep = arrPatternSplat[0];
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternStep$1 = arrPatternSplat$1[0];
  const arrPatternSplat$2 = [...arrPatternStep$1];
  const arrPatternStep$2 = arrPatternSplat$2[0];
  const arrPatternSplat$3 = [...arrPatternStep$2];
  const arrPatternStep$3 = arrPatternSplat$3[0];
  let objPatternCrashTest = arrPatternStep$3 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep$3 === null;
  }
  if (objPatternCrashTest) {
    arrPatternStep$3.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpArrElement$3 = { x: 1 };
const tmpArrElement$2 = [tmpArrElement$3, 6, 7];
const tmpArrElement$1 = [tmpArrElement$2, 4, 5];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
