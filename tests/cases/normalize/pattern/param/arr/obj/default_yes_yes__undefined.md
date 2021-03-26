# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')] = $(['fail2'])) {
  return 'bad';
}
$(f(1, 2, 3, 100));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{} = $('fail')] = tmpParamBare === undefined ? $(['fail2']) : tmpParamBare;
  return 'bad';
};
$(f(1, 2, 3, 100));
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
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    bindingPatternArrRoot$3 = tmpParamBare$3;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$3, bindingPatternArrRoot$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    let arrPatternSplat$1 = [...bindingPatternArrRoot$5];
    let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    let arrPatternStep$1 = undefined;
    const tmpIfTest$7 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$7 = $$0;
      let bindingPatternArrRoot$7 = $$1;
      let tmpIfTest$9 = $$2;
      let arrPatternSplat$3 = $$3;
      let arrPatternBeforeDefault$3 = $$4;
      let arrPatternStep$3 = $$5;
      let tmpIfTest$11 = $$6;
      debugger;
      arrPatternStep$3 = $('fail');
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternArrRoot$7,
        tmpIfTest$9,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$11,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$9 = $$0;
      let bindingPatternArrRoot$9 = $$1;
      let tmpIfTest$13 = $$2;
      let arrPatternSplat$5 = $$3;
      let arrPatternBeforeDefault$5 = $$4;
      let arrPatternStep$5 = $$5;
      let tmpIfTest$15 = $$6;
      debugger;
      arrPatternStep$5 = arrPatternBeforeDefault$5;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternArrRoot$9,
        tmpIfTest$13,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$5,
        tmpIfTest$15,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$11 = $$0;
      let bindingPatternArrRoot$11 = $$1;
      let tmpIfTest$17 = $$2;
      let arrPatternSplat$7 = $$3;
      let arrPatternBeforeDefault$7 = $$4;
      let arrPatternStep$7 = $$5;
      let tmpIfTest$19 = $$6;
      debugger;
      let objPatternCrashTest$3 = arrPatternStep$7 === undefined;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$13 = $$0;
        let bindingPatternArrRoot$13 = $$1;
        let tmpIfTest$21 = $$2;
        let arrPatternSplat$9 = $$3;
        let arrPatternBeforeDefault$9 = $$4;
        let arrPatternStep$9 = $$5;
        let tmpIfTest$23 = $$6;
        let objPatternCrashTest$5 = $$7;
        debugger;
        const tmpReturnArg$7 = tmpBranchingC$3(
          tmpParamBare$13,
          bindingPatternArrRoot$13,
          tmpIfTest$21,
          arrPatternSplat$9,
          arrPatternBeforeDefault$9,
          arrPatternStep$9,
          tmpIfTest$23,
          objPatternCrashTest$5,
        );
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$15 = $$0;
        let bindingPatternArrRoot$15 = $$1;
        let tmpIfTest$25 = $$2;
        let arrPatternSplat$11 = $$3;
        let arrPatternBeforeDefault$11 = $$4;
        let arrPatternStep$11 = $$5;
        let tmpIfTest$27 = $$6;
        let objPatternCrashTest$7 = $$7;
        debugger;
        objPatternCrashTest$7 = arrPatternStep$11 === null;
        const tmpReturnArg$9 = tmpBranchingC$3(
          tmpParamBare$15,
          bindingPatternArrRoot$15,
          tmpIfTest$25,
          arrPatternSplat$11,
          arrPatternBeforeDefault$11,
          arrPatternStep$11,
          tmpIfTest$27,
          objPatternCrashTest$7,
        );
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$17 = $$0;
        let bindingPatternArrRoot$17 = $$1;
        let tmpIfTest$29 = $$2;
        let arrPatternSplat$13 = $$3;
        let arrPatternBeforeDefault$13 = $$4;
        let arrPatternStep$13 = $$5;
        let tmpIfTest$31 = $$6;
        let objPatternCrashTest$9 = $$7;
        debugger;
        const tmpBranchingA$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let tmpParamBare$19 = $$0;
          let bindingPatternArrRoot$19 = $$1;
          let tmpIfTest$33 = $$2;
          let arrPatternSplat$15 = $$3;
          let arrPatternBeforeDefault$15 = $$4;
          let arrPatternStep$15 = $$5;
          let tmpIfTest$35 = $$6;
          let objPatternCrashTest$11 = $$7;
          debugger;
          objPatternCrashTest$11 = arrPatternStep$15.cannotDestructureThis;
          const tmpReturnArg$11 = tmpBranchingC$5(
            tmpParamBare$19,
            bindingPatternArrRoot$19,
            tmpIfTest$33,
            arrPatternSplat$15,
            arrPatternBeforeDefault$15,
            arrPatternStep$15,
            tmpIfTest$35,
            objPatternCrashTest$11,
          );
          return tmpReturnArg$11;
        };
        const tmpBranchingB$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let tmpParamBare$21 = $$0;
          let bindingPatternArrRoot$21 = $$1;
          let tmpIfTest$37 = $$2;
          let arrPatternSplat$17 = $$3;
          let arrPatternBeforeDefault$17 = $$4;
          let arrPatternStep$17 = $$5;
          let tmpIfTest$39 = $$6;
          let objPatternCrashTest$13 = $$7;
          debugger;
          const tmpReturnArg$13 = tmpBranchingC$5(
            tmpParamBare$21,
            bindingPatternArrRoot$21,
            tmpIfTest$37,
            arrPatternSplat$17,
            arrPatternBeforeDefault$17,
            arrPatternStep$17,
            tmpIfTest$39,
            objPatternCrashTest$13,
          );
          return tmpReturnArg$13;
        };
        const tmpBranchingC$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
          let tmpParamBare$23 = $$0;
          let bindingPatternArrRoot$23 = $$1;
          let tmpIfTest$41 = $$2;
          let arrPatternSplat$19 = $$3;
          let arrPatternBeforeDefault$19 = $$4;
          let arrPatternStep$19 = $$5;
          let tmpIfTest$43 = $$6;
          let objPatternCrashTest$15 = $$7;
          debugger;
          return 'bad';
        };
        if (objPatternCrashTest$9) {
          const tmpReturnArg$15 = tmpBranchingA$5(
            tmpParamBare$17,
            bindingPatternArrRoot$17,
            tmpIfTest$29,
            arrPatternSplat$13,
            arrPatternBeforeDefault$13,
            arrPatternStep$13,
            tmpIfTest$31,
            objPatternCrashTest$9,
          );
          return tmpReturnArg$15;
        } else {
          const tmpReturnArg$17 = tmpBranchingB$5(
            tmpParamBare$17,
            bindingPatternArrRoot$17,
            tmpIfTest$29,
            arrPatternSplat$13,
            arrPatternBeforeDefault$13,
            arrPatternStep$13,
            tmpIfTest$31,
            objPatternCrashTest$9,
          );
          return tmpReturnArg$17;
        }
      };
      if (objPatternCrashTest$3) {
        const tmpReturnArg$19 = tmpBranchingA$3(
          tmpParamBare$11,
          bindingPatternArrRoot$11,
          tmpIfTest$17,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          arrPatternStep$7,
          tmpIfTest$19,
          objPatternCrashTest$3,
        );
        return tmpReturnArg$19;
      } else {
        const tmpReturnArg$21 = tmpBranchingB$3(
          tmpParamBare$11,
          bindingPatternArrRoot$11,
          tmpIfTest$17,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          arrPatternStep$7,
          tmpIfTest$19,
          objPatternCrashTest$3,
        );
        return tmpReturnArg$21;
      }
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$23 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$5,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        tmpIfTest$5,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        arrPatternStep$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$25;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$27 = tmpBranchingA(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$29 = tmpBranchingB(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$29;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(1, 2, 3, 100);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const arrPatternSplat$1 = [...1];
  const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  const tmpIfTest$7 = arrPatternBeforeDefault$1 === undefined;
  const tmpBranchingC$1 = function ($$0) {
    const arrPatternStep$7 = $$0;
    debugger;
    const objPatternCrashTest$3 = arrPatternStep$7 === undefined;
    const tmpBranchingC$3 = function ($$0, $$1) {
      const arrPatternStep$13 = $$0;
      const objPatternCrashTest$9 = $$1;
      debugger;
      if (objPatternCrashTest$9) {
        arrPatternStep$13.cannotDestructureThis;
        return 'bad';
      } else {
        return 'bad';
      }
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$19 = tmpBranchingC$3(arrPatternStep$7, objPatternCrashTest$3);
      return tmpReturnArg$19;
    } else {
      const SSA_objPatternCrashTest$7 = arrPatternStep$7 === null;
      const tmpReturnArg$9 = tmpBranchingC$3(arrPatternStep$7, SSA_objPatternCrashTest$7);
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest$7) {
    const SSA_arrPatternStep$1 = $('fail');
    const tmpReturnArg$1 = tmpBranchingC$1(SSA_arrPatternStep$1);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$6 = tmpBranchingC$1(arrPatternBeforeDefault$1);
    return tmpReturnArg$6;
  }
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
