# Preval test case

# default_yes_no__null.md

> Normalize > Pattern > Param > Arr > Obj > Default yes no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')]) {
  return 'bad';
}
$(f(null, 100));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{} = $('fail')] = tmpParamBare;
  return 'bad';
};
$(f(null, 100));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function () {
    debugger;
    arrPatternStep = $('fail');
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    arrPatternStep = arrPatternBeforeDefault;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    objPatternCrashTest = arrPatternStep === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      objPatternCrashTest = arrPatternStep === null;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpBranchingA$3 = function () {
        debugger;
        objPatternCrashTest = arrPatternStep.cannotDestructureThis;
        const tmpReturnArg$7 = tmpBranchingC$3();
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$9 = tmpBranchingC$3();
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        return 'bad';
      };
      if (objPatternCrashTest) {
        const tmpReturnArg$11 = tmpBranchingA$3();
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3();
        return tmpReturnArg$13;
      }
    };
    if (objPatternCrashTest) {
      const tmpReturnArg$15 = tmpBranchingA$1();
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1();
      return tmpReturnArg$17;
    }
  };
  let objPatternCrashTest = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA();
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB();
    return tmpReturnArg$21;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(null, 100);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingC$1 = function () {
  debugger;
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep.cannotDestructureThis;
    return undefined;
  } else {
    return undefined;
  }
};
const arrPatternSplat = [...null];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
const tmpBranchingC = function () {
  debugger;
  objPatternCrashTest = arrPatternStep === undefined;
  if (objPatternCrashTest) {
    tmpBranchingC$1();
    return undefined;
  } else {
    objPatternCrashTest = arrPatternStep === null;
    tmpBranchingC$1();
    return undefined;
  }
};
let objPatternCrashTest = undefined;
if (tmpIfTest) {
  arrPatternStep = $('fail');
  tmpBranchingC();
} else {
  arrPatternStep = arrPatternBeforeDefault;
  tmpBranchingC();
}
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
