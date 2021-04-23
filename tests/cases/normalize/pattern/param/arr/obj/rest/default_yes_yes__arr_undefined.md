# Preval test case

# default_yes_yes__arr_undefined.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'pass' })] = $([{ a: 'fail2' }])) {
  return x;
}
$(f([undefined, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: 'pass' })] = tmpParamBare === undefined ? $([{ a: 'fail2' }]) : tmpParamBare;
  return x;
};
$(f([undefined, 20, 30], 200));
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
    const tmpArrElement$1 = { a: 'fail2' };
    const tmpCalleeParam$1 = [tmpArrElement$1];
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
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = { a: 'pass' };
      arrPatternStep = tmpCallCallee$5(tmpCalleeParam$5);
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
      const tmpCallCallee$7 = objPatternRest;
      const tmpCalleeParam$7 = arrPatternStep;
      const tmpCalleeParam$9 = [];
      const tmpCalleeParam$11 = undefined;
      x = tmpCallCallee$7(tmpCalleeParam$7, tmpCalleeParam$9, tmpCalleeParam$11);
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
  let x = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$9 = $;
const tmpCallCallee$11 = f;
const tmpCalleeParam$15 = [undefined, 20, 30];
const tmpCalleeParam$17 = 200;
const tmpCalleeParam$13 = tmpCallCallee$11(tmpCalleeParam$15, tmpCalleeParam$17);
tmpCallCallee$9(tmpCalleeParam$13);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpBranchingC$1 = function () {
    debugger;
    const tmpCalleeParam$7 = arrPatternStep;
    const tmpCalleeParam$9 = [];
    const tmpSSA_tmpssa2_x = objPatternRest(tmpCalleeParam$7, tmpCalleeParam$9, undefined);
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
      const tmpCalleeParam$5 = { a: 'pass' };
      arrPatternStep = $(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    } else {
      arrPatternStep = tmpSSA_tmpssa3_arrPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpArrElement$1 = { a: 'fail2' };
    const tmpCalleeParam$1 = [tmpArrElement$1];
    bindingPatternArrRoot = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    bindingPatternArrRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$15 = [undefined, 20, 30];
const tmpCalleeParam$13 = f(tmpCalleeParam$15);
$(tmpCalleeParam$13);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
