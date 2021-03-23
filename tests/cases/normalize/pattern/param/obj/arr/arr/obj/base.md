# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Arr > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [[{}]] }) {
  return 'ok';
}
$(f({ x: [[{ a: 1, b: 2, c: 3 }, 14], 13], a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [[{}]],
  } = tmpParamBare;
  return 'ok';
};
$(f({ x: [[{ a: 1, b: 2, c: 3 }, 14], 13], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let objPatternCrashTest = arrPatternStep$1 === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternNoDefault$1 = $$2;
    let arrPatternSplat$2 = $$3;
    let arrPatternStep$2 = $$4;
    let arrPatternSplat$3 = $$5;
    let arrPatternStep$3 = $$6;
    let objPatternCrashTest$1 = $$7;
    debugger;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternObjRoot$1,
      objPatternNoDefault$1,
      arrPatternSplat$2,
      arrPatternStep$2,
      arrPatternSplat$3,
      arrPatternStep$3,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$2 = $$0;
    let bindingPatternObjRoot$2 = $$1;
    let objPatternNoDefault$2 = $$2;
    let arrPatternSplat$4 = $$3;
    let arrPatternStep$4 = $$4;
    let arrPatternSplat$5 = $$5;
    let arrPatternStep$5 = $$6;
    let objPatternCrashTest$2 = $$7;
    debugger;
    objPatternCrashTest$2 = arrPatternStep$5 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$2,
      bindingPatternObjRoot$2,
      objPatternNoDefault$2,
      arrPatternSplat$4,
      arrPatternStep$4,
      arrPatternSplat$5,
      arrPatternStep$5,
      objPatternCrashTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternNoDefault$3 = $$2;
    let arrPatternSplat$6 = $$3;
    let arrPatternStep$6 = $$4;
    let arrPatternSplat$7 = $$5;
    let arrPatternStep$7 = $$6;
    let objPatternCrashTest$3 = $$7;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$4 = $$0;
      let bindingPatternObjRoot$4 = $$1;
      let objPatternNoDefault$4 = $$2;
      let arrPatternSplat$8 = $$3;
      let arrPatternStep$8 = $$4;
      let arrPatternSplat$9 = $$5;
      let arrPatternStep$9 = $$6;
      let objPatternCrashTest$4 = $$7;
      debugger;
      objPatternCrashTest$4 = arrPatternStep$9.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternObjRoot$4,
        objPatternNoDefault$4,
        arrPatternSplat$8,
        arrPatternStep$8,
        arrPatternSplat$9,
        arrPatternStep$9,
        objPatternCrashTest$4,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$5 = $$0;
      let bindingPatternObjRoot$5 = $$1;
      let objPatternNoDefault$5 = $$2;
      let arrPatternSplat$10 = $$3;
      let arrPatternStep$10 = $$4;
      let arrPatternSplat$11 = $$5;
      let arrPatternStep$11 = $$6;
      let objPatternCrashTest$5 = $$7;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternNoDefault$5,
        arrPatternSplat$10,
        arrPatternStep$10,
        arrPatternSplat$11,
        arrPatternStep$11,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$6 = $$0;
      let bindingPatternObjRoot$6 = $$1;
      let objPatternNoDefault$6 = $$2;
      let arrPatternSplat$12 = $$3;
      let arrPatternStep$12 = $$4;
      let arrPatternSplat$13 = $$5;
      let arrPatternStep$13 = $$6;
      let objPatternCrashTest$6 = $$7;
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        objPatternNoDefault$3,
        arrPatternSplat$6,
        arrPatternStep$6,
        arrPatternSplat$7,
        arrPatternStep$7,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        objPatternNoDefault$3,
        arrPatternSplat$6,
        arrPatternStep$6,
        arrPatternSplat$7,
        arrPatternStep$7,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$5;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingA(
      tmpParamBare,
      bindingPatternObjRoot,
      objPatternNoDefault,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternCrashTest,
    );
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(
      tmpParamBare,
      bindingPatternObjRoot,
      objPatternNoDefault,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternCrashTest,
    );
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpArrElement = [tmpArrElement$1, 14];
const tmpObjLitVal = [tmpArrElement, 13];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternNoDefault = tmpParamBare.x;
  const arrPatternSplat = [...objPatternNoDefault];
  const arrPatternStep = arrPatternSplat[0];
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternStep$1 = arrPatternSplat$1[0];
  const objPatternCrashTest = arrPatternStep$1 === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const arrPatternStep$7 = $$0;
    const objPatternCrashTest$3 = $$1;
    debugger;
    if (objPatternCrashTest$3) {
      arrPatternStep$7.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(arrPatternStep$1, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = arrPatternStep$1 === null;
    const tmpReturnArg$1 = tmpBranchingC(arrPatternStep$1, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpArrElement = [tmpArrElement$1, 14];
const tmpObjLitVal = [tmpArrElement, 13];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
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
