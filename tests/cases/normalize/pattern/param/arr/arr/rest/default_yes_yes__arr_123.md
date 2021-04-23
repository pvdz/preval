# Preval test case

# default_yes_yes__arr_123.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes yes  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x] = $('pass')] = $('fail2')) {
  return x;
}
$(f([1, 2, 3, 4, 5], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[...x] = $('pass')] = tmpParamBare === undefined ? $('fail2') : tmpParamBare;
  return x;
};
$(f([1, 2, 3, 4, 5], 200));
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
    bindingPatternArrRoot = $('fail2');
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
      arrPatternSplat$1 = [...arrPatternStep];
      x = arrPatternSplat$1.slice(0);
      return x;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let arrPatternSplat$1 = undefined;
  let x = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [1, 2, 3, 4, 5];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpBranchingC$1 = function () {
    debugger;
    const tmpSSA_tmpssa2_arrPatternSplat$1 = [...arrPatternStep];
    const tmpSSA_tmpssa2_x = tmpSSA_tmpssa2_arrPatternSplat$1.slice(0);
    return tmpSSA_tmpssa2_x;
  };
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  let arrPatternStep = undefined;
  const tmpBranchingC = function () {
    debugger;
    const tmpSSA_tmpssa2_arrPatternSplat = [...bindingPatternArrRoot];
    const tmpSSA_tmpssa3_arrPatternBeforeDefault = tmpSSA_tmpssa2_arrPatternSplat[0];
    const tmpIfTest$1 = tmpSSA_tmpssa3_arrPatternBeforeDefault === undefined;
    if (tmpIfTest$1) {
      arrPatternStep = $('pass');
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    } else {
      arrPatternStep = tmpSSA_tmpssa3_arrPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    bindingPatternArrRoot = $('fail2');
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    bindingPatternArrRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$1 = [1, 2, 3, 4, 5];
const tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
