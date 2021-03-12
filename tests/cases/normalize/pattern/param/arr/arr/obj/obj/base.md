# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  [
    {
      x: {},
    },
  ],
]) {
  return 'ok';
}
$(f([[{ x: { a: 1, b: 2, c: 3 } }, 20, 30], 40, 50], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [
    [
      {
        x: {},
      },
    ],
  ] = tmpParamPattern;
  return 'ok';
};
$(f([[{ x: { a: 1, b: 2, c: 3 } }, 20, 30], 40, 50], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let objPatternNoDefault = arrPatternStep$1.x;
  let objPatternCrashTest = objPatternNoDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
const tmpArrElement$1 = { x: tmpObjLitVal };
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
  const objPatternNoDefault = arrPatternStep$1.x;
  let objPatternCrashTest = objPatternNoDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternNoDefault.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
const tmpArrElement$1 = { x: tmpObjLitVal };
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
