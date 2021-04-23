# Preval test case

# default_yes_yes_yes__arr_obj_undefined.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  arr obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f([{ x: undefined, y: 2, z: 3 }, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x = $('pass') } = $({ x: 'fail2' })] = tmpParamBare === undefined ? $([{ x: 'fail3' }]) : tmpParamBare;
  return x;
};
$(f([{ x: undefined, y: 2, z: 3 }, 20, 30], 200));
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
    const tmpArrElement$1 = { x: 'fail3' };
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
      const tmpCalleeParam$5 = { x: 'fail2' };
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
      objPatternBeforeDefault = arrPatternStep.x;
      const tmpIfTest$3 = objPatternBeforeDefault === undefined;
      const tmpBranchingA$3 = function () {
        debugger;
        x = $('pass');
        const tmpReturnArg$7 = tmpBranchingC$3();
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        x = objPatternBeforeDefault;
        const tmpReturnArg$9 = tmpBranchingC$3();
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        return x;
      };
      if (tmpIfTest$3) {
        const tmpReturnArg$11 = tmpBranchingA$3();
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3();
        return tmpReturnArg$13;
      }
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$15 = tmpBranchingA$1();
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1();
      return tmpReturnArg$17;
    }
  };
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let objPatternBeforeDefault = undefined;
  let x = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA();
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB();
    return tmpReturnArg$21;
  }
};
const tmpCallCallee$7 = $;
const tmpCallCallee$9 = f;
const tmpArrElement$3 = { x: undefined, y: 2, z: 3 };
const tmpCalleeParam$9 = [tmpArrElement$3, 20, 30];
const tmpCalleeParam$11 = 200;
const tmpCalleeParam$7 = tmpCallCallee$9(tmpCalleeParam$9, tmpCalleeParam$11);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpBranchingC$1 = function () {
    debugger;
    const tmpSSA_tmpssa3_objPatternBeforeDefault = arrPatternStep.x;
    const tmpIfTest$3 = tmpSSA_tmpssa3_objPatternBeforeDefault === undefined;
    if (tmpIfTest$3) {
      const tmpSSA_tmpssa2_x = $('pass');
      return tmpSSA_tmpssa2_x;
    } else {
      return tmpSSA_tmpssa3_objPatternBeforeDefault;
    }
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
      const tmpCalleeParam$5 = { x: 'fail2' };
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
    const tmpArrElement$1 = { x: 'fail3' };
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
const tmpArrElement$3 = { x: undefined, y: 2, z: 3 };
const tmpCalleeParam$9 = [tmpArrElement$3, 20, 30];
const tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
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
