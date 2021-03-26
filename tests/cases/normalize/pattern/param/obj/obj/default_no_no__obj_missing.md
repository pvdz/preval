# Preval test case

# default_no_no__obj_missing.md

> Normalize > Pattern > Param > Obj > Obj > Default no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'bad';
}
$(f({ b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: {},
  } = tmpParamBare;
  return 'bad';
};
$(f({ b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternCrashTest = objPatternNoDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternNoDefault$1 = $$2;
    let objPatternCrashTest$1 = $$3;
    debugger;
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternObjRoot$1, objPatternNoDefault$1, objPatternCrashTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternNoDefault$3 = $$2;
    let objPatternCrashTest$3 = $$3;
    debugger;
    objPatternCrashTest$3 = objPatternNoDefault$3 === null;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$3, bindingPatternObjRoot$3, objPatternNoDefault$3, objPatternCrashTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let objPatternNoDefault$5 = $$2;
    let objPatternCrashTest$5 = $$3;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let objPatternNoDefault$7 = $$2;
      let objPatternCrashTest$7 = $$3;
      debugger;
      objPatternCrashTest$7 = objPatternNoDefault$7.cannotDestructureThis;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpParamBare$7, bindingPatternObjRoot$7, objPatternNoDefault$7, objPatternCrashTest$7);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let objPatternNoDefault$9 = $$2;
      let objPatternCrashTest$9 = $$3;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamBare$9, bindingPatternObjRoot$9, objPatternNoDefault$9, objPatternCrashTest$9);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let objPatternNoDefault$11 = $$2;
      let objPatternCrashTest$11 = $$3;
      debugger;
      return 'bad';
    };
    if (objPatternCrashTest$5) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpParamBare$5, bindingPatternObjRoot$5, objPatternNoDefault$5, objPatternCrashTest$5);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpParamBare$5, bindingPatternObjRoot$5, objPatternNoDefault$5, objPatternCrashTest$5);
      return tmpReturnArg$9;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternNoDefault, objPatternCrashTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternNoDefault, objPatternCrashTest);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { b: 11, c: 12 };
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
  const objPatternCrashTest = objPatternNoDefault === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const objPatternNoDefault$5 = $$0;
    const objPatternCrashTest$5 = $$1;
    debugger;
    if (objPatternCrashTest$5) {
      objPatternNoDefault$5.cannotDestructureThis;
      return 'bad';
    } else {
      return 'bad';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingC(objPatternNoDefault, objPatternCrashTest);
    return tmpReturnArg$11;
  } else {
    const SSA_objPatternCrashTest$3 = objPatternNoDefault === null;
    const tmpReturnArg$1 = tmpBranchingC(objPatternNoDefault, SSA_objPatternCrashTest$3);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$1 = { b: 11, c: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
