# Preval test case

# default_yes_yes__arr_elided.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')] = $(['fail2'])) {
  return 'ok';
}
$(f([, , , 1, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{} = $('fail')] = tmpParamBare === undefined ? $(['fail2']) : tmpParamBare;
  return 'ok';
};
$(f([, , , 1, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['fail2'];
    bindingPatternArrRoot = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    bindingPatternArrRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    arrPatternSplat = [...bindingPatternArrRoot];
    arrPatternBeforeDefault = arrPatternSplat[0];
    const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      arrPatternStep = $('fail');
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      arrPatternStep = arrPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      objPatternCrashTest = arrPatternStep === undefined;
      const tmpBranchingA$3 = function () {
        debugger;
        const tmpReturnArg$7 = tmpBranchingC$3();
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        objPatternCrashTest = arrPatternStep === null;
        const tmpReturnArg$9 = tmpBranchingC$3();
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpBranchingA$5 = function () {
          debugger;
          objPatternCrashTest = arrPatternStep.cannotDestructureThis;
          const tmpReturnArg$11 = tmpBranchingC$5();
          return tmpReturnArg$11;
        };
        const tmpBranchingB$5 = function () {
          debugger;
          const tmpReturnArg$13 = tmpBranchingC$5();
          return tmpReturnArg$13;
        };
        const tmpBranchingC$5 = function () {
          debugger;
          return 'ok';
        };
        if (objPatternCrashTest) {
          const tmpReturnArg$15 = tmpBranchingA$5();
          return tmpReturnArg$15;
        } else {
          const tmpReturnArg$17 = tmpBranchingB$5();
          return tmpReturnArg$17;
        }
      };
      if (objPatternCrashTest) {
        const tmpReturnArg$19 = tmpBranchingA$3();
        return tmpReturnArg$19;
      } else {
        const tmpReturnArg$21 = tmpBranchingB$3();
        return tmpReturnArg$21;
      }
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$23 = tmpBranchingA$1();
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1();
      return tmpReturnArg$25;
    }
  };
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let objPatternCrashTest = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$27 = tmpBranchingA();
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$29 = tmpBranchingB();
    return tmpReturnArg$29;
  }
};
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = [, , , 1, 20, 30];
const tmpCalleeParam$7 = 200;
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpBranchingC$3 = function () {
    debugger;
    if (objPatternCrashTest) {
      objPatternCrashTest = arrPatternStep.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  const tmpBranchingC$1 = function () {
    debugger;
    objPatternCrashTest = arrPatternStep === undefined;
    if (objPatternCrashTest) {
      const tmpReturnArg$19 = tmpBranchingC$3();
      return tmpReturnArg$19;
    } else {
      objPatternCrashTest = arrPatternStep === null;
      const tmpReturnArg$9 = tmpBranchingC$3();
      return tmpReturnArg$9;
    }
  };
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function () {
    debugger;
    arrPatternSplat = [...bindingPatternArrRoot];
    arrPatternBeforeDefault = arrPatternSplat[0];
    const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
    if (tmpIfTest$1) {
      arrPatternStep = $('fail');
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    } else {
      arrPatternStep = arrPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    }
  };
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let objPatternCrashTest = undefined;
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['fail2'];
    bindingPatternArrRoot = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    bindingPatternArrRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$5 = [, , , 1, 20, 30];
const tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'fail'
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
