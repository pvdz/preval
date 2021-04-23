# Preval test case

# default_yes_yes__str.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('pass')] = $(['fail2'])) {
  return 'ok';
}
$(f('abc', 100));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{} = $('pass')] = tmpParamBare === undefined ? $(['fail2']) : tmpParamBare;
  return 'ok';
};
$(f('abc', 100));
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
      arrPatternStep = $('pass');
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
const tmpCalleeParam$3 = f('abc', 100);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
let arrPatternStep = undefined;
let objPatternCrashTest = undefined;
const tmpBranchingC$3 = function () {
  debugger;
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep.cannotDestructureThis;
    return undefined;
  } else {
    return undefined;
  }
};
const tmpBranchingC$1 = function () {
  debugger;
  objPatternCrashTest = arrPatternStep === undefined;
  if (objPatternCrashTest) {
    tmpBranchingC$3();
    return undefined;
  } else {
    objPatternCrashTest = arrPatternStep === null;
    tmpBranchingC$3();
    return undefined;
  }
};
const tmpSSA_tmpssa2_arrPatternSplat = ['a', 'b', 'c'];
const tmpSSA_tmpssa3_arrPatternBeforeDefault = tmpSSA_tmpssa2_arrPatternSplat[0];
const tmpIfTest$1 = tmpSSA_tmpssa3_arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  arrPatternStep = $('pass');
  tmpBranchingC$1();
} else {
  arrPatternStep = tmpSSA_tmpssa3_arrPatternBeforeDefault;
  tmpBranchingC$1();
}
$('ok');
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
