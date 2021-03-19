# Preval test case

# default_yes_yes__arr_null.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])] = $(['fail3'])) {
  return 'bad';
}
$(f([null, 4, 5], 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [[] = $(['fail2'])] = tmpParamDefault === undefined ? $(['fail3']) : tmpParamDefault;
  return 'bad';
};
$(f([null, 4, 5], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternArrRoot$1, tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['fail3'];
    bindingPatternArrRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
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
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = ['fail2'];
      arrPatternStep$2 = tmpCallCallee$3(tmpCalleeParam$3);
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
      return 'bad';
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
const tmpCallCallee$4 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = [null, 4, 5];
const tmpCalleeParam$6 = 200;
const tmpCalleeParam$4 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$4(tmpCalleeParam$4);
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
      [...arrPatternStep$4];
      return 'bad';
    };
    if (tmpIfTest$4) {
      const tmpCalleeParam$3 = ['fail2'];
      const SSA_arrPatternStep$2 = $(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_arrPatternStep$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingC$1(arrPatternBeforeDefault$1);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['fail3'];
    const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$5 = [null, 4, 5];
const tmpCalleeParam$4 = f(tmpCalleeParam$5, 200);
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
