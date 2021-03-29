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
  let objPatternNoDefault$3 = objPatternNoDefault$1.z;
  let objPatternCrashTest = objPatternNoDefault$3 === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternNoDefault$5 = $$2;
    let objPatternNoDefault$7 = $$3;
    let objPatternNoDefault$9 = $$4;
    let objPatternCrashTest$1 = $$5;
    debugger;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternObjRoot$1,
      objPatternNoDefault$5,
      objPatternNoDefault$7,
      objPatternNoDefault$9,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternNoDefault$11 = $$2;
    let objPatternNoDefault$13 = $$3;
    let objPatternNoDefault$15 = $$4;
    let objPatternCrashTest$3 = $$5;
    debugger;
    objPatternCrashTest$3 = objPatternNoDefault$15 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternObjRoot$3,
      objPatternNoDefault$11,
      objPatternNoDefault$13,
      objPatternNoDefault$15,
      objPatternCrashTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let objPatternNoDefault$17 = $$2;
    let objPatternNoDefault$19 = $$3;
    let objPatternNoDefault$21 = $$4;
    let objPatternCrashTest$5 = $$5;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let objPatternNoDefault$23 = $$2;
      let objPatternNoDefault$25 = $$3;
      let objPatternNoDefault$27 = $$4;
      let objPatternCrashTest$7 = $$5;
      debugger;
      objPatternCrashTest$7 = objPatternNoDefault$27.cannotDestructureThis;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternObjRoot$7,
        objPatternNoDefault$23,
        objPatternNoDefault$25,
        objPatternNoDefault$27,
        objPatternCrashTest$7,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let objPatternNoDefault$29 = $$2;
      let objPatternNoDefault$31 = $$3;
      let objPatternNoDefault$33 = $$4;
      let objPatternCrashTest$9 = $$5;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternObjRoot$9,
        objPatternNoDefault$29,
        objPatternNoDefault$31,
        objPatternNoDefault$33,
        objPatternCrashTest$9,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let objPatternNoDefault$35 = $$2;
      let objPatternNoDefault$37 = $$3;
      let objPatternNoDefault$39 = $$4;
      let objPatternCrashTest$11 = $$5;
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest$5) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternNoDefault$17,
        objPatternNoDefault$19,
        objPatternNoDefault$21,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternNoDefault$17,
        objPatternNoDefault$19,
        objPatternNoDefault$21,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$9;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingA(
      tmpParamBare,
      bindingPatternObjRoot,
      objPatternNoDefault,
      objPatternNoDefault$1,
      objPatternNoDefault$3,
      objPatternCrashTest,
    );
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(
      tmpParamBare,
      bindingPatternObjRoot,
      objPatternNoDefault,
      objPatternNoDefault$1,
      objPatternNoDefault$3,
      objPatternCrashTest,
    );
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$5 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal$3 = { z: tmpObjLitVal$5, a: 15, b: 16 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 14 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$3 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0, $$1) {
  const objPatternNoDefault$21 = $$0;
  const objPatternCrashTest$5 = $$1;
  debugger;
  if (objPatternCrashTest$5) {
    objPatternNoDefault$21.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternNoDefault = tmpParamBare.x;
  const objPatternNoDefault$1 = objPatternNoDefault.y;
  const objPatternNoDefault$3 = objPatternNoDefault$1.z;
  const objPatternCrashTest = objPatternNoDefault$3 === undefined;
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingC(objPatternNoDefault$3, objPatternCrashTest);
    return tmpReturnArg$11;
  } else {
    const SSA_objPatternCrashTest$3 = objPatternNoDefault$3 === null;
    const tmpReturnArg$1 = tmpBranchingC(objPatternNoDefault$3, SSA_objPatternCrashTest$3);
    return tmpReturnArg$1;
  }
};
const tmpObjLitVal$5 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal$3 = { z: tmpObjLitVal$5, a: 15, b: 16 };
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$3, z: 14 };
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
