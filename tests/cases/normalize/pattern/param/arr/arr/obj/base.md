# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Obj > Base
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

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [[{}]] = tmpParamPattern;
  return 'ok';
};
$(f([[{ x: 1 }, 20, 30], 40, 50], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let objPatternCrashTest = arrPatternStep$1 === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternArrRoot$1,
    arrPatternSplat$2,
    arrPatternStep$2,
    arrPatternSplat$3,
    arrPatternStep$3,
    objPatternCrashTest$1,
  ) {
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$2,
      arrPatternStep$2,
      arrPatternSplat$3,
      arrPatternStep$3,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternArrRoot$2,
    arrPatternSplat$4,
    arrPatternStep$4,
    arrPatternSplat$5,
    arrPatternStep$5,
    objPatternCrashTest$2,
  ) {
    objPatternCrashTest$2 = arrPatternStep$5 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$4,
      arrPatternStep$4,
      arrPatternSplat$5,
      arrPatternStep$5,
      objPatternCrashTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternArrRoot$3,
    arrPatternSplat$6,
    arrPatternStep$6,
    arrPatternSplat$7,
    arrPatternStep$7,
    objPatternCrashTest$3,
  ) {
    const tmpBranchingA$1 = function (
      tmpParamPattern$4,
      bindingPatternArrRoot$4,
      arrPatternSplat$8,
      arrPatternStep$8,
      arrPatternSplat$9,
      arrPatternStep$9,
      objPatternCrashTest$4,
    ) {
      objPatternCrashTest$4 = arrPatternStep$9.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamPattern$4,
        bindingPatternArrRoot$4,
        arrPatternSplat$8,
        arrPatternStep$8,
        arrPatternSplat$9,
        arrPatternStep$9,
        objPatternCrashTest$4,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamPattern$5,
      bindingPatternArrRoot$5,
      arrPatternSplat$10,
      arrPatternStep$10,
      arrPatternSplat$11,
      arrPatternStep$11,
      objPatternCrashTest$5,
    ) {
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamPattern$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$10,
        arrPatternStep$10,
        arrPatternSplat$11,
        arrPatternStep$11,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamPattern$6,
      bindingPatternArrRoot$6,
      arrPatternSplat$12,
      arrPatternStep$12,
      arrPatternSplat$13,
      arrPatternStep$13,
      objPatternCrashTest$6,
    ) {
      return 'ok';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamPattern$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$6,
        arrPatternStep$6,
        arrPatternSplat$7,
        arrPatternStep$7,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamPattern$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$6,
        arrPatternStep$6,
        arrPatternSplat$7,
        arrPatternStep$7,
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
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternCrashTest,
    );
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternCrashTest,
    );
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement$1 = { x: 1 };
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
  const objPatternCrashTest = arrPatternStep$1 === undefined;
  const tmpBranchingC = function (arrPatternStep$7, objPatternCrashTest$3) {
    if (objPatternCrashTest$3) {
      arrPatternStep$7.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(arrPatternStep$1, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = arrPatternStep$1 === null;
    const tmpReturnArg$1 = tmpBranchingC(arrPatternStep$1, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpArrElement$1 = { x: 1 };
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
