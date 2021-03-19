# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Obj > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: [{}],
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: [{ a: 1, b: 2, c: 3 }, 15], z: 14 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let {
    x: {
      y: [{}],
    },
  } = tmpParamPattern;
  return 'ok';
};
$(f({ x: { x: 13, y: [{ a: 1, b: 2, c: 3 }, 15], z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let arrPatternSplat = [...objPatternNoDefault$1];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternCrashTest = arrPatternStep === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternObjRoot$1,
    objPatternNoDefault$2,
    objPatternNoDefault$3,
    arrPatternSplat$1,
    arrPatternStep$1,
    objPatternCrashTest$1,
  ) {
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternObjRoot$1,
      objPatternNoDefault$2,
      objPatternNoDefault$3,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternObjRoot$2,
    objPatternNoDefault$4,
    objPatternNoDefault$5,
    arrPatternSplat$2,
    arrPatternStep$2,
    objPatternCrashTest$2,
  ) {
    objPatternCrashTest$2 = arrPatternStep$2 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternObjRoot$2,
      objPatternNoDefault$4,
      objPatternNoDefault$5,
      arrPatternSplat$2,
      arrPatternStep$2,
      objPatternCrashTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternObjRoot$3,
    objPatternNoDefault$6,
    objPatternNoDefault$7,
    arrPatternSplat$3,
    arrPatternStep$3,
    objPatternCrashTest$3,
  ) {
    const tmpBranchingA$1 = function (
      tmpParamPattern$4,
      bindingPatternObjRoot$4,
      objPatternNoDefault$8,
      objPatternNoDefault$9,
      arrPatternSplat$4,
      arrPatternStep$4,
      objPatternCrashTest$4,
    ) {
      objPatternCrashTest$4 = arrPatternStep$4.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamPattern$4,
        bindingPatternObjRoot$4,
        objPatternNoDefault$8,
        objPatternNoDefault$9,
        arrPatternSplat$4,
        arrPatternStep$4,
        objPatternCrashTest$4,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamPattern$5,
      bindingPatternObjRoot$5,
      objPatternNoDefault$10,
      objPatternNoDefault$11,
      arrPatternSplat$5,
      arrPatternStep$5,
      objPatternCrashTest$5,
    ) {
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamPattern$5,
        bindingPatternObjRoot$5,
        objPatternNoDefault$10,
        objPatternNoDefault$11,
        arrPatternSplat$5,
        arrPatternStep$5,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamPattern$6,
      bindingPatternObjRoot$6,
      objPatternNoDefault$12,
      objPatternNoDefault$13,
      arrPatternSplat$6,
      arrPatternStep$6,
      objPatternCrashTest$6,
    ) {
      return 'ok';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamPattern$3,
        bindingPatternObjRoot$3,
        objPatternNoDefault$6,
        objPatternNoDefault$7,
        arrPatternSplat$3,
        arrPatternStep$3,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamPattern$3,
        bindingPatternObjRoot$3,
        objPatternNoDefault$6,
        objPatternNoDefault$7,
        arrPatternSplat$3,
        arrPatternStep$3,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$5;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternNoDefault,
      objPatternNoDefault$1,
      arrPatternSplat,
      arrPatternStep,
      objPatternCrashTest,
    );
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternNoDefault,
      objPatternNoDefault$1,
      arrPatternSplat,
      arrPatternStep,
      objPatternCrashTest,
    );
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal$1 = 13;
const tmpArrElement = { a: 1, b: 2, c: 3 };
const tmpObjLitVal$2 = [tmpArrElement, 15];
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: 14 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  const objPatternNoDefault$1 = objPatternNoDefault.y;
  const arrPatternSplat = [...objPatternNoDefault$1];
  const arrPatternStep = arrPatternSplat[0];
  const objPatternCrashTest = arrPatternStep === undefined;
  const tmpBranchingC = function (arrPatternStep$3, objPatternCrashTest$3) {
    if (objPatternCrashTest$3) {
      arrPatternStep$3.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(arrPatternStep, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = arrPatternStep === null;
    const tmpReturnArg$1 = tmpBranchingC(arrPatternStep, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpArrElement = { a: 1, b: 2, c: 3 };
const tmpObjLitVal$2 = [tmpArrElement, 15];
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$2, z: 14 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
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
