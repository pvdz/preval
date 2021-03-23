# Preval test case

# default_yes_no__str.md

> Normalize > Pattern > Param > Arr > Obj > Default yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('pass')]) {
  return 'ok';
}
$(f('abc', 100));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{} = $('pass')] = tmpParamBare;
  return 'ok';
};
$(f('abc', 100));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let arrPatternSplat$1 = $$2;
    let arrPatternBeforeDefault$1 = $$3;
    let arrPatternStep$1 = $$4;
    let tmpIfTest$1 = $$5;
    debugger;
    arrPatternStep$1 = $('pass');
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$1,
      arrPatternBeforeDefault$1,
      arrPatternStep$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$2 = $$0;
    let bindingPatternArrRoot$2 = $$1;
    let arrPatternSplat$2 = $$2;
    let arrPatternBeforeDefault$2 = $$3;
    let arrPatternStep$2 = $$4;
    let tmpIfTest$2 = $$5;
    debugger;
    arrPatternStep$2 = arrPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$2,
      arrPatternBeforeDefault$2,
      arrPatternStep$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$3 = $$2;
    let arrPatternBeforeDefault$3 = $$3;
    let arrPatternStep$3 = $$4;
    let tmpIfTest$3 = $$5;
    debugger;
    let objPatternCrashTest$1 = arrPatternStep$3 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$4 = $$0;
      let bindingPatternArrRoot$4 = $$1;
      let arrPatternSplat$4 = $$2;
      let arrPatternBeforeDefault$4 = $$3;
      let arrPatternStep$4 = $$4;
      let tmpIfTest$4 = $$5;
      let objPatternCrashTest$2 = $$6;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternArrRoot$4,
        arrPatternSplat$4,
        arrPatternBeforeDefault$4,
        arrPatternStep$4,
        tmpIfTest$4,
        objPatternCrashTest$2,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$5 = $$0;
      let bindingPatternArrRoot$5 = $$1;
      let arrPatternSplat$5 = $$2;
      let arrPatternBeforeDefault$5 = $$3;
      let arrPatternStep$5 = $$4;
      let tmpIfTest$5 = $$5;
      let objPatternCrashTest$3 = $$6;
      debugger;
      objPatternCrashTest$3 = arrPatternStep$5 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$5,
        tmpIfTest$5,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$6 = $$0;
      let bindingPatternArrRoot$6 = $$1;
      let arrPatternSplat$6 = $$2;
      let arrPatternBeforeDefault$6 = $$3;
      let arrPatternStep$6 = $$4;
      let tmpIfTest$6 = $$5;
      let objPatternCrashTest$4 = $$6;
      debugger;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$7 = $$0;
        let bindingPatternArrRoot$7 = $$1;
        let arrPatternSplat$7 = $$2;
        let arrPatternBeforeDefault$7 = $$3;
        let arrPatternStep$7 = $$4;
        let tmpIfTest$7 = $$5;
        let objPatternCrashTest$5 = $$6;
        debugger;
        objPatternCrashTest$5 = arrPatternStep$7.cannotDestructureThis;
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamBare$7,
          bindingPatternArrRoot$7,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          arrPatternStep$7,
          tmpIfTest$7,
          objPatternCrashTest$5,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$8 = $$0;
        let bindingPatternArrRoot$8 = $$1;
        let arrPatternSplat$8 = $$2;
        let arrPatternBeforeDefault$8 = $$3;
        let arrPatternStep$8 = $$4;
        let tmpIfTest$8 = $$5;
        let objPatternCrashTest$6 = $$6;
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamBare$8,
          bindingPatternArrRoot$8,
          arrPatternSplat$8,
          arrPatternBeforeDefault$8,
          arrPatternStep$8,
          tmpIfTest$8,
          objPatternCrashTest$6,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$9 = $$0;
        let bindingPatternArrRoot$9 = $$1;
        let arrPatternSplat$9 = $$2;
        let arrPatternBeforeDefault$9 = $$3;
        let arrPatternStep$9 = $$4;
        let tmpIfTest$9 = $$5;
        let objPatternCrashTest$7 = $$6;
        debugger;
        return 'ok';
      };
      if (objPatternCrashTest$4) {
        const tmpReturnArg$6 = tmpBranchingA$2(
          tmpParamBare$6,
          bindingPatternArrRoot$6,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$6,
          tmpIfTest$6,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(
          tmpParamBare$6,
          bindingPatternArrRoot$6,
          arrPatternSplat$6,
          arrPatternBeforeDefault$6,
          arrPatternStep$6,
          tmpIfTest$6,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$7;
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$8 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$3,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        arrPatternStep$3,
        tmpIfTest$3,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$11;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('abc', 100);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const arrPatternSplat = ['a', 'b', 'c'];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingC = function ($$0) {
    const arrPatternStep$3 = $$0;
    debugger;
    const objPatternCrashTest$1 = arrPatternStep$3 === undefined;
    const tmpBranchingC$1 = function ($$0, $$1) {
      const arrPatternStep$6 = $$0;
      const objPatternCrashTest$4 = $$1;
      debugger;
      if (objPatternCrashTest$4) {
        arrPatternStep$6.cannotDestructureThis;
        return 'ok';
      } else {
        return 'ok';
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$8 = tmpBranchingC$1(arrPatternStep$3, objPatternCrashTest$1);
      return tmpReturnArg$8;
    } else {
      const SSA_objPatternCrashTest$3 = arrPatternStep$3 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(arrPatternStep$3, SSA_objPatternCrashTest$3);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const SSA_arrPatternStep$1 = $('pass');
    const tmpReturnArg = tmpBranchingC(SSA_arrPatternStep$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$11 = tmpBranchingC(arrPatternBeforeDefault);
    return tmpReturnArg$11;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
