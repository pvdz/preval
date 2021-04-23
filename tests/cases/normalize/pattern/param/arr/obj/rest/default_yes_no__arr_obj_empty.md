# Preval test case

# default_yes_no__arr_obj_empty.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes no  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return x;
}
$(f([{}, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: 'fail' })] = tmpParamBare;
  return x;
};
$(f([{}, 20, 30], 200));
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
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'fail' };
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
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
    const tmpCallCallee$3 = objPatternRest;
    const tmpCalleeParam$3 = arrPatternStep;
    const tmpCalleeParam$5 = [];
    const tmpCalleeParam$7 = undefined;
    x = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
    return x;
  };
  let x = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$5 = $;
const tmpCallCallee$7 = f;
const tmpArrElement = {};
const tmpCalleeParam$11 = [tmpArrElement, 20, 30];
const tmpCalleeParam$13 = 200;
const tmpCalleeParam$9 = tmpCallCallee$7(tmpCalleeParam$11, tmpCalleeParam$13);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const arrPatternSplat = [...tmpParamBare];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingC = function () {
    debugger;
    const tmpCalleeParam$3 = arrPatternStep;
    const tmpCalleeParam$5 = [];
    const tmpssa2_x = objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
    return tmpssa2_x;
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { a: 'fail' };
    arrPatternStep = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    arrPatternStep = arrPatternBeforeDefault;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  }
};
const tmpArrElement = {};
const tmpCalleeParam$11 = [tmpArrElement, 20, 30];
const tmpCalleeParam$9 = f(tmpCalleeParam$11);
$(tmpCalleeParam$9);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
