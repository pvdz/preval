# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Obj > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: {
      z: {},
    },
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: { z: { a: 1, b: 2, c: 3 }, a: 15, b: 16 }, z: 14 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: {
      y: {
        z: {},
      },
    },
  } = tmpParamBare;
  return 'ok';
};
$(f({ x: { x: 13, y: { z: { a: 1, b: 2, c: 3 }, a: 15, b: 16 }, z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternNoDefault$2 = objPatternNoDefault$1.z;
  let objPatternCrashTest = objPatternNoDefault$2 === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternNoDefault$3 = $$2;
    let objPatternNoDefault$4 = $$3;
    let objPatternNoDefault$5 = $$4;
    let objPatternCrashTest$1 = $$5;
    debugger;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternObjRoot$1,
      objPatternNoDefault$3,
      objPatternNoDefault$4,
      objPatternNoDefault$5,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$2 = $$0;
    let bindingPatternObjRoot$2 = $$1;
    let objPatternNoDefault$6 = $$2;
    let objPatternNoDefault$7 = $$3;
    let objPatternNoDefault$8 = $$4;
    let objPatternCrashTest$2 = $$5;
    debugger;
    objPatternCrashTest$2 = objPatternNoDefault$8 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$2,
      bindingPatternObjRoot$2,
      objPatternNoDefault$6,
      objPatternNoDefault$7,
      objPatternNoDefault$8,
      objPatternCrashTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternNoDefault$9 = $$2;
    let objPatternNoDefault$10 = $$3;
    let objPatternNoDefault$11 = $$4;
    let objPatternCrashTest$3 = $$5;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$4 = $$0;
      let bindingPatternObjRoot$4 = $$1;
      let objPatternNoDefault$12 = $$2;
      let objPatternNoDefault$13 = $$3;
      let objPatternNoDefault$14 = $$4;
      let objPatternCrashTest$4 = $$5;
      debugger;
      objPatternCrashTest$4 = objPatternNoDefault$14.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternObjRoot$4,
        objPatternNoDefault$12,
        objPatternNoDefault$13,
        objPatternNoDefault$14,
        objPatternCrashTest$4,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$5 = $$0;
      let bindingPatternObjRoot$5 = $$1;
      let objPatternNoDefault$15 = $$2;
      let objPatternNoDefault$16 = $$3;
      let objPatternNoDefault$17 = $$4;
      let objPatternCrashTest$5 = $$5;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternNoDefault$15,
        objPatternNoDefault$16,
        objPatternNoDefault$17,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$6 = $$0;
      let bindingPatternObjRoot$6 = $$1;
      let objPatternNoDefault$18 = $$2;
      let objPatternNoDefault$19 = $$3;
      let objPatternNoDefault$20 = $$4;
      let objPatternCrashTest$6 = $$5;
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        objPatternNoDefault$9,
        objPatternNoDefault$10,
        objPatternNoDefault$11,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        objPatternNoDefault$9,
        objPatternNoDefault$10,
        objPatternNoDefault$11,
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
      objPatternNoDefault$1,
      objPatternNoDefault$2,
      objPatternCrashTest,
    );
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(
      tmpParamBare,
      bindingPatternObjRoot,
      objPatternNoDefault,
      objPatternNoDefault$1,
      objPatternNoDefault$2,
      objPatternCrashTest,
    );
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal$2 = { z: tmpObjLitVal$3, a: 15, b: 16 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: 14 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
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
  const objPatternNoDefault$1 = objPatternNoDefault.y;
  const objPatternNoDefault$2 = objPatternNoDefault$1.z;
  const objPatternCrashTest = objPatternNoDefault$2 === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const objPatternNoDefault$11 = $$0;
    const objPatternCrashTest$3 = $$1;
    debugger;
    if (objPatternCrashTest$3) {
      objPatternNoDefault$11.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(objPatternNoDefault$2, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = objPatternNoDefault$2 === null;
    const tmpReturnArg$1 = tmpBranchingC(objPatternNoDefault$2, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpObjLitVal$3 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal$2 = { z: tmpObjLitVal$3, a: 15, b: 16 };
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$2, z: 14 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
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
