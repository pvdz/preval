# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: {},
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: {
      y: {},
    },
  } = tmpParamBare;
  return 'ok';
};
$(f({ x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternCrashTest = objPatternNoDefault$1 === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternNoDefault$3 = $$2;
    let objPatternNoDefault$5 = $$3;
    let objPatternCrashTest$1 = $$4;
    debugger;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternObjRoot$1,
      objPatternNoDefault$3,
      objPatternNoDefault$5,
      objPatternCrashTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternNoDefault$7 = $$2;
    let objPatternNoDefault$9 = $$3;
    let objPatternCrashTest$3 = $$4;
    debugger;
    objPatternCrashTest$3 = objPatternNoDefault$9 === null;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternObjRoot$3,
      objPatternNoDefault$7,
      objPatternNoDefault$9,
      objPatternCrashTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let objPatternNoDefault$11 = $$2;
    let objPatternNoDefault$13 = $$3;
    let objPatternCrashTest$5 = $$4;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let objPatternNoDefault$15 = $$2;
      let objPatternNoDefault$17 = $$3;
      let objPatternCrashTest$7 = $$4;
      debugger;
      objPatternCrashTest$7 = objPatternNoDefault$17.cannotDestructureThis;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternObjRoot$7,
        objPatternNoDefault$15,
        objPatternNoDefault$17,
        objPatternCrashTest$7,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let objPatternNoDefault$19 = $$2;
      let objPatternNoDefault$21 = $$3;
      let objPatternCrashTest$9 = $$4;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternObjRoot$9,
        objPatternNoDefault$19,
        objPatternNoDefault$21,
        objPatternCrashTest$9,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let objPatternNoDefault$23 = $$2;
      let objPatternNoDefault$25 = $$3;
      let objPatternCrashTest$11 = $$4;
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest$5) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternNoDefault$11,
        objPatternNoDefault$13,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternNoDefault$11,
        objPatternNoDefault$13,
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
      objPatternCrashTest,
    );
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(
      tmpParamBare,
      bindingPatternObjRoot,
      objPatternNoDefault,
      objPatternNoDefault$1,
      objPatternCrashTest,
    );
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = { z: 1, a: 2, b: 3 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 14 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$3 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternNoDefault = tmpParamBare.x;
  const objPatternNoDefault$1 = objPatternNoDefault.y;
  const objPatternCrashTest = objPatternNoDefault$1 === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const objPatternNoDefault$13 = $$0;
    const objPatternCrashTest$5 = $$1;
    debugger;
    if (objPatternCrashTest$5) {
      objPatternNoDefault$13.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingC(objPatternNoDefault$1, objPatternCrashTest);
    return tmpReturnArg$11;
  } else {
    const SSA_objPatternCrashTest$3 = objPatternNoDefault$1 === null;
    const tmpReturnArg$1 = tmpBranchingC(objPatternNoDefault$1, SSA_objPatternCrashTest$3);
    return tmpReturnArg$1;
  }
};
const tmpObjLitVal$3 = { z: 1, a: 2, b: 3 };
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
