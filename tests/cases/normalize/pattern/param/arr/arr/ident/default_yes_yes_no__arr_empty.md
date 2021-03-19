# Preval test case

# default_yes_yes_no__arr_empty.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['pass2'])]) {
  return x;
}
$(f([], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [[x = $('fail')] = $(['pass2'])] = tmpParamPattern;
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
    arrPatternSplat$2,
    arrPatternBeforeDefault$2,
    arrPatternStep$1,
    tmpIfTest$1,
  ) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['pass2'];
    arrPatternStep$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$2,
      arrPatternBeforeDefault$2,
      arrPatternStep$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternArrRoot$2,
    arrPatternSplat$3,
    arrPatternBeforeDefault$3,
    arrPatternStep$2,
    tmpIfTest$2,
  ) {
    arrPatternStep$2 = arrPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$3,
      arrPatternBeforeDefault$3,
      arrPatternStep$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternArrRoot$3,
    arrPatternSplat$4,
    arrPatternBeforeDefault$4,
    arrPatternStep$3,
    tmpIfTest$3,
  ) {
    let arrPatternSplat$5 = [...arrPatternStep$3];
    let arrPatternBeforeDefault$5 = arrPatternSplat$5[0];
    let x$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$5 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamPattern$4,
      bindingPatternArrRoot$4,
      arrPatternSplat$6,
      arrPatternBeforeDefault$6,
      arrPatternStep$4,
      tmpIfTest$5,
      arrPatternSplat$7,
      arrPatternBeforeDefault$7,
      x$2,
      tmpIfTest$6,
    ) {
      x$2 = $('fail');
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamPattern$4,
        bindingPatternArrRoot$4,
        arrPatternSplat$6,
        arrPatternBeforeDefault$6,
        arrPatternStep$4,
        tmpIfTest$5,
        arrPatternSplat$7,
        arrPatternBeforeDefault$7,
        x$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamPattern$5,
      bindingPatternArrRoot$5,
      arrPatternSplat$8,
      arrPatternBeforeDefault$8,
      arrPatternStep$5,
      tmpIfTest$7,
      arrPatternSplat$9,
      arrPatternBeforeDefault$9,
      x$3,
      tmpIfTest$8,
    ) {
      x$3 = arrPatternBeforeDefault$9;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamPattern$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$8,
        arrPatternBeforeDefault$8,
        arrPatternStep$5,
        tmpIfTest$7,
        arrPatternSplat$9,
        arrPatternBeforeDefault$9,
        x$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamPattern$6,
      bindingPatternArrRoot$6,
      arrPatternSplat$10,
      arrPatternBeforeDefault$10,
      arrPatternStep$6,
      tmpIfTest$9,
      arrPatternSplat$11,
      arrPatternBeforeDefault$11,
      x$4,
      tmpIfTest$10,
    ) {
      return x$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamPattern$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$4,
        arrPatternBeforeDefault$4,
        arrPatternStep$3,
        tmpIfTest$3,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        x$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamPattern$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$4,
        arrPatternBeforeDefault$4,
        arrPatternStep$3,
        tmpIfTest$3,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
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
    const arrPatternSplat$5 = [...arrPatternStep$3];
    const arrPatternBeforeDefault$5 = arrPatternSplat$5[0];
    const tmpIfTest$4 = arrPatternBeforeDefault$5 === undefined;
    if (tmpIfTest$4) {
      const SSA_x$2 = $('fail');
      return SSA_x$2;
    } else {
      return arrPatternBeforeDefault$5;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['pass2'];
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
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
