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
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$3 = $$2;
    let arrPatternBeforeDefault$3 = $$3;
    let arrPatternStep$3 = $$4;
    let tmpIfTest$3 = $$5;
    debugger;
    arrPatternStep$3 = arrPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternArrRoot$3,
      arrPatternSplat$3,
      arrPatternBeforeDefault$3,
      arrPatternStep$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let arrPatternSplat$5 = $$2;
    let arrPatternBeforeDefault$5 = $$3;
    let arrPatternStep$5 = $$4;
    let tmpIfTest$5 = $$5;
    debugger;
    let objPatternCrashTest$1 = arrPatternStep$5 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$7 = $$0;
      let bindingPatternArrRoot$7 = $$1;
      let arrPatternSplat$7 = $$2;
      let arrPatternBeforeDefault$7 = $$3;
      let arrPatternStep$7 = $$4;
      let tmpIfTest$7 = $$5;
      let objPatternCrashTest$3 = $$6;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternArrRoot$7,
        arrPatternSplat$7,
        arrPatternBeforeDefault$7,
        arrPatternStep$7,
        tmpIfTest$7,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$9 = $$0;
      let bindingPatternArrRoot$9 = $$1;
      let arrPatternSplat$9 = $$2;
      let arrPatternBeforeDefault$9 = $$3;
      let arrPatternStep$9 = $$4;
      let tmpIfTest$9 = $$5;
      let objPatternCrashTest$5 = $$6;
      debugger;
      objPatternCrashTest$5 = arrPatternStep$9 === null;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternArrRoot$9,
        arrPatternSplat$9,
        arrPatternBeforeDefault$9,
        arrPatternStep$9,
        tmpIfTest$9,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$11 = $$0;
      let bindingPatternArrRoot$11 = $$1;
      let arrPatternSplat$11 = $$2;
      let arrPatternBeforeDefault$11 = $$3;
      let arrPatternStep$11 = $$4;
      let tmpIfTest$11 = $$5;
      let objPatternCrashTest$7 = $$6;
      debugger;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$13 = $$0;
        let bindingPatternArrRoot$13 = $$1;
        let arrPatternSplat$13 = $$2;
        let arrPatternBeforeDefault$13 = $$3;
        let arrPatternStep$13 = $$4;
        let tmpIfTest$13 = $$5;
        let objPatternCrashTest$9 = $$6;
        debugger;
        objPatternCrashTest$9 = arrPatternStep$13.cannotDestructureThis;
        const tmpReturnArg$7 = tmpBranchingC$3(
          tmpParamBare$13,
          bindingPatternArrRoot$13,
          arrPatternSplat$13,
          arrPatternBeforeDefault$13,
          arrPatternStep$13,
          tmpIfTest$13,
          objPatternCrashTest$9,
        );
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$15 = $$0;
        let bindingPatternArrRoot$15 = $$1;
        let arrPatternSplat$15 = $$2;
        let arrPatternBeforeDefault$15 = $$3;
        let arrPatternStep$15 = $$4;
        let tmpIfTest$15 = $$5;
        let objPatternCrashTest$11 = $$6;
        debugger;
        const tmpReturnArg$9 = tmpBranchingC$3(
          tmpParamBare$15,
          bindingPatternArrRoot$15,
          arrPatternSplat$15,
          arrPatternBeforeDefault$15,
          arrPatternStep$15,
          tmpIfTest$15,
          objPatternCrashTest$11,
        );
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$17 = $$0;
        let bindingPatternArrRoot$17 = $$1;
        let arrPatternSplat$17 = $$2;
        let arrPatternBeforeDefault$17 = $$3;
        let arrPatternStep$17 = $$4;
        let tmpIfTest$17 = $$5;
        let objPatternCrashTest$13 = $$6;
        debugger;
        return 'ok';
      };
      if (objPatternCrashTest$7) {
        const tmpReturnArg$11 = tmpBranchingA$3(
          tmpParamBare$11,
          bindingPatternArrRoot$11,
          arrPatternSplat$11,
          arrPatternBeforeDefault$11,
          arrPatternStep$11,
          tmpIfTest$11,
          objPatternCrashTest$7,
        );
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3(
          tmpParamBare$11,
          bindingPatternArrRoot$11,
          arrPatternSplat$11,
          arrPatternBeforeDefault$11,
          arrPatternStep$11,
          tmpIfTest$11,
          objPatternCrashTest$7,
        );
        return tmpReturnArg$13;
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$15 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$5,
        tmpIfTest$5,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        arrPatternStep$5,
        tmpIfTest$5,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$17;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$21;
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
    const arrPatternStep$5 = $$0;
    debugger;
    const objPatternCrashTest$1 = arrPatternStep$5 === undefined;
    const tmpBranchingC$1 = function ($$0, $$1) {
      const arrPatternStep$11 = $$0;
      const objPatternCrashTest$7 = $$1;
      debugger;
      if (objPatternCrashTest$7) {
        arrPatternStep$11.cannotDestructureThis;
        return 'ok';
      } else {
        return 'ok';
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$15 = tmpBranchingC$1(arrPatternStep$5, objPatternCrashTest$1);
      return tmpReturnArg$15;
    } else {
      const SSA_objPatternCrashTest$5 = arrPatternStep$5 === null;
      const tmpReturnArg$5 = tmpBranchingC$1(arrPatternStep$5, SSA_objPatternCrashTest$5);
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const SSA_arrPatternStep$1 = $('pass');
    const tmpReturnArg = tmpBranchingC(SSA_arrPatternStep$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$21 = tmpBranchingC(arrPatternBeforeDefault);
    return tmpReturnArg$21;
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
