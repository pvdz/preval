# Preval test case

# default_yes_yes_no__arr_empty.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'pass2' })]) {
  return x;
}
$(f([], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [{ x = $('pass') } = $({ x: 'pass2' })] = tmpParamPattern;
  return x;
};
$(f([], 200));
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
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { x: 'pass2' };
    arrPatternStep$1 = tmpCallCallee$1(tmpCalleeParam$1);
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
    let objPatternBeforeDefault$1 = arrPatternStep$3.x;
    let x$1 = undefined;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamPattern$4,
      bindingPatternArrRoot$4,
      arrPatternSplat$4,
      arrPatternBeforeDefault$4,
      arrPatternStep$4,
      tmpIfTest$5,
      objPatternBeforeDefault$2,
      x$2,
      tmpIfTest$6,
    ) {
      x$2 = $('pass');
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamPattern$4,
        bindingPatternArrRoot$4,
        arrPatternSplat$4,
        arrPatternBeforeDefault$4,
        arrPatternStep$4,
        tmpIfTest$5,
        objPatternBeforeDefault$2,
        x$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamPattern$5,
      bindingPatternArrRoot$5,
      arrPatternSplat$5,
      arrPatternBeforeDefault$5,
      arrPatternStep$5,
      tmpIfTest$7,
      objPatternBeforeDefault$3,
      x$3,
      tmpIfTest$8,
    ) {
      x$3 = objPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamPattern$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$5,
        tmpIfTest$7,
        objPatternBeforeDefault$3,
        x$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamPattern$6,
      bindingPatternArrRoot$6,
      arrPatternSplat$6,
      arrPatternBeforeDefault$6,
      arrPatternStep$6,
      tmpIfTest$9,
      objPatternBeforeDefault$4,
      x$4,
      tmpIfTest$10,
    ) {
      return x$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamPattern$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        x$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamPattern$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        x$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = [];
const tmpCalleeParam$4 = 200;
const tmpCalleeParam$2 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingC = function (arrPatternStep$3) {
    const objPatternBeforeDefault$1 = arrPatternStep$3.x;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    if (tmpIfTest$4) {
      const SSA_x$2 = $('pass');
      return SSA_x$2;
    } else {
      return objPatternBeforeDefault$1;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { x: 'pass2' };
    const SSA_arrPatternStep$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_arrPatternStep$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(arrPatternBeforeDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$3 = [];
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 200);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
