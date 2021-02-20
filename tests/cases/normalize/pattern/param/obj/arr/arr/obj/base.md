# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [[{}]] }) {
  return 'ok';
}
$(f({ x: [[{ a: 1, b: 2, c: 3 }, 14], 13], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
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
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpArrElement = [tmpArrElement$1, 14];
const tmpObjLitVal = [tmpArrElement, 13];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  const arrPatternSplat = [...objPatternNoDefault];
  const arrPatternStep = arrPatternSplat[0];
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternStep$1 = arrPatternSplat$1[0];
  let objPatternCrashTest = arrPatternStep$1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep$1 === null;
  }
  if (objPatternCrashTest) {
    arrPatternStep$1.cannotDestructureThis;
  }
  return 'ok';
}
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpArrElement = [tmpArrElement$1, 14];
const tmpObjLitVal = [tmpArrElement, 13];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
