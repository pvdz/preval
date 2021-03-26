# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Obj > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: [{}],
  },
]) {
  return 'ok';
}
$(f([{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10], 100));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [
    {
      x: [{}],
    },
  ] = tmpParamBare;
  return 'ok';
};
$(f([{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10], 100));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let objPatternCrashTest = arrPatternStep$1 === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let arrPatternSplat$3 = $$2;
    let arrPatternStep$3 = $$3;
    let objPatternNoDefault$1 = $$4;
    let arrPatternSplat$5 = $$5;
    let arrPatternStep$5 = $$6;
    let objPatternCrashTest$1 = $$7;
    debugger;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$3,
      arrPatternStep$3,
      objPatternNoDefault$1,
      arrPatternSplat$5,
      arrPatternStep$5,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$7 = $$2;
    let arrPatternStep$7 = $$3;
    let objPatternNoDefault$3 = $$4;
    let arrPatternSplat$9 = $$5;
    let arrPatternStep$9 = $$6;
    let objPatternCrashTest$3 = $$7;
    debugger;
    objPatternCrashTest$3 = arrPatternStep$9 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternArrRoot$3,
      arrPatternSplat$7,
      arrPatternStep$7,
      objPatternNoDefault$3,
      arrPatternSplat$9,
      arrPatternStep$9,
      objPatternCrashTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let arrPatternSplat$11 = $$2;
    let arrPatternStep$11 = $$3;
    let objPatternNoDefault$5 = $$4;
    let arrPatternSplat$13 = $$5;
    let arrPatternStep$13 = $$6;
    let objPatternCrashTest$5 = $$7;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$7 = $$0;
      let bindingPatternArrRoot$7 = $$1;
      let arrPatternSplat$15 = $$2;
      let arrPatternStep$15 = $$3;
      let objPatternNoDefault$7 = $$4;
      let arrPatternSplat$17 = $$5;
      let arrPatternStep$17 = $$6;
      let objPatternCrashTest$7 = $$7;
      debugger;
      objPatternCrashTest$7 = arrPatternStep$17.cannotDestructureThis;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternArrRoot$7,
        arrPatternSplat$15,
        arrPatternStep$15,
        objPatternNoDefault$7,
        arrPatternSplat$17,
        arrPatternStep$17,
        objPatternCrashTest$7,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$9 = $$0;
      let bindingPatternArrRoot$9 = $$1;
      let arrPatternSplat$19 = $$2;
      let arrPatternStep$19 = $$3;
      let objPatternNoDefault$9 = $$4;
      let arrPatternSplat$21 = $$5;
      let arrPatternStep$21 = $$6;
      let objPatternCrashTest$9 = $$7;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternArrRoot$9,
        arrPatternSplat$19,
        arrPatternStep$19,
        objPatternNoDefault$9,
        arrPatternSplat$21,
        arrPatternStep$21,
        objPatternCrashTest$9,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$11 = $$0;
      let bindingPatternArrRoot$11 = $$1;
      let arrPatternSplat$23 = $$2;
      let arrPatternStep$23 = $$3;
      let objPatternNoDefault$11 = $$4;
      let arrPatternSplat$25 = $$5;
      let arrPatternStep$25 = $$6;
      let objPatternCrashTest$11 = $$7;
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest$5) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$11,
        arrPatternStep$11,
        objPatternNoDefault$5,
        arrPatternSplat$13,
        arrPatternStep$13,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$11,
        arrPatternStep$11,
        objPatternNoDefault$5,
        arrPatternSplat$13,
        arrPatternStep$13,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$9;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingA(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      objPatternNoDefault,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternCrashTest,
    );
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      objPatternNoDefault,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternCrashTest,
    );
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement$1, 12];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 10];
const tmpCalleeParam$3 = 100;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const arrPatternSplat = [...tmpParamBare];
  const arrPatternStep = arrPatternSplat[0];
  const objPatternNoDefault = arrPatternStep.x;
  const arrPatternSplat$1 = [...objPatternNoDefault];
  const arrPatternStep$1 = arrPatternSplat$1[0];
  const objPatternCrashTest = arrPatternStep$1 === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const arrPatternStep$13 = $$0;
    const objPatternCrashTest$5 = $$1;
    debugger;
    if (objPatternCrashTest$5) {
      arrPatternStep$13.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingC(arrPatternStep$1, objPatternCrashTest);
    return tmpReturnArg$11;
  } else {
    const SSA_objPatternCrashTest$3 = arrPatternStep$1 === null;
    const tmpReturnArg$1 = tmpBranchingC(arrPatternStep$1, SSA_objPatternCrashTest$3);
    return tmpReturnArg$1;
  }
};
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement$1, 12];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const tmpCalleeParam$1 = [tmpArrElement, 10];
const tmpCalleeParam = f(tmpCalleeParam$1);
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
