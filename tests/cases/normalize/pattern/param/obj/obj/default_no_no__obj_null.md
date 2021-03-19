# Preval test case

# default_no_no__obj_null.md

> Normalize > Pattern > Param > Obj > Obj > Default no no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'bad';
}
$(f({ x: null, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let {
    x: {},
  } = tmpParamPattern;
  return 'bad';
};
$(f({ x: null, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternCrashTest = objPatternNoDefault === undefined;
  const tmpBranchingA = function (tmpParamPattern$1, bindingPatternObjRoot$1, objPatternNoDefault$1, objPatternCrashTest$1) {
    const tmpReturnArg = tmpBranchingC(tmpParamPattern$1, bindingPatternObjRoot$1, objPatternNoDefault$1, objPatternCrashTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamPattern$2, bindingPatternObjRoot$2, objPatternNoDefault$2, objPatternCrashTest$2) {
    objPatternCrashTest$2 = objPatternNoDefault$2 === null;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamPattern$2, bindingPatternObjRoot$2, objPatternNoDefault$2, objPatternCrashTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamPattern$3, bindingPatternObjRoot$3, objPatternNoDefault$3, objPatternCrashTest$3) {
    const tmpBranchingA$1 = function (tmpParamPattern$4, bindingPatternObjRoot$4, objPatternNoDefault$4, objPatternCrashTest$4) {
      objPatternCrashTest$4 = objPatternNoDefault$4.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(tmpParamPattern$4, bindingPatternObjRoot$4, objPatternNoDefault$4, objPatternCrashTest$4);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (tmpParamPattern$5, bindingPatternObjRoot$5, objPatternNoDefault$5, objPatternCrashTest$5) {
      const tmpReturnArg$3 = tmpBranchingC$1(tmpParamPattern$5, bindingPatternObjRoot$5, objPatternNoDefault$5, objPatternCrashTest$5);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (tmpParamPattern$6, bindingPatternObjRoot$6, objPatternNoDefault$6, objPatternCrashTest$6) {
      return 'bad';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(tmpParamPattern$3, bindingPatternObjRoot$3, objPatternNoDefault$3, objPatternCrashTest$3);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(tmpParamPattern$3, bindingPatternObjRoot$3, objPatternNoDefault$3, objPatternCrashTest$3);
      return tmpReturnArg$5;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamPattern, bindingPatternObjRoot, objPatternNoDefault, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamPattern, bindingPatternObjRoot, objPatternNoDefault, objPatternCrashTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { x: null, b: 11, c: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternNoDefault = tmpParamPattern.x;
  const objPatternCrashTest = objPatternNoDefault === undefined;
  const tmpBranchingC = function (objPatternNoDefault$3, objPatternCrashTest$3) {
    if (objPatternCrashTest$3) {
      objPatternNoDefault$3.cannotDestructureThis;
      return 'bad';
    } else {
      return 'bad';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(objPatternNoDefault, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = objPatternNoDefault === null;
    const tmpReturnArg$1 = tmpBranchingC(objPatternNoDefault, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$1 = { x: null, b: 11, c: 12 };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
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
