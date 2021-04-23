# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'pass2' }])) {
  return x;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: 'fail' })] = tmpParamBare === undefined ? $([{ a: 'pass2' }]) : tmpParamBare;
  return x;
};
$(f());
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
    const tmpArrElement$1 = { a: 'pass2' };
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
      const tmpCalleeParam$5 = { a: 'fail' };
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
const tmpCalleeParam$13 = f();
tmpCallCallee$9(tmpCalleeParam$13);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let arrPatternStep = undefined;
  const tmpBranchingC$1 = function () {
    debugger;
    const tmpCalleeParam$7 = arrPatternStep;
    const tmpCalleeParam$9 = [];
    const tmpSSA_tmpssa2_x = objPatternRest(tmpCalleeParam$7, tmpCalleeParam$9, undefined);
    return tmpSSA_tmpssa2_x;
  };
  const tmpArrElement$1 = { a: 'pass2' };
  const tmpCalleeParam$1 = [tmpArrElement$1];
  const tmpSSA_bindingPatternArrRoot = $(tmpCalleeParam$1);
  const tmpSSA_tmpssa2_arrPatternSplat = [...tmpSSA_bindingPatternArrRoot];
  const tmpSSA_tmpssa3_arrPatternBeforeDefault = tmpSSA_tmpssa2_arrPatternSplat[0];
  const tmpIfTest$1 = tmpSSA_tmpssa3_arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$2 = { a: 'fail' };
    arrPatternStep = $(tmpCalleeParam$2);
    const tmpReturnArg$1 = tmpBranchingC$1();
    return tmpReturnArg$1;
  } else {
    arrPatternStep = tmpSSA_tmpssa3_arrPatternBeforeDefault;
    const tmpReturnArg$4 = tmpBranchingC$1();
    return tmpReturnArg$4;
  }
};
const tmpCalleeParam$13 = f();
$(tmpCalleeParam$13);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [{ a: '"pass2"' }]
 - 2: { a: '"pass2"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
