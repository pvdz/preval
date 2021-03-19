# Preval test case

# default_yes__0.md

> Normalize > Pattern > Param > Obj > Default yes  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('fail')) {
  return 'ok';
}
$(f(0, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let {} = tmpParamDefault === undefined ? $('fail') : tmpParamDefault;
  return 'ok';
};
$(f(0, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1) {
    bindingPatternObjRoot$1 = $('fail');
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, bindingPatternObjRoot$2, tmpIfTest$2) {
    bindingPatternObjRoot$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, bindingPatternObjRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, bindingPatternObjRoot$3, tmpIfTest$3) {
    let objPatternCrashTest$1 = bindingPatternObjRoot$3 === undefined;
    const tmpBranchingA$1 = function (tmpParamDefault$4, bindingPatternObjRoot$4, tmpIfTest$4, objPatternCrashTest$2) {
      const tmpReturnArg$2 = tmpBranchingC$1(tmpParamDefault$4, bindingPatternObjRoot$4, tmpIfTest$4, objPatternCrashTest$2);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, bindingPatternObjRoot$5, tmpIfTest$5, objPatternCrashTest$3) {
      objPatternCrashTest$3 = bindingPatternObjRoot$5 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpParamDefault$5, bindingPatternObjRoot$5, tmpIfTest$5, objPatternCrashTest$3);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, bindingPatternObjRoot$6, tmpIfTest$6, objPatternCrashTest$4) {
      const tmpBranchingA$2 = function (tmpParamDefault$7, bindingPatternObjRoot$7, tmpIfTest$7, objPatternCrashTest$5) {
        objPatternCrashTest$5 = bindingPatternObjRoot$7.cannotDestructureThis;
        const tmpReturnArg$4 = tmpBranchingC$2(tmpParamDefault$7, bindingPatternObjRoot$7, tmpIfTest$7, objPatternCrashTest$5);
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function (tmpParamDefault$8, bindingPatternObjRoot$8, tmpIfTest$8, objPatternCrashTest$6) {
        const tmpReturnArg$5 = tmpBranchingC$2(tmpParamDefault$8, bindingPatternObjRoot$8, tmpIfTest$8, objPatternCrashTest$6);
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function (tmpParamDefault$9, bindingPatternObjRoot$9, tmpIfTest$9, objPatternCrashTest$7) {
        return 'ok';
      };
      if (objPatternCrashTest$4) {
        const tmpReturnArg$6 = tmpBranchingA$2(tmpParamDefault$6, bindingPatternObjRoot$6, tmpIfTest$6, objPatternCrashTest$4);
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(tmpParamDefault$6, bindingPatternObjRoot$6, tmpIfTest$6, objPatternCrashTest$4);
        return tmpReturnArg$7;
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$8 = tmpBranchingA$1(tmpParamDefault$3, bindingPatternObjRoot$3, tmpIfTest$3, objPatternCrashTest$1);
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpParamDefault$3, bindingPatternObjRoot$3, tmpIfTest$3, objPatternCrashTest$1);
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$11;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(0, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternObjRoot$3) {
    const objPatternCrashTest$1 = bindingPatternObjRoot$3 === undefined;
    const tmpBranchingC$1 = function (bindingPatternObjRoot$6, objPatternCrashTest$4) {
      if (objPatternCrashTest$4) {
        bindingPatternObjRoot$6.cannotDestructureThis;
        return 'ok';
      } else {
        return 'ok';
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$8 = tmpBranchingC$1(bindingPatternObjRoot$3, objPatternCrashTest$1);
      return tmpReturnArg$8;
    } else {
      const SSA_objPatternCrashTest$3 = bindingPatternObjRoot$3 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(bindingPatternObjRoot$3, SSA_objPatternCrashTest$3);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const SSA_bindingPatternObjRoot$1 = $('fail');
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f(0, 10);
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
