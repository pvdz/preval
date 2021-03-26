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
  let arrPatternSplat$3 = [...arrPatternStep$1];
  let arrPatternStep$3 = arrPatternSplat$3[0];
  let arrPatternSplat$5 = [...arrPatternStep$3];
  let arrPatternStep$5 = arrPatternSplat$5[0];
  let objPatternCrashTest = arrPatternStep$5 === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let arrPatternSplat$7 = $$2;
    let arrPatternStep$7 = $$3;
    let arrPatternSplat$9 = $$4;
    let arrPatternStep$9 = $$5;
    let arrPatternSplat$11 = $$6;
    let arrPatternStep$11 = $$7;
    let arrPatternSplat$13 = $$8;
    let arrPatternStep$13 = $$9;
    let objPatternCrashTest$1 = $$10;
    debugger;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$7,
      arrPatternStep$7,
      arrPatternSplat$9,
      arrPatternStep$9,
      arrPatternSplat$11,
      arrPatternStep$11,
      arrPatternSplat$13,
      arrPatternStep$13,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$15 = $$2;
    let arrPatternStep$15 = $$3;
    let arrPatternSplat$17 = $$4;
    let arrPatternStep$17 = $$5;
    let arrPatternSplat$19 = $$6;
    let arrPatternStep$19 = $$7;
    let arrPatternSplat$21 = $$8;
    let arrPatternStep$21 = $$9;
    let objPatternCrashTest$3 = $$10;
    debugger;
    objPatternCrashTest$3 = arrPatternStep$21 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternArrRoot$3,
      arrPatternSplat$15,
      arrPatternStep$15,
      arrPatternSplat$17,
      arrPatternStep$17,
      arrPatternSplat$19,
      arrPatternStep$19,
      arrPatternSplat$21,
      arrPatternStep$21,
      objPatternCrashTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let arrPatternSplat$23 = $$2;
    let arrPatternStep$23 = $$3;
    let arrPatternSplat$25 = $$4;
    let arrPatternStep$25 = $$5;
    let arrPatternSplat$27 = $$6;
    let arrPatternStep$27 = $$7;
    let arrPatternSplat$29 = $$8;
    let arrPatternStep$29 = $$9;
    let objPatternCrashTest$5 = $$10;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
      let tmpParamBare$7 = $$0;
      let bindingPatternArrRoot$7 = $$1;
      let arrPatternSplat$31 = $$2;
      let arrPatternStep$31 = $$3;
      let arrPatternSplat$33 = $$4;
      let arrPatternStep$33 = $$5;
      let arrPatternSplat$35 = $$6;
      let arrPatternStep$35 = $$7;
      let arrPatternSplat$37 = $$8;
      let arrPatternStep$37 = $$9;
      let objPatternCrashTest$7 = $$10;
      debugger;
      objPatternCrashTest$7 = arrPatternStep$37.cannotDestructureThis;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternArrRoot$7,
        arrPatternSplat$31,
        arrPatternStep$31,
        arrPatternSplat$33,
        arrPatternStep$33,
        arrPatternSplat$35,
        arrPatternStep$35,
        arrPatternSplat$37,
        arrPatternStep$37,
        objPatternCrashTest$7,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
      let tmpParamBare$9 = $$0;
      let bindingPatternArrRoot$9 = $$1;
      let arrPatternSplat$39 = $$2;
      let arrPatternStep$39 = $$3;
      let arrPatternSplat$41 = $$4;
      let arrPatternStep$41 = $$5;
      let arrPatternSplat$43 = $$6;
      let arrPatternStep$43 = $$7;
      let arrPatternSplat$45 = $$8;
      let arrPatternStep$45 = $$9;
      let objPatternCrashTest$9 = $$10;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternArrRoot$9,
        arrPatternSplat$39,
        arrPatternStep$39,
        arrPatternSplat$41,
        arrPatternStep$41,
        arrPatternSplat$43,
        arrPatternStep$43,
        arrPatternSplat$45,
        arrPatternStep$45,
        objPatternCrashTest$9,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
      let tmpParamBare$11 = $$0;
      let bindingPatternArrRoot$11 = $$1;
      let arrPatternSplat$47 = $$2;
      let arrPatternStep$47 = $$3;
      let arrPatternSplat$49 = $$4;
      let arrPatternStep$49 = $$5;
      let arrPatternSplat$51 = $$6;
      let arrPatternStep$51 = $$7;
      let arrPatternSplat$53 = $$8;
      let arrPatternStep$53 = $$9;
      let objPatternCrashTest$11 = $$10;
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest$5) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$23,
        arrPatternStep$23,
        arrPatternSplat$25,
        arrPatternStep$25,
        arrPatternSplat$27,
        arrPatternStep$27,
        arrPatternSplat$29,
        arrPatternStep$29,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternArrRoot$5,
        arrPatternSplat$23,
        arrPatternStep$23,
        arrPatternSplat$25,
        arrPatternStep$25,
        arrPatternSplat$27,
        arrPatternStep$27,
        arrPatternSplat$29,
        arrPatternStep$29,
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
      arrPatternSplat$3,
      arrPatternStep$3,
      arrPatternSplat$5,
      arrPatternStep$5,
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
      arrPatternSplat$3,
      arrPatternStep$3,
      arrPatternSplat$5,
      arrPatternStep$5,
      objPatternCrashTest,
    );
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement$5 = { x: 1 };
const tmpArrElement$3 = [tmpArrElement$5, 6, 7];
const tmpArrElement$1 = [tmpArrElement$3, 4, 5];
const tmpArrElement = [tmpArrElement$1, 20, 30];
const tmpCalleeParam$1 = [tmpArrElement, 40, 50];
const tmpCalleeParam$3 = 200;
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
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternStep$1 = arrPatternSplat$1[0];
  const arrPatternSplat$3 = [...arrPatternStep$1];
  const arrPatternStep$3 = arrPatternSplat$3[0];
  const arrPatternSplat$5 = [...arrPatternStep$3];
  const arrPatternStep$5 = arrPatternSplat$5[0];
  const objPatternCrashTest = arrPatternStep$5 === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const arrPatternStep$29 = $$0;
    const objPatternCrashTest$5 = $$1;
    debugger;
    if (objPatternCrashTest$5) {
      arrPatternStep$29.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingC(arrPatternStep$5, objPatternCrashTest);
    return tmpReturnArg$11;
  } else {
    const SSA_objPatternCrashTest$3 = arrPatternStep$5 === null;
    const tmpReturnArg$1 = tmpBranchingC(arrPatternStep$5, SSA_objPatternCrashTest$3);
    return tmpReturnArg$1;
  }
};
const tmpArrElement$5 = { x: 1 };
const tmpArrElement$3 = [tmpArrElement$5, 6, 7];
const tmpArrElement$1 = [tmpArrElement$3, 4, 5];
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
