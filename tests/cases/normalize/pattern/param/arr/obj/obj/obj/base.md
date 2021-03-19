# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Obj > Obj > Base
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

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [
    {
      x: {
        y: {},
      },
    },
  ] = tmpParamPattern;
  return 'ok';
};
$(f([{ x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 }, 10], 100));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternCrashTest = objPatternNoDefault$1 === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternArrRoot$1,
    arrPatternSplat$1,
    arrPatternStep$1,
    objPatternNoDefault$2,
    objPatternNoDefault$3,
    objPatternCrashTest$1,
  ) {
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternNoDefault$2,
      objPatternNoDefault$3,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternArrRoot$2,
    arrPatternSplat$2,
    arrPatternStep$2,
    objPatternNoDefault$4,
    objPatternNoDefault$5,
    objPatternCrashTest$2,
  ) {
    objPatternCrashTest$2 = objPatternNoDefault$5 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$2,
      arrPatternStep$2,
      objPatternNoDefault$4,
      objPatternNoDefault$5,
      objPatternCrashTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternArrRoot$3,
    arrPatternSplat$3,
    arrPatternStep$3,
    objPatternNoDefault$6,
    objPatternNoDefault$7,
    objPatternCrashTest$3,
  ) {
    const tmpBranchingA$1 = function (
      tmpParamPattern$4,
      bindingPatternArrRoot$4,
      arrPatternSplat$4,
      arrPatternStep$4,
      objPatternNoDefault$8,
      objPatternNoDefault$9,
      objPatternCrashTest$4,
    ) {
      objPatternCrashTest$4 = objPatternNoDefault$9.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamPattern$4,
        bindingPatternArrRoot$4,
        arrPatternSplat$4,
        arrPatternStep$4,
        objPatternNoDefault$8,
        objPatternNoDefault$9,
        objPatternCrashTest$4,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamPattern$5,
      bindingPatternArrRoot$5,
      arrPatternSplat$5,
      arrPatternStep$5,
      objPatternNoDefault$10,
      objPatternNoDefault$11,
      objPatternCrashTest$5,
    ) {
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamPattern$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$5,
        arrPatternStep$5,
        objPatternNoDefault$10,
        objPatternNoDefault$11,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamPattern$6,
      bindingPatternArrRoot$6,
      arrPatternSplat$6,
      arrPatternStep$6,
      objPatternNoDefault$12,
      objPatternNoDefault$13,
      objPatternCrashTest$6,
    ) {
      return 'ok';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamPattern$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternStep$3,
        objPatternNoDefault$6,
        objPatternNoDefault$7,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamPattern$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternStep$3,
        objPatternNoDefault$6,
        objPatternNoDefault$7,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$5;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      objPatternNoDefault,
      objPatternNoDefault$1,
      objPatternCrashTest,
    );
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      objPatternNoDefault,
      objPatternNoDefault$1,
      objPatternCrashTest,
    );
    return tmpReturnArg$7;
  }
};
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
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternStep = arrPatternSplat[0];
  const objPatternNoDefault = arrPatternStep.x;
  const objPatternNoDefault$1 = objPatternNoDefault.y;
  const objPatternCrashTest = objPatternNoDefault$1 === undefined;
  const tmpBranchingC = function (objPatternNoDefault$7, objPatternCrashTest$3) {
    if (objPatternCrashTest$3) {
      objPatternNoDefault$7.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(objPatternNoDefault$1, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = objPatternNoDefault$1 === null;
    const tmpReturnArg$1 = tmpBranchingC(objPatternNoDefault$1, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpObjLitVal$2 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$2, z: 31 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 10];
const tmpCalleeParam = f(tmpCalleeParam$1, 100);
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
