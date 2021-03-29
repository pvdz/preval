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
    let arrPatternSplat$3 = $$2;
    let arrPatternStep$3 = $$3;
    let arrPatternSplat$5 = $$4;
    let arrPatternStep$5 = $$5;
    let objPatternNoDefault$1 = $$6;
    let objPatternCrashTest$1 = $$7;
    debugger;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$3,
      arrPatternStep$3,
      arrPatternSplat$5,
      arrPatternStep$5,
      objPatternNoDefault$1,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$7 = $$2;
    let arrPatternStep$7 = $$3;
    let arrPatternSplat$9 = $$4;
    let arrPatternStep$9 = $$5;
    let objPatternNoDefault$3 = $$6;
    let objPatternCrashTest$3 = $$7;
    debugger;
    objPatternCrashTest$3 = objPatternNoDefault$3 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternArrRoot$3,
      arrPatternSplat$7,
      arrPatternStep$7,
      arrPatternSplat$9,
      arrPatternStep$9,
      objPatternNoDefault$3,
      objPatternCrashTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let arrPatternSplat$11 = $$2;
    let arrPatternStep$11 = $$3;
    let arrPatternSplat$13 = $$4;
    let arrPatternStep$13 = $$5;
    let objPatternNoDefault$5 = $$6;
    let objPatternCrashTest$5 = $$7;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$7 = $$0;
      let bindingPatternArrRoot$7 = $$1;
      let arrPatternSplat$15 = $$2;
      let arrPatternStep$15 = $$3;
      let arrPatternSplat$17 = $$4;
      let arrPatternStep$17 = $$5;
      let objPatternNoDefault$7 = $$6;
      let objPatternCrashTest$7 = $$7;
      debugger;
      objPatternCrashTest$7 = objPatternNoDefault$7.cannotDestructureThis;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternArrRoot$7,
        arrPatternSplat$15,
        arrPatternStep$15,
        arrPatternSplat$17,
        arrPatternStep$17,
        objPatternNoDefault$7,
        objPatternCrashTest$7,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$9 = $$0;
      let bindingPatternArrRoot$9 = $$1;
      let arrPatternSplat$19 = $$2;
      let arrPatternStep$19 = $$3;
      let arrPatternSplat$21 = $$4;
      let arrPatternStep$21 = $$5;
      let objPatternNoDefault$9 = $$6;
      let objPatternCrashTest$9 = $$7;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternArrRoot$9,
        arrPatternSplat$19,
        arrPatternStep$19,
        arrPatternSplat$21,
        arrPatternStep$21,
        objPatternNoDefault$9,
        objPatternCrashTest$9,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$11 = $$0;
      let bindingPatternArrRoot$11 = $$1;
      let arrPatternSplat$23 = $$2;
      let arrPatternStep$23 = $$3;
      let arrPatternSplat$25 = $$4;
      let arrPatternStep$25 = $$5;
      let objPatternNoDefault$11 = $$6;
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
        arrPatternSplat$13,
        arrPatternStep$13,
        objPatternNoDefault$5,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$11,
        arrPatternStep$11,
        arrPatternSplat$13,
        arrPatternStep$13,
        objPatternNoDefault$5,
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
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternNoDefault,
      objPatternCrashTest,
    );
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternNoDefault,
      objPatternCrashTest,
    );
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = { a: 1, b: 2, c: 3 };
const tmpArrElement$1 = { x: tmpObjLitVal };
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0, $$1) {
  const objPatternNoDefault$5 = $$0;
  const objPatternCrashTest$5 = $$1;
  debugger;
  if (objPatternCrashTest$5) {
    objPatternNoDefault$5.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const arrPatternSplat = [...tmpParamBare];
  const arrPatternStep = arrPatternSplat[0];
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternStep$1 = arrPatternSplat$1[0];
  const objPatternNoDefault = arrPatternStep$1.x;
  const objPatternCrashTest = objPatternNoDefault === undefined;
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingC(objPatternNoDefault, objPatternCrashTest);
    return tmpReturnArg$11;
  } else {
    const tmpSSA_objPatternCrashTest$3 = objPatternNoDefault === null;
    const tmpReturnArg$1 = tmpBranchingC(objPatternNoDefault, tmpSSA_objPatternCrashTest$3);
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
