# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: {
      y: {},
    },
  },
]) {
  return 'ok';
}
$(f([{ x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 }, 10], 100));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternCrashTest = objPatternNoDefault$1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault$1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault$1.cannotDestructureThis;
  }
  return 'ok';
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$2 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: 31 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 10];
const tmpCalleeParam$2 = 100;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternCrashTest = objPatternNoDefault$1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault$1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault$1.cannotDestructureThis;
  }
  return 'ok';
}
const tmpObjLitVal$2 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$2, z: 31 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 10];
const tmpCalleeParam = f(tmpCalleeParam$1, 100);
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
