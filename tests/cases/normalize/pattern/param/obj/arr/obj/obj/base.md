# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Arr > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: [
    {
      y: {},
    },
  ],
}) {
  return 'ok';
}
$(f({ x: [{ x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: [
      {
        y: {},
      },
    ],
  } = tmpParamBare;
  return 'ok';
};
$(f({ x: [{ x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }, 13, 14], a: 11, b: 12 }, 10));
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
  let objPatternNoDefault$1 = arrPatternStep.y;
  let objPatternCrashTest = objPatternNoDefault$1 === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternNoDefault$2 = $$2;
    let arrPatternSplat$1 = $$3;
    let arrPatternStep$1 = $$4;
    let objPatternNoDefault$3 = $$5;
    let objPatternCrashTest$1 = $$6;
    debugger;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternObjRoot$1,
      objPatternNoDefault$2,
      arrPatternSplat$1,
      arrPatternStep$1,
      objPatternNoDefault$3,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpParamBare$2 = $$0;
    let bindingPatternObjRoot$2 = $$1;
    let objPatternNoDefault$4 = $$2;
    let arrPatternSplat$2 = $$3;
    let arrPatternStep$2 = $$4;
    let objPatternNoDefault$5 = $$5;
    let objPatternCrashTest$2 = $$6;
    debugger;
    objPatternCrashTest$2 = objPatternNoDefault$5 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$2,
      bindingPatternObjRoot$2,
      objPatternNoDefault$4,
      arrPatternSplat$2,
      arrPatternStep$2,
      objPatternNoDefault$5,
      objPatternCrashTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternNoDefault$6 = $$2;
    let arrPatternSplat$3 = $$3;
    let arrPatternStep$3 = $$4;
    let objPatternNoDefault$7 = $$5;
    let objPatternCrashTest$3 = $$6;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$4 = $$0;
      let bindingPatternObjRoot$4 = $$1;
      let objPatternNoDefault$8 = $$2;
      let arrPatternSplat$4 = $$3;
      let arrPatternStep$4 = $$4;
      let objPatternNoDefault$9 = $$5;
      let objPatternCrashTest$4 = $$6;
      debugger;
      objPatternCrashTest$4 = objPatternNoDefault$9.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternObjRoot$4,
        objPatternNoDefault$8,
        arrPatternSplat$4,
        arrPatternStep$4,
        objPatternNoDefault$9,
        objPatternCrashTest$4,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$5 = $$0;
      let bindingPatternObjRoot$5 = $$1;
      let objPatternNoDefault$10 = $$2;
      let arrPatternSplat$5 = $$3;
      let arrPatternStep$5 = $$4;
      let objPatternNoDefault$11 = $$5;
      let objPatternCrashTest$5 = $$6;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternNoDefault$10,
        arrPatternSplat$5,
        arrPatternStep$5,
        objPatternNoDefault$11,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$6 = $$0;
      let bindingPatternObjRoot$6 = $$1;
      let objPatternNoDefault$12 = $$2;
      let arrPatternSplat$6 = $$3;
      let arrPatternStep$6 = $$4;
      let objPatternNoDefault$13 = $$5;
      let objPatternCrashTest$6 = $$6;
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        objPatternNoDefault$6,
        arrPatternSplat$3,
        arrPatternStep$3,
        objPatternNoDefault$7,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        objPatternNoDefault$6,
        arrPatternSplat$3,
        arrPatternStep$3,
        objPatternNoDefault$7,
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
      objPatternNoDefault$1,
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
      objPatternNoDefault$1,
      objPatternCrashTest,
    );
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal$1 = 15;
const tmpObjLitVal$2 = { a: 1, b: 2, c: 3 };
const tmpArrElement = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, c: 16 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
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
  const objPatternNoDefault$1 = arrPatternStep.y;
  const objPatternCrashTest = objPatternNoDefault$1 === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const objPatternNoDefault$7 = $$0;
    const objPatternCrashTest$3 = $$1;
    debugger;
    if (objPatternCrashTest$3) {
      objPatternNoDefault$7.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(objPatternNoDefault$1, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = objPatternNoDefault$1 === null;
    const tmpReturnArg$1 = tmpBranchingC(objPatternNoDefault$1, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpObjLitVal$2 = { a: 1, b: 2, c: 3 };
const tmpArrElement = { x: 15, y: tmpObjLitVal$2, c: 16 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
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
