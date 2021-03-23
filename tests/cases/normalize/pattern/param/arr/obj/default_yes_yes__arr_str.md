# Preval test case

# default_yes_yes__arr_str.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')] = $(['fail2'])) {
  return 'ok';
}
$(f(['abc', 20, 30], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{} = $('fail')] = tmpParamBare === undefined ? $(['fail2']) : tmpParamBare;
  return 'ok';
};
$(f(['abc', 20, 30], 200));
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
    const tmpCalleeParam$1 = ['fail2'];
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
      arrPatternStep$2 = $('fail');
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
      let objPatternCrashTest$2 = arrPatternStep$4 === undefined;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$7 = $$0;
        let bindingPatternArrRoot$7 = $$1;
        let tmpIfTest$11 = $$2;
        let arrPatternSplat$5 = $$3;
        let arrPatternBeforeDefault$5 = $$4;
        let arrPatternStep$5 = $$5;
        let tmpIfTest$12 = $$6;
        let objPatternCrashTest$3 = $$7;
        debugger;
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamBare$7,
          bindingPatternArrRoot$7,
          tmpIfTest$11,
          arrPatternSplat$5,
          arrPatternBeforeDefault$5,
          arrPatternStep$5,
          tmpIfTest$12,
          objPatternCrashTest$3,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$8 = $$0;
        let bindingPatternArrRoot$8 = $$1;
        let tmpIfTest$13 = $$2;
        let arrPatternSplat$6 = $$3;
        let arrPatternBeforeDefault$6 = $$4;
        let arrPatternStep$6 = $$5;
        let tmpIfTest$14 = $$6;
        let objPatternCrashTest$4 = $$7;
        debugger;
        objPatternCrashTest$4 = arrPatternStep$6 === null;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamBare$8,
          bindingPatternArrRoot$8,
          tmpIfTest$13,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$6,
          tmpIfTest$14,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$9 = $$0;
        let bindingPatternArrRoot$9 = $$1;
        let tmpIfTest$15 = $$2;
        let arrPatternSplat$7 = $$3;
        let arrPatternBeforeDefault$7 = $$4;
        let arrPatternStep$7 = $$5;
        let tmpIfTest$16 = $$6;
        let objPatternCrashTest$5 = $$7;
        debugger;
        const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let tmpParamBare$10 = $$0;
          let bindingPatternArrRoot$10 = $$1;
          let tmpIfTest$17 = $$2;
          let arrPatternSplat$8 = $$3;
          let arrPatternBeforeDefault$8 = $$4;
          let arrPatternStep$8 = $$5;
          let tmpIfTest$18 = $$6;
          let objPatternCrashTest$6 = $$7;
          debugger;
          objPatternCrashTest$6 = arrPatternStep$8.cannotDestructureThis;
          const tmpReturnArg$6 = tmpBranchingC$3(
            tmpParamBare$10,
            bindingPatternArrRoot$10,
            tmpIfTest$17,
            arrPatternSplat$8,
            arrPatternBeforeDefault$8,
            arrPatternStep$8,
            tmpIfTest$18,
            objPatternCrashTest$6,
          );
          return tmpReturnArg$6;
        };
        const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let tmpParamBare$11 = $$0;
          let bindingPatternArrRoot$11 = $$1;
          let tmpIfTest$19 = $$2;
          let arrPatternSplat$9 = $$3;
          let arrPatternBeforeDefault$9 = $$4;
          let arrPatternStep$9 = $$5;
          let tmpIfTest$20 = $$6;
          let objPatternCrashTest$7 = $$7;
          debugger;
          const tmpReturnArg$7 = tmpBranchingC$3(
            tmpParamBare$11,
            bindingPatternArrRoot$11,
            tmpIfTest$19,
            arrPatternSplat$9,
            arrPatternBeforeDefault$9,
            arrPatternStep$9,
            tmpIfTest$20,
            objPatternCrashTest$7,
          );
          return tmpReturnArg$7;
        };
        const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let tmpParamBare$12 = $$0;
          let bindingPatternArrRoot$12 = $$1;
          let tmpIfTest$21 = $$2;
          let arrPatternSplat$10 = $$3;
          let arrPatternBeforeDefault$10 = $$4;
          let arrPatternStep$10 = $$5;
          let tmpIfTest$22 = $$6;
          let objPatternCrashTest$8 = $$7;
          debugger;
          return 'ok';
        };
        if (objPatternCrashTest$5) {
          const tmpReturnArg$8 = tmpBranchingA$3(
            tmpParamBare$9,
            bindingPatternArrRoot$9,
            tmpIfTest$15,
            arrPatternSplat$7,
            arrPatternBeforeDefault$7,
            arrPatternStep$7,
            tmpIfTest$16,
            objPatternCrashTest$5,
          );
          return tmpReturnArg$8;
        } else {
          const tmpReturnArg$9 = tmpBranchingB$3(
            tmpParamBare$9,
            bindingPatternArrRoot$9,
            tmpIfTest$15,
            arrPatternSplat$7,
            arrPatternBeforeDefault$7,
            arrPatternStep$7,
            tmpIfTest$16,
            objPatternCrashTest$5,
          );
          return tmpReturnArg$9;
        }
      };
      if (objPatternCrashTest$2) {
        const tmpReturnArg$10 = tmpBranchingA$2(
          tmpParamBare$6,
          bindingPatternArrRoot$6,
          tmpIfTest$9,
          arrPatternSplat$4,
          arrPatternBeforeDefault$4,
          arrPatternStep$4,
          tmpIfTest$10,
          objPatternCrashTest$2,
        );
        return tmpReturnArg$10;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$2(
          tmpParamBare$6,
          bindingPatternArrRoot$6,
          tmpIfTest$9,
          arrPatternSplat$4,
          arrPatternBeforeDefault$4,
          arrPatternStep$4,
          tmpIfTest$10,
          objPatternCrashTest$2,
        );
        return tmpReturnArg$11;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$12 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$12;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        tmpIfTest$3,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$14 = tmpBranchingA(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$14;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$15;
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = ['abc', 20, 30];
const tmpCalleeParam$4 = 200;
const tmpCalleeParam$2 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee$2(tmpCalleeParam$2);
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
      const objPatternCrashTest$2 = arrPatternStep$4 === undefined;
      const tmpBranchingC$2 = function ($$0, $$1) {
        const arrPatternStep$7 = $$0;
        const objPatternCrashTest$5 = $$1;
        debugger;
        if (objPatternCrashTest$5) {
          arrPatternStep$7.cannotDestructureThis;
          return 'ok';
        } else {
          return 'ok';
        }
      };
      if (objPatternCrashTest$2) {
        const tmpReturnArg$10 = tmpBranchingC$2(arrPatternStep$4, objPatternCrashTest$2);
        return tmpReturnArg$10;
      } else {
        const SSA_objPatternCrashTest$4 = arrPatternStep$4 === null;
        const tmpReturnArg$5 = tmpBranchingC$2(arrPatternStep$4, SSA_objPatternCrashTest$4);
        return tmpReturnArg$5;
      }
    };
    if (tmpIfTest$4) {
      const SSA_arrPatternStep$2 = $('fail');
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_arrPatternStep$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$13 = tmpBranchingC$1(arrPatternBeforeDefault$1);
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['fail2'];
    const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$15 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$15;
  }
};
const tmpCalleeParam$3 = ['abc', 20, 30];
const tmpCalleeParam$2 = f(tmpCalleeParam$3);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
