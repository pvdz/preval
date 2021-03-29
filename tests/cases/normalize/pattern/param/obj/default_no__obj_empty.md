# Preval test case

# default_no__obj_empty.md

> Normalize > Pattern > Param > Obj > Default no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'ok';
}
$(f({}, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {} = tmpParamBare;
  return 'ok';
};
$(f({}, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternCrashTest = bindingPatternObjRoot === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternCrashTest$1 = $$2;
    debugger;
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternObjRoot$1, objPatternCrashTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternCrashTest$3 = $$2;
    debugger;
    objPatternCrashTest$3 = bindingPatternObjRoot$3 === null;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$3, bindingPatternObjRoot$3, objPatternCrashTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let objPatternCrashTest$5 = $$2;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let objPatternCrashTest$7 = $$2;
      debugger;
      objPatternCrashTest$7 = bindingPatternObjRoot$7.cannotDestructureThis;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpParamBare$7, bindingPatternObjRoot$7, objPatternCrashTest$7);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let objPatternCrashTest$9 = $$2;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamBare$9, bindingPatternObjRoot$9, objPatternCrashTest$9);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let objPatternCrashTest$11 = $$2;
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest$5) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpParamBare$5, bindingPatternObjRoot$5, objPatternCrashTest$5);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpParamBare$5, bindingPatternObjRoot$5, objPatternCrashTest$5);
      return tmpReturnArg$9;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternCrashTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternCrashTest);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = {};
const tmpCalleeParam$3 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0, $$1) {
  const bindingPatternObjRoot$5 = $$0;
  const objPatternCrashTest$5 = $$1;
  debugger;
  if (objPatternCrashTest$5) {
    bindingPatternObjRoot$5.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternCrashTest = tmpParamBare === undefined;
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingC(tmpParamBare, objPatternCrashTest);
    return tmpReturnArg$11;
  } else {
    const tmpSSA_objPatternCrashTest$3 = tmpParamBare === null;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare, tmpSSA_objPatternCrashTest$3);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$1 = {};
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
