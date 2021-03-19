# Preval test case

# default_yes_no__arr_0.md

> Normalize > Pattern > Param > Arr > Obj > Default yes no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')]) {
  return 'ok';
}
$(f([0, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [{} = $('fail')] = tmpParamPattern;
  return 'ok';
};
$(f([0, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternArrRoot$1,
    arrPatternSplat$1,
    arrPatternBeforeDefault$1,
    arrPatternStep$1,
    tmpIfTest$1,
  ) {
    arrPatternStep$1 = $('fail');
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$1,
      arrPatternBeforeDefault$1,
      arrPatternStep$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternArrRoot$2,
    arrPatternSplat$2,
    arrPatternBeforeDefault$2,
    arrPatternStep$2,
    tmpIfTest$2,
  ) {
    arrPatternStep$2 = arrPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$2,
      arrPatternBeforeDefault$2,
      arrPatternStep$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternArrRoot$3,
    arrPatternSplat$3,
    arrPatternBeforeDefault$3,
    arrPatternStep$3,
    tmpIfTest$3,
  ) {
    let objPatternCrashTest$1 = arrPatternStep$3 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamPattern$4,
      bindingPatternArrRoot$4,
      arrPatternSplat$4,
      arrPatternBeforeDefault$4,
      arrPatternStep$4,
      tmpIfTest$4,
      objPatternCrashTest$2,
    ) {
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamPattern$4,
        bindingPatternArrRoot$4,
        arrPatternSplat$4,
        arrPatternBeforeDefault$4,
        arrPatternStep$4,
        tmpIfTest$4,
        objPatternCrashTest$2,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamPattern$5,
      bindingPatternArrRoot$5,
      arrPatternSplat$5,
      arrPatternBeforeDefault$5,
      arrPatternStep$5,
      tmpIfTest$5,
      objPatternCrashTest$3,
    ) {
      objPatternCrashTest$3 = arrPatternStep$5 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamPattern$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$5,
        tmpIfTest$5,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamPattern$6,
      bindingPatternArrRoot$6,
      arrPatternSplat$6,
      arrPatternBeforeDefault$6,
      arrPatternStep$6,
      tmpIfTest$6,
      objPatternCrashTest$4,
    ) {
      const tmpBranchingA$2 = function (
        tmpParamPattern$7,
        bindingPatternArrRoot$7,
        arrPatternSplat$7,
        arrPatternBeforeDefault$7,
        arrPatternStep$7,
        tmpIfTest$7,
        objPatternCrashTest$5,
      ) {
        objPatternCrashTest$5 = arrPatternStep$7.cannotDestructureThis;
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamPattern$7,
          bindingPatternArrRoot$7,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          arrPatternStep$7,
          tmpIfTest$7,
          objPatternCrashTest$5,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function (
        tmpParamPattern$8,
        bindingPatternArrRoot$8,
        arrPatternSplat$8,
        arrPatternBeforeDefault$8,
        arrPatternStep$8,
        tmpIfTest$8,
        objPatternCrashTest$6,
      ) {
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamPattern$8,
          bindingPatternArrRoot$8,
          arrPatternSplat$8,
          arrPatternBeforeDefault$8,
          arrPatternStep$8,
          tmpIfTest$8,
          objPatternCrashTest$6,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function (
        tmpParamPattern$9,
        bindingPatternArrRoot$9,
        arrPatternSplat$9,
        arrPatternBeforeDefault$9,
        arrPatternStep$9,
        tmpIfTest$9,
        objPatternCrashTest$7,
      ) {
        return 'ok';
      };
      if (objPatternCrashTest$4) {
        const tmpReturnArg$6 = tmpBranchingA$2(
          tmpParamPattern$6,
          bindingPatternArrRoot$6,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$6,
          tmpIfTest$6,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(
          tmpParamPattern$6,
          bindingPatternArrRoot$6,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$6,
          tmpIfTest$6,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$7;
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$8 = tmpBranchingA$1(
        tmpParamPattern$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$3,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamPattern$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$3,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$11;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [0, 20, 30];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingC = function (arrPatternStep$3) {
    const objPatternCrashTest$1 = arrPatternStep$3 === undefined;
    const tmpBranchingC$1 = function (arrPatternStep$6, objPatternCrashTest$4) {
      if (objPatternCrashTest$4) {
        arrPatternStep$6.cannotDestructureThis;
        return 'ok';
      } else {
        return 'ok';
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$8 = tmpBranchingC$1(arrPatternStep$3, objPatternCrashTest$1);
      return tmpReturnArg$8;
    } else {
      const SSA_objPatternCrashTest$3 = arrPatternStep$3 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(arrPatternStep$3, SSA_objPatternCrashTest$3);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const SSA_arrPatternStep$1 = $('fail');
    const tmpReturnArg = tmpBranchingC(SSA_arrPatternStep$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(arrPatternBeforeDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$1 = [0, 20, 30];
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
