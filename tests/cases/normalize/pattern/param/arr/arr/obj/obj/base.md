# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  [
    {
      x: {},
    },
  ],
]) {
  return 'ok';
}
$(f([[{ x: { a: 1, b: 2, c: 3 } }, 20, 30], 40, 50], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [
    [
      {
        x: {},
      },
    ],
  ] = tmpParamBare;
  return 'ok';
};
$(f([[{ x: { a: 1, b: 2, c: 3 } }, 20, 30], 40, 50], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let objPatternNoDefault = arrPatternStep$1.x;
  let objPatternCrashTest = objPatternNoDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let arrPatternSplat$2 = $$2;
    let arrPatternStep$2 = $$3;
    let arrPatternSplat$3 = $$4;
    let arrPatternStep$3 = $$5;
    let objPatternNoDefault$1 = $$6;
    let objPatternCrashTest$1 = $$7;
    debugger;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$2,
      arrPatternStep$2,
      arrPatternSplat$3,
      arrPatternStep$3,
      objPatternNoDefault$1,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$2 = $$0;
    let bindingPatternArrRoot$2 = $$1;
    let arrPatternSplat$4 = $$2;
    let arrPatternStep$4 = $$3;
    let arrPatternSplat$5 = $$4;
    let arrPatternStep$5 = $$5;
    let objPatternNoDefault$2 = $$6;
    let objPatternCrashTest$2 = $$7;
    debugger;
    objPatternCrashTest$2 = objPatternNoDefault$2 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$4,
      arrPatternStep$4,
      arrPatternSplat$5,
      arrPatternStep$5,
      objPatternNoDefault$2,
      objPatternCrashTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$6 = $$2;
    let arrPatternStep$6 = $$3;
    let arrPatternSplat$7 = $$4;
    let arrPatternStep$7 = $$5;
    let objPatternNoDefault$3 = $$6;
    let objPatternCrashTest$3 = $$7;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$4 = $$0;
      let bindingPatternArrRoot$4 = $$1;
      let arrPatternSplat$8 = $$2;
      let arrPatternStep$8 = $$3;
      let arrPatternSplat$9 = $$4;
      let arrPatternStep$9 = $$5;
      let objPatternNoDefault$4 = $$6;
      let objPatternCrashTest$4 = $$7;
      debugger;
      objPatternCrashTest$4 = objPatternNoDefault$4.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternArrRoot$4,
        arrPatternSplat$8,
        arrPatternStep$8,
        arrPatternSplat$9,
        arrPatternStep$9,
        objPatternNoDefault$4,
        objPatternCrashTest$4,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$5 = $$0;
      let bindingPatternArrRoot$5 = $$1;
      let arrPatternSplat$10 = $$2;
      let arrPatternStep$10 = $$3;
      let arrPatternSplat$11 = $$4;
      let arrPatternStep$11 = $$5;
      let objPatternNoDefault$5 = $$6;
      let objPatternCrashTest$5 = $$7;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$10,
        arrPatternStep$10,
        arrPatternSplat$11,
        arrPatternStep$11,
        objPatternNoDefault$5,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$6 = $$0;
      let bindingPatternArrRoot$6 = $$1;
      let arrPatternSplat$12 = $$2;
      let arrPatternStep$12 = $$3;
      let arrPatternSplat$13 = $$4;
      let arrPatternStep$13 = $$5;
      let objPatternNoDefault$6 = $$6;
      let objPatternCrashTest$6 = $$7;
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$6,
        arrPatternStep$6,
        arrPatternSplat$7,
        arrPatternStep$7,
        objPatternNoDefault$3,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$6,
        arrPatternStep$6,
        arrPatternSplat$7,
        arrPatternStep$7,
        objPatternNoDefault$3,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$5;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingA(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternNoDefault,
      objPatternCrashTest,
    );
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternNoDefault,
      objPatternCrashTest,
    );
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
const tmpArrElement$1 = { x: tmpObjLitVal };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const arrPatternSplat = [...tmpParamBare];
  const arrPatternStep = arrPatternSplat[0];
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternStep$1 = arrPatternSplat$1[0];
  const objPatternNoDefault = arrPatternStep$1.x;
  const objPatternCrashTest = objPatternNoDefault === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const objPatternNoDefault$3 = $$0;
    const objPatternCrashTest$3 = $$1;
    debugger;
    if (objPatternCrashTest$3) {
      objPatternNoDefault$3.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(objPatternNoDefault, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = objPatternNoDefault === null;
    const tmpReturnArg$1 = tmpBranchingC(objPatternNoDefault, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
const tmpArrElement$1 = { x: tmpObjLitVal };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
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
