# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Arr > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[[[{}]]]]) {
  return 'ok';
}
$(f([[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[[[{}]]]] = tmpParamBare;
  return 'ok';
};
$(f([[[[{ x: 1 }, 6, 7], 4, 5], 20, 30], 40, 50], 200));
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
  let arrPatternSplat$2 = [...arrPatternStep$1];
  let arrPatternStep$2 = arrPatternSplat$2[0];
  let arrPatternSplat$3 = [...arrPatternStep$2];
  let arrPatternStep$3 = arrPatternSplat$3[0];
  let objPatternCrashTest = arrPatternStep$3 === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let arrPatternSplat$4 = $$2;
    let arrPatternStep$4 = $$3;
    let arrPatternSplat$5 = $$4;
    let arrPatternStep$5 = $$5;
    let arrPatternSplat$6 = $$6;
    let arrPatternStep$6 = $$7;
    let arrPatternSplat$7 = $$8;
    let arrPatternStep$7 = $$9;
    let objPatternCrashTest$1 = $$10;
    debugger;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$4,
      arrPatternStep$4,
      arrPatternSplat$5,
      arrPatternStep$5,
      arrPatternSplat$6,
      arrPatternStep$6,
      arrPatternSplat$7,
      arrPatternStep$7,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
    let tmpParamBare$2 = $$0;
    let bindingPatternArrRoot$2 = $$1;
    let arrPatternSplat$8 = $$2;
    let arrPatternStep$8 = $$3;
    let arrPatternSplat$9 = $$4;
    let arrPatternStep$9 = $$5;
    let arrPatternSplat$10 = $$6;
    let arrPatternStep$10 = $$7;
    let arrPatternSplat$11 = $$8;
    let arrPatternStep$11 = $$9;
    let objPatternCrashTest$2 = $$10;
    debugger;
    objPatternCrashTest$2 = arrPatternStep$11 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$8,
      arrPatternStep$8,
      arrPatternSplat$9,
      arrPatternStep$9,
      arrPatternSplat$10,
      arrPatternStep$10,
      arrPatternSplat$11,
      arrPatternStep$11,
      objPatternCrashTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$12 = $$2;
    let arrPatternStep$12 = $$3;
    let arrPatternSplat$13 = $$4;
    let arrPatternStep$13 = $$5;
    let arrPatternSplat$14 = $$6;
    let arrPatternStep$14 = $$7;
    let arrPatternSplat$15 = $$8;
    let arrPatternStep$15 = $$9;
    let objPatternCrashTest$3 = $$10;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
      let tmpParamBare$4 = $$0;
      let bindingPatternArrRoot$4 = $$1;
      let arrPatternSplat$16 = $$2;
      let arrPatternStep$16 = $$3;
      let arrPatternSplat$17 = $$4;
      let arrPatternStep$17 = $$5;
      let arrPatternSplat$18 = $$6;
      let arrPatternStep$18 = $$7;
      let arrPatternSplat$19 = $$8;
      let arrPatternStep$19 = $$9;
      let objPatternCrashTest$4 = $$10;
      debugger;
      objPatternCrashTest$4 = arrPatternStep$19.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternArrRoot$4,
        arrPatternSplat$16,
        arrPatternStep$16,
        arrPatternSplat$17,
        arrPatternStep$17,
        arrPatternSplat$18,
        arrPatternStep$18,
        arrPatternSplat$19,
        arrPatternStep$19,
        objPatternCrashTest$4,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
      let tmpParamBare$5 = $$0;
      let bindingPatternArrRoot$5 = $$1;
      let arrPatternSplat$20 = $$2;
      let arrPatternStep$20 = $$3;
      let arrPatternSplat$21 = $$4;
      let arrPatternStep$21 = $$5;
      let arrPatternSplat$22 = $$6;
      let arrPatternStep$22 = $$7;
      let arrPatternSplat$23 = $$8;
      let arrPatternStep$23 = $$9;
      let objPatternCrashTest$5 = $$10;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$20,
        arrPatternStep$20,
        arrPatternSplat$21,
        arrPatternStep$21,
        arrPatternSplat$22,
        arrPatternStep$22,
        arrPatternSplat$23,
        arrPatternStep$23,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
      let tmpParamBare$6 = $$0;
      let bindingPatternArrRoot$6 = $$1;
      let arrPatternSplat$24 = $$2;
      let arrPatternStep$24 = $$3;
      let arrPatternSplat$25 = $$4;
      let arrPatternStep$25 = $$5;
      let arrPatternSplat$26 = $$6;
      let arrPatternStep$26 = $$7;
      let arrPatternSplat$27 = $$8;
      let arrPatternStep$27 = $$9;
      let objPatternCrashTest$6 = $$10;
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$12,
        arrPatternStep$12,
        arrPatternSplat$13,
        arrPatternStep$13,
        arrPatternSplat$14,
        arrPatternStep$14,
        arrPatternSplat$15,
        arrPatternStep$15,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternArrRoot$3,
        arrPatternSplat$12,
        arrPatternStep$12,
        arrPatternSplat$13,
        arrPatternStep$13,
        arrPatternSplat$14,
        arrPatternStep$14,
        arrPatternSplat$15,
        arrPatternStep$15,
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
      arrPatternSplat$2,
      arrPatternStep$2,
      arrPatternSplat$3,
      arrPatternStep$3,
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
      arrPatternSplat$2,
      arrPatternStep$2,
      arrPatternSplat$3,
      arrPatternStep$3,
      objPatternCrashTest,
    );
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement$3 = { x: 1 };
const tmpArrElement$2 = [tmpArrElement$3, 6, 7];
const tmpArrElement$1 = [tmpArrElement$2, 4, 5];
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
  const arrPatternSplat$2 = [...arrPatternStep$1];
  const arrPatternStep$2 = arrPatternSplat$2[0];
  const arrPatternSplat$3 = [...arrPatternStep$2];
  const arrPatternStep$3 = arrPatternSplat$3[0];
  const objPatternCrashTest = arrPatternStep$3 === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const arrPatternStep$15 = $$0;
    const objPatternCrashTest$3 = $$1;
    debugger;
    if (objPatternCrashTest$3) {
      arrPatternStep$15.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(arrPatternStep$3, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = arrPatternStep$3 === null;
    const tmpReturnArg$1 = tmpBranchingC(arrPatternStep$3, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpArrElement$3 = { x: 1 };
const tmpArrElement$2 = [tmpArrElement$3, 6, 7];
const tmpArrElement$1 = [tmpArrElement$2, 4, 5];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
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
