# Preval test case

# default_yes_yes_yes__arr_obj_null.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes yes  arr obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('fail') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f([{ x: null, y: 2, z: 3 }, 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x = $('fail') } = $({ x: 'fail2' })] = tmpParamBare === undefined ? $([{ x: 'fail3' }]) : tmpParamBare;
  return x;
};
$(f([{ x: null, y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpArrElement$1 = { x: 'fail3' };
    const tmpCalleeParam$1 = [tmpArrElement$1];
    bindingPatternArrRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternArrRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let bindingPatternArrRoot$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    bindingPatternArrRoot$2 = tmpParamBare$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$2, bindingPatternArrRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    let arrPatternSplat$1 = [...bindingPatternArrRoot$3];
    let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    let arrPatternStep$1 = undefined;
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$4 = $$0;
      let bindingPatternArrRoot$4 = $$1;
      let tmpIfTest$5 = $$2;
      let arrPatternSplat$2 = $$3;
      let arrPatternBeforeDefault$2 = $$4;
      let arrPatternStep$2 = $$5;
      let tmpIfTest$6 = $$6;
      debugger;
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = { x: 'fail2' };
      arrPatternStep$2 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternArrRoot$4,
        tmpIfTest$5,
        arrPatternSplat$2,
        arrPatternBeforeDefault$2,
        arrPatternStep$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$5 = $$0;
      let bindingPatternArrRoot$5 = $$1;
      let tmpIfTest$7 = $$2;
      let arrPatternSplat$3 = $$3;
      let arrPatternBeforeDefault$3 = $$4;
      let arrPatternStep$3 = $$5;
      let tmpIfTest$8 = $$6;
      debugger;
      arrPatternStep$3 = arrPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$7,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$6 = $$0;
      let bindingPatternArrRoot$6 = $$1;
      let tmpIfTest$9 = $$2;
      let arrPatternSplat$4 = $$3;
      let arrPatternBeforeDefault$4 = $$4;
      let arrPatternStep$4 = $$5;
      let tmpIfTest$10 = $$6;
      debugger;
      let objPatternBeforeDefault$2 = arrPatternStep$4.x;
      let x$2 = undefined;
      const tmpIfTest$11 = objPatternBeforeDefault$2 === undefined;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$7 = $$0;
        let bindingPatternArrRoot$7 = $$1;
        let tmpIfTest$12 = $$2;
        let arrPatternSplat$5 = $$3;
        let arrPatternBeforeDefault$5 = $$4;
        let arrPatternStep$5 = $$5;
        let tmpIfTest$13 = $$6;
        let objPatternBeforeDefault$3 = $$7;
        let x$3 = $$8;
        let tmpIfTest$14 = $$9;
        debugger;
        x$3 = $('fail');
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamBare$7,
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
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$8 = $$0;
        let bindingPatternArrRoot$8 = $$1;
        let tmpIfTest$15 = $$2;
        let arrPatternSplat$6 = $$3;
        let arrPatternBeforeDefault$6 = $$4;
        let arrPatternStep$6 = $$5;
        let tmpIfTest$16 = $$6;
        let objPatternBeforeDefault$4 = $$7;
        let x$4 = $$8;
        let tmpIfTest$17 = $$9;
        debugger;
        x$4 = objPatternBeforeDefault$4;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamBare$8,
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
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$9 = $$0;
        let bindingPatternArrRoot$9 = $$1;
        let tmpIfTest$18 = $$2;
        let arrPatternSplat$7 = $$3;
        let arrPatternBeforeDefault$7 = $$4;
        let arrPatternStep$7 = $$5;
        let tmpIfTest$19 = $$6;
        let objPatternBeforeDefault$5 = $$7;
        let x$5 = $$8;
        let tmpIfTest$20 = $$9;
        debugger;
        return x$5;
      };
      if (tmpIfTest$11) {
        const tmpReturnArg$6 = tmpBranchingA$2(
          tmpParamBare$6,
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
          tmpParamBare$6,
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
        tmpParamBare$3,
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
        tmpParamBare$3,
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
    const tmpReturnArg$10 = tmpBranchingA(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$11;
  }
};
const tmpCallCallee$4 = $;
const tmpCallCallee$5 = f;
const tmpArrElement$2 = { x: null, y: 2, z: 3 };
const tmpCalleeParam$5 = [tmpArrElement$2, 20, 30];
const tmpCalleeParam$6 = 200;
const tmpCalleeParam$4 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function ($$0) {
    const bindingPatternArrRoot$3 = $$0;
    debugger;
    const arrPatternSplat$1 = [...bindingPatternArrRoot$3];
    const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    const tmpIfTest$4 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingC$1 = function ($$0) {
      const arrPatternStep$4 = $$0;
      debugger;
      const objPatternBeforeDefault$2 = arrPatternStep$4.x;
      const tmpIfTest$11 = objPatternBeforeDefault$2 === undefined;
      if (tmpIfTest$11) {
        const SSA_x$3 = $('fail');
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
      const tmpReturnArg$9 = tmpBranchingC$1(arrPatternBeforeDefault$1);
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpArrElement$1 = { x: 'fail3' };
    const tmpCalleeParam$1 = [tmpArrElement$1];
    const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$11 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$11;
  }
};
const tmpArrElement$2 = { x: null, y: 2, z: 3 };
const tmpCalleeParam$5 = [tmpArrElement$2, 20, 30];
const tmpCalleeParam$4 = f(tmpCalleeParam$5, 200);
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
