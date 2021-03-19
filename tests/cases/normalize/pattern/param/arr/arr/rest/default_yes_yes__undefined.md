# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x] = $('fail')] = $('pass2')) {
  return x;
}
$(f(undefined, 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [[...x] = $('fail')] = tmpParamDefault === undefined ? $('pass2') : tmpParamDefault;
  return x;
};
$(f(undefined, 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternArrRoot$1, tmpIfTest$1) {
    bindingPatternArrRoot$1 = $('pass2');
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, bindingPatternArrRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, bindingPatternArrRoot$2, tmpIfTest$2) {
    bindingPatternArrRoot$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, bindingPatternArrRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, bindingPatternArrRoot$3, tmpIfTest$3) {
    let arrPatternSplat$2 = [...bindingPatternArrRoot$3];
    let arrPatternBeforeDefault$1 = arrPatternSplat$2[0];
    let arrPatternStep$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamDefault$4,
      bindingPatternArrRoot$4,
      tmpIfTest$5,
      arrPatternSplat$4,
      arrPatternBeforeDefault$2,
      arrPatternStep$2,
      tmpIfTest$6,
    ) {
      arrPatternStep$2 = $('fail');
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamDefault$4,
        bindingPatternArrRoot$4,
        tmpIfTest$5,
        arrPatternSplat$4,
        arrPatternBeforeDefault$2,
        arrPatternStep$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamDefault$5,
      bindingPatternArrRoot$5,
      tmpIfTest$7,
      arrPatternSplat$5,
      arrPatternBeforeDefault$3,
      arrPatternStep$3,
      tmpIfTest$8,
    ) {
      arrPatternStep$3 = arrPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamDefault$5,
        bindingPatternArrRoot$5,
        tmpIfTest$7,
        arrPatternSplat$5,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamDefault$6,
      bindingPatternArrRoot$6,
      tmpIfTest$9,
      arrPatternSplat$6,
      arrPatternBeforeDefault$4,
      arrPatternStep$4,
      tmpIfTest$10,
    ) {
      let arrPatternSplat$7 = [...arrPatternStep$4];
      let x$2 = arrPatternSplat$7.slice(0);
      return x$2;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamDefault$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$2,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamDefault$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$2,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamDefault, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamDefault, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(undefined, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternArrRoot$3) {
    const arrPatternSplat$2 = [...bindingPatternArrRoot$3];
    const arrPatternBeforeDefault$1 = arrPatternSplat$2[0];
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingC$1 = function (arrPatternStep$4) {
      const arrPatternSplat$7 = [...arrPatternStep$4];
      const x$2 = arrPatternSplat$7.slice(0);
      return x$2;
    };
    if (tmpIfTest$4) {
      const SSA_arrPatternStep$2 = $('fail');
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_arrPatternStep$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingC$1(arrPatternBeforeDefault$1);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const SSA_bindingPatternArrRoot$1 = $('pass2');
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f(undefined, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass2'
 - 2: ['p']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
