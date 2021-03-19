# Preval test case

# default_yes_yes__arr_obj_empty.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')] = $(['fail2'])) {
  return 'ok';
}
$(f([{}, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [{} = $('fail')] = tmpParamDefault === undefined ? $(['fail2']) : tmpParamDefault;
  return 'ok';
};
$(f([{}, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternArrRoot$1, tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['fail2'];
    bindingPatternArrRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, bindingPatternArrRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, bindingPatternArrRoot$2, tmpIfTest$2) {
    bindingPatternArrRoot$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, bindingPatternArrRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, bindingPatternArrRoot$3, tmpIfTest$3) {
    let arrPatternSplat$1 = [...bindingPatternArrRoot$3];
    let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    let arrPatternStep$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamDefault$4,
      bindingPatternArrRoot$4,
      tmpIfTest$5,
      arrPatternSplat$2,
      arrPatternBeforeDefault$2,
      arrPatternStep$2,
      tmpIfTest$6,
    ) {
      arrPatternStep$2 = $('fail');
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamDefault$4,
        bindingPatternArrRoot$4,
        tmpIfTest$5,
        arrPatternSplat$2,
        arrPatternBeforeDefault$2,
        arrPatternStep$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamDefault$5,
      bindingPatternArrRoot$5,
      tmpIfTest$7,
      arrPatternSplat$3,
      arrPatternBeforeDefault$3,
      arrPatternStep$3,
      tmpIfTest$8,
    ) {
      arrPatternStep$3 = arrPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamDefault$5,
        bindingPatternArrRoot$5,
        tmpIfTest$7,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamDefault$6,
      bindingPatternArrRoot$6,
      tmpIfTest$9,
      arrPatternSplat$4,
      arrPatternBeforeDefault$4,
      arrPatternStep$4,
      tmpIfTest$10,
    ) {
      let objPatternCrashTest$2 = arrPatternStep$4 === undefined;
      const tmpBranchingA$2 = function (
        tmpParamDefault$7,
        bindingPatternArrRoot$7,
        tmpIfTest$11,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$5,
        tmpIfTest$12,
        objPatternCrashTest$3,
      ) {
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamDefault$7,
          bindingPatternArrRoot$7,
          tmpIfTest$11,
          arrPatternSplat$5,
          arrPatternBeforeDefault$5,
          arrPatternStep$5,
          tmpIfTest$12,
          objPatternCrashTest$3,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function (
        tmpParamDefault$8,
        bindingPatternArrRoot$8,
        tmpIfTest$13,
        arrPatternSplat$6,
        arrPatternBeforeDefault$6,
        arrPatternStep$6,
        tmpIfTest$14,
        objPatternCrashTest$4,
      ) {
        objPatternCrashTest$4 = arrPatternStep$6 === null;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamDefault$8,
          bindingPatternArrRoot$8,
          tmpIfTest$13,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$6,
          tmpIfTest$14,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function (
        tmpParamDefault$9,
        bindingPatternArrRoot$9,
        tmpIfTest$15,
        arrPatternSplat$7,
        arrPatternBeforeDefault$7,
        arrPatternStep$7,
        tmpIfTest$16,
        objPatternCrashTest$5,
      ) {
        const tmpBranchingA$3 = function (
          tmpParamDefault$10,
          bindingPatternArrRoot$10,
          tmpIfTest$17,
          arrPatternSplat$8,
          arrPatternBeforeDefault$8,
          arrPatternStep$8,
          tmpIfTest$18,
          objPatternCrashTest$6,
        ) {
          objPatternCrashTest$6 = arrPatternStep$8.cannotDestructureThis;
          const tmpReturnArg$6 = tmpBranchingC$3(
            tmpParamDefault$10,
            bindingPatternArrRoot$10,
            tmpIfTest$17,
            arrPatternSplat$8,
            arrPatternBeforeDefault$8,
            arrPatternStep$8,
            tmpIfTest$18,
            objPatternCrashTest$6,
          );
          return tmpReturnArg$6;
        };
        const tmpBranchingB$3 = function (
          tmpParamDefault$11,
          bindingPatternArrRoot$11,
          tmpIfTest$19,
          arrPatternSplat$9,
          arrPatternBeforeDefault$9,
          arrPatternStep$9,
          tmpIfTest$20,
          objPatternCrashTest$7,
        ) {
          const tmpReturnArg$7 = tmpBranchingC$3(
            tmpParamDefault$11,
            bindingPatternArrRoot$11,
            tmpIfTest$19,
            arrPatternSplat$9,
            arrPatternBeforeDefault$9,
            arrPatternStep$9,
            tmpIfTest$20,
            objPatternCrashTest$7,
          );
          return tmpReturnArg$7;
        };
        const tmpBranchingC$3 = function (
          tmpParamDefault$12,
          bindingPatternArrRoot$12,
          tmpIfTest$21,
          arrPatternSplat$10,
          arrPatternBeforeDefault$10,
          arrPatternStep$10,
          tmpIfTest$22,
          objPatternCrashTest$8,
        ) {
          return 'ok';
        };
        if (objPatternCrashTest$5) {
          const tmpReturnArg$8 = tmpBranchingA$3(
            tmpParamDefault$9,
            bindingPatternArrRoot$9,
            tmpIfTest$15,
            arrPatternSplat$7,
            arrPatternBeforeDefault$7,
            arrPatternStep$7,
            tmpIfTest$16,
            objPatternCrashTest$5,
          );
          return tmpReturnArg$8;
        } else {
          const tmpReturnArg$9 = tmpBranchingB$3(
            tmpParamDefault$9,
            bindingPatternArrRoot$9,
            tmpIfTest$15,
            arrPatternSplat$7,
            arrPatternBeforeDefault$7,
            arrPatternStep$7,
            tmpIfTest$16,
            objPatternCrashTest$5,
          );
          return tmpReturnArg$9;
        }
      };
      if (objPatternCrashTest$2) {
        const tmpReturnArg$10 = tmpBranchingA$2(
          tmpParamDefault$6,
          bindingPatternArrRoot$6,
          tmpIfTest$9,
          arrPatternSplat$4,
          arrPatternBeforeDefault$4,
          arrPatternStep$4,
          tmpIfTest$10,
          objPatternCrashTest$2,
        );
        return tmpReturnArg$10;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$2(
          tmpParamDefault$6,
          bindingPatternArrRoot$6,
          tmpIfTest$9,
          arrPatternSplat$4,
          arrPatternBeforeDefault$4,
          arrPatternStep$4,
          tmpIfTest$10,
          objPatternCrashTest$2,
        );
        return tmpReturnArg$11;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$12 = tmpBranchingA$1(
        tmpParamDefault$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$12;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(
        tmpParamDefault$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$14 = tmpBranchingA(tmpParamDefault, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$14;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(tmpParamDefault, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$15;
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpArrElement = {};
const tmpCalleeParam$3 = [tmpArrElement, 20, 30];
const tmpCalleeParam$4 = 200;
const tmpCalleeParam$2 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternArrRoot$3) {
    const arrPatternSplat$1 = [...bindingPatternArrRoot$3];
    const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingC$1 = function (arrPatternStep$4) {
      const objPatternCrashTest$2 = arrPatternStep$4 === undefined;
      const tmpBranchingC$2 = function (arrPatternStep$7, objPatternCrashTest$5) {
        if (objPatternCrashTest$5) {
          arrPatternStep$7.cannotDestructureThis;
          return 'ok';
        } else {
          return 'ok';
        }
      };
      if (objPatternCrashTest$2) {
        const tmpReturnArg$10 = tmpBranchingC$2(arrPatternStep$4, objPatternCrashTest$2);
        return tmpReturnArg$10;
      } else {
        const SSA_objPatternCrashTest$4 = arrPatternStep$4 === null;
        const tmpReturnArg$5 = tmpBranchingC$2(arrPatternStep$4, SSA_objPatternCrashTest$4);
        return tmpReturnArg$5;
      }
    };
    if (tmpIfTest$4) {
      const SSA_arrPatternStep$2 = $('fail');
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_arrPatternStep$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingC$1(arrPatternBeforeDefault$1);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['fail2'];
    const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpArrElement = {};
const tmpCalleeParam$3 = [tmpArrElement, 20, 30];
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 200);
$(tmpCalleeParam$2);
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
