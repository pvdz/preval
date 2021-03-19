# Preval test case

# default_yes_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])] = $(['pass3'])) {
  return x;
}
$(f(undefined, 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [[x = $('fail')] = $(['fail2'])] = tmpParamDefault === undefined ? $(['pass3']) : tmpParamDefault;
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
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['pass3'];
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
    let arrPatternBeforeDefault$2 = arrPatternSplat$2[0];
    let arrPatternStep$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$2 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamDefault$4,
      bindingPatternArrRoot$4,
      tmpIfTest$5,
      arrPatternSplat$4,
      arrPatternBeforeDefault$4,
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
        arrPatternBeforeDefault$4,
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
      arrPatternBeforeDefault$5,
      arrPatternStep$3,
      tmpIfTest$8,
    ) {
      arrPatternStep$3 = arrPatternBeforeDefault$5;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamDefault$5,
        bindingPatternArrRoot$5,
        tmpIfTest$7,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
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
      arrPatternBeforeDefault$6,
      arrPatternStep$4,
      tmpIfTest$10,
    ) {
      let arrPatternSplat$7 = [...arrPatternStep$4];
      let arrPatternBeforeDefault$7 = arrPatternSplat$7[0];
      let x$2 = undefined;
      const tmpIfTest$11 = arrPatternBeforeDefault$7 === undefined;
      const tmpBranchingA$2 = function (
        tmpParamDefault$7,
        bindingPatternArrRoot$7,
        tmpIfTest$12,
        arrPatternSplat$8,
        arrPatternBeforeDefault$8,
        arrPatternStep$5,
        tmpIfTest$13,
        arrPatternSplat$9,
        arrPatternBeforeDefault$9,
        x$3,
        tmpIfTest$14,
      ) {
        x$3 = $('fail');
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamDefault$7,
          bindingPatternArrRoot$7,
          tmpIfTest$12,
          arrPatternSplat$8,
          arrPatternBeforeDefault$8,
          arrPatternStep$5,
          tmpIfTest$13,
          arrPatternSplat$9,
          arrPatternBeforeDefault$9,
          x$3,
          tmpIfTest$14,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function (
        tmpParamDefault$8,
        bindingPatternArrRoot$8,
        tmpIfTest$15,
        arrPatternSplat$10,
        arrPatternBeforeDefault$10,
        arrPatternStep$6,
        tmpIfTest$16,
        arrPatternSplat$11,
        arrPatternBeforeDefault$11,
        x$4,
        tmpIfTest$17,
      ) {
        x$4 = arrPatternBeforeDefault$11;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamDefault$8,
          bindingPatternArrRoot$8,
          tmpIfTest$15,
          arrPatternSplat$10,
          arrPatternBeforeDefault$10,
          arrPatternStep$6,
          tmpIfTest$16,
          arrPatternSplat$11,
          arrPatternBeforeDefault$11,
          x$4,
          tmpIfTest$17,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function (
        tmpParamDefault$9,
        bindingPatternArrRoot$9,
        tmpIfTest$18,
        arrPatternSplat$12,
        arrPatternBeforeDefault$12,
        arrPatternStep$7,
        tmpIfTest$19,
        arrPatternSplat$13,
        arrPatternBeforeDefault$13,
        x$5,
        tmpIfTest$20,
      ) {
        return x$5;
      };
      if (tmpIfTest$11) {
        const tmpReturnArg$6 = tmpBranchingA$2(
          tmpParamDefault$6,
          bindingPatternArrRoot$6,
          tmpIfTest$9,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$4,
          tmpIfTest$10,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          x$2,
          tmpIfTest$11,
        );
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(
          tmpParamDefault$6,
          bindingPatternArrRoot$6,
          tmpIfTest$9,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$4,
          tmpIfTest$10,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          x$2,
          tmpIfTest$11,
        );
        return tmpReturnArg$7;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$8 = tmpBranchingA$1(
        tmpParamDefault$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$2,
        arrPatternBeforeDefault$2,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamDefault$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$2,
        arrPatternBeforeDefault$2,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamDefault, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamDefault, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$11;
  }
};
const tmpCallCallee$4 = $;
const tmpCalleeParam$4 = f(undefined, 200);
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternArrRoot$3) {
    const arrPatternSplat$2 = [...bindingPatternArrRoot$3];
    const arrPatternBeforeDefault$2 = arrPatternSplat$2[0];
    const tmpIfTest$4 = arrPatternBeforeDefault$2 === undefined;
    const tmpBranchingC$1 = function (arrPatternStep$4) {
      const arrPatternSplat$7 = [...arrPatternStep$4];
      const arrPatternBeforeDefault$7 = arrPatternSplat$7[0];
      const tmpIfTest$11 = arrPatternBeforeDefault$7 === undefined;
      if (tmpIfTest$11) {
        const SSA_x$3 = $('fail');
        return SSA_x$3;
      } else {
        return arrPatternBeforeDefault$7;
      }
    };
    if (tmpIfTest$4) {
      const tmpCalleeParam$3 = ['fail2'];
      const SSA_arrPatternStep$2 = $(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_arrPatternStep$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingC$1(arrPatternBeforeDefault$2);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['pass3'];
    const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$4 = f(undefined, 200);
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass3']
 - 2: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
