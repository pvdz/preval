# Preval test case

# default_yes_yes_yes__str.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f('abc'));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [{ x = $('pass') } = $({ x: 'fail2' })] = tmpParamDefault === undefined ? $([{ x: 'fail3' }]) : tmpParamDefault;
  return x;
};
$(f('abc'));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternArrRoot$1, tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpArrElement$1 = { x: 'fail3' };
    const tmpCalleeParam$1 = [tmpArrElement$1];
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
    let arrPatternSplat$1 = [...bindingPatternArrRoot$3];
    let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    let arrPatternStep$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamDefault$4,
      bindingPatternArrRoot$4,
      tmpIfTest$5,
      arrPatternSplat$2,
      arrPatternBeforeDefault$2,
      arrPatternStep$2,
      tmpIfTest$6,
    ) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = { x: 'fail2' };
      arrPatternStep$2 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamDefault$4,
        bindingPatternArrRoot$4,
        tmpIfTest$5,
        arrPatternSplat$2,
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
      arrPatternSplat$3,
      arrPatternBeforeDefault$3,
      arrPatternStep$3,
      tmpIfTest$8,
    ) {
      arrPatternStep$3 = arrPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamDefault$5,
        bindingPatternArrRoot$5,
        tmpIfTest$7,
        arrPatternSplat$3,
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
      arrPatternSplat$4,
      arrPatternBeforeDefault$4,
      arrPatternStep$4,
      tmpIfTest$10,
    ) {
      let objPatternBeforeDefault$2 = arrPatternStep$4.x;
      let x$2 = undefined;
      const tmpIfTest$11 = objPatternBeforeDefault$2 === undefined;
      const tmpBranchingA$2 = function (
        tmpParamDefault$7,
        bindingPatternArrRoot$7,
        tmpIfTest$12,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$5,
        tmpIfTest$13,
        objPatternBeforeDefault$3,
        x$3,
        tmpIfTest$14,
      ) {
        x$3 = $('pass');
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamDefault$7,
          bindingPatternArrRoot$7,
          tmpIfTest$12,
          arrPatternSplat$5,
          arrPatternBeforeDefault$5,
          arrPatternStep$5,
          tmpIfTest$13,
          objPatternBeforeDefault$3,
          x$3,
          tmpIfTest$14,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function (
        tmpParamDefault$8,
        bindingPatternArrRoot$8,
        tmpIfTest$15,
        arrPatternSplat$6,
        arrPatternBeforeDefault$6,
        arrPatternStep$6,
        tmpIfTest$16,
        objPatternBeforeDefault$4,
        x$4,
        tmpIfTest$17,
      ) {
        x$4 = objPatternBeforeDefault$4;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamDefault$8,
          bindingPatternArrRoot$8,
          tmpIfTest$15,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$6,
          tmpIfTest$16,
          objPatternBeforeDefault$4,
          x$4,
          tmpIfTest$17,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function (
        tmpParamDefault$9,
        bindingPatternArrRoot$9,
        tmpIfTest$18,
        arrPatternSplat$7,
        arrPatternBeforeDefault$7,
        arrPatternStep$7,
        tmpIfTest$19,
        objPatternBeforeDefault$5,
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
          arrPatternSplat$4,
          arrPatternBeforeDefault$4,
          arrPatternStep$4,
          tmpIfTest$10,
          objPatternBeforeDefault$2,
          x$2,
          tmpIfTest$11,
        );
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(
          tmpParamDefault$6,
          bindingPatternArrRoot$6,
          tmpIfTest$9,
          arrPatternSplat$4,
          arrPatternBeforeDefault$4,
          arrPatternStep$4,
          tmpIfTest$10,
          objPatternBeforeDefault$2,
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
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamDefault$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
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
const tmpCalleeParam$4 = f('abc');
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternArrRoot$3) {
    const arrPatternSplat$1 = [...bindingPatternArrRoot$3];
    const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingC$1 = function (arrPatternStep$4) {
      const objPatternBeforeDefault$2 = arrPatternStep$4.x;
      const tmpIfTest$11 = objPatternBeforeDefault$2 === undefined;
      if (tmpIfTest$11) {
        const SSA_x$3 = $('pass');
        return SSA_x$3;
      } else {
        return objPatternBeforeDefault$2;
      }
    };
    if (tmpIfTest$4) {
      const tmpCalleeParam$3 = { x: 'fail2' };
      const SSA_arrPatternStep$2 = $(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_arrPatternStep$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingC$1(arrPatternBeforeDefault$1);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpArrElement$1 = { x: 'fail3' };
    const tmpCalleeParam$1 = [tmpArrElement$1];
    const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$4 = f('abc');
$(tmpCalleeParam$4);
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
