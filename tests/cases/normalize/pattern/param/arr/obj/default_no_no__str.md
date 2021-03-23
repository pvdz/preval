# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Arr > Obj > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{}]) {
  return 'bad';
}
$(f('abc', 100));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{}] = tmpParamBare;
  return 'bad';
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
  let arrPatternStep = arrPatternSplat[0];
  let objPatternCrashTest = arrPatternStep === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let arrPatternSplat$1 = $$2;
    let arrPatternStep$1 = $$3;
    let objPatternCrashTest$1 = $$4;
    debugger;
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternArrRoot$1, arrPatternSplat$1, arrPatternStep$1, objPatternCrashTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$2 = $$0;
    let bindingPatternArrRoot$2 = $$1;
    let arrPatternSplat$2 = $$2;
    let arrPatternStep$2 = $$3;
    let objPatternCrashTest$2 = $$4;
    debugger;
    objPatternCrashTest$2 = arrPatternStep$2 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$2,
      arrPatternStep$2,
      objPatternCrashTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$3 = $$2;
    let arrPatternStep$3 = $$3;
    let objPatternCrashTest$3 = $$4;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$4 = $$0;
      let bindingPatternArrRoot$4 = $$1;
      let arrPatternSplat$4 = $$2;
      let arrPatternStep$4 = $$3;
      let objPatternCrashTest$4 = $$4;
      debugger;
      objPatternCrashTest$4 = arrPatternStep$4.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternArrRoot$4,
        arrPatternSplat$4,
        arrPatternStep$4,
        objPatternCrashTest$4,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$5 = $$0;
      let bindingPatternArrRoot$5 = $$1;
      let arrPatternSplat$5 = $$2;
      let arrPatternStep$5 = $$3;
      let objPatternCrashTest$5 = $$4;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$5,
        arrPatternStep$5,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$6 = $$0;
      let bindingPatternArrRoot$6 = $$1;
      let arrPatternSplat$6 = $$2;
      let arrPatternStep$6 = $$3;
      let objPatternCrashTest$6 = $$4;
      debugger;
      return 'bad';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternStep$3,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$3,
        arrPatternStep$3,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$5;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamBare, bindingPatternArrRoot, arrPatternSplat, arrPatternStep, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamBare, bindingPatternArrRoot, arrPatternSplat, arrPatternStep, objPatternCrashTest);
    return tmpReturnArg$7;
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
  const arrPatternStep = arrPatternSplat[0];
  const objPatternCrashTest = arrPatternStep === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const arrPatternStep$3 = $$0;
    const objPatternCrashTest$3 = $$1;
    debugger;
    if (objPatternCrashTest$3) {
      arrPatternStep$3.cannotDestructureThis;
      return 'bad';
    } else {
      return 'bad';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(arrPatternStep, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = arrPatternStep === null;
    const tmpReturnArg$1 = tmpBranchingC(arrPatternStep, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
