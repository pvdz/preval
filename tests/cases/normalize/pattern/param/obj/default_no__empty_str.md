# Preval test case

# default_no__empty_str.md

> Normalize > Pattern > Param > Obj > Default no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'ok';
}
$(f('', 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let {} = tmpParamPattern;
  return 'ok';
};
$(f('', 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternCrashTest = bindingPatternObjRoot === undefined;
  const tmpBranchingA = function (tmpParamPattern$1, bindingPatternObjRoot$1, objPatternCrashTest$1) {
    const tmpReturnArg = tmpBranchingC(tmpParamPattern$1, bindingPatternObjRoot$1, objPatternCrashTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamPattern$2, bindingPatternObjRoot$2, objPatternCrashTest$2) {
    objPatternCrashTest$2 = bindingPatternObjRoot$2 === null;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamPattern$2, bindingPatternObjRoot$2, objPatternCrashTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamPattern$3, bindingPatternObjRoot$3, objPatternCrashTest$3) {
    const tmpBranchingA$1 = function (tmpParamPattern$4, bindingPatternObjRoot$4, objPatternCrashTest$4) {
      objPatternCrashTest$4 = bindingPatternObjRoot$4.cannotDestructureThis;
      const tmpReturnArg$2 = tmpBranchingC$1(tmpParamPattern$4, bindingPatternObjRoot$4, objPatternCrashTest$4);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (tmpParamPattern$5, bindingPatternObjRoot$5, objPatternCrashTest$5) {
      const tmpReturnArg$3 = tmpBranchingC$1(tmpParamPattern$5, bindingPatternObjRoot$5, objPatternCrashTest$5);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (tmpParamPattern$6, bindingPatternObjRoot$6, objPatternCrashTest$6) {
      return 'ok';
    };
    if (objPatternCrashTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(tmpParamPattern$3, bindingPatternObjRoot$3, objPatternCrashTest$3);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(tmpParamPattern$3, bindingPatternObjRoot$3, objPatternCrashTest$3);
      return tmpReturnArg$5;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamPattern, bindingPatternObjRoot, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamPattern, bindingPatternObjRoot, objPatternCrashTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('', 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternCrashTest = tmpParamPattern === undefined;
  const tmpBranchingC = function (bindingPatternObjRoot$3, objPatternCrashTest$3) {
    if (objPatternCrashTest$3) {
      bindingPatternObjRoot$3.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$6 = tmpBranchingC(tmpParamPattern, objPatternCrashTest);
    return tmpReturnArg$6;
  } else {
    const SSA_objPatternCrashTest$2 = tmpParamPattern === null;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamPattern, SSA_objPatternCrashTest$2);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f('', 10);
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
