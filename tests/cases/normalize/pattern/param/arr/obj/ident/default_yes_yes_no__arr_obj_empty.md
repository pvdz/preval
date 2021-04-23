# Preval test case

# default_yes_yes_no__arr_obj_empty.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes no  arr obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })]) {
  return x;
}
$(f([{}, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x = $('pass') } = $({ x: 'fail2' })] = tmpParamBare;
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
    const tmpCalleeParam$1 = { x: 'fail2' };
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
    objPatternBeforeDefault = arrPatternStep.x;
    const tmpIfTest$1 = objPatternBeforeDefault === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      x = $('pass');
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      x = objPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
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
  let objPatternBeforeDefault = undefined;
  let x = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpArrElement = {};
const tmpCalleeParam$5 = [tmpArrElement, 20, 30];
const tmpCalleeParam$7 = 200;
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$3);
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
    const tmpssa3_objPatternBeforeDefault = arrPatternStep.x;
    const tmpIfTest$1 = tmpssa3_objPatternBeforeDefault === undefined;
    if (tmpIfTest$1) {
      const tmpssa2_x = $('pass');
      return tmpssa2_x;
    } else {
      return tmpssa3_objPatternBeforeDefault;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { x: 'fail2' };
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
const tmpCalleeParam$5 = [tmpArrElement, 20, 30];
const tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
