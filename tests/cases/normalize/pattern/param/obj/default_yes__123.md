# Preval test case

# default_yes__123.md

> Normalize > Pattern > Param > Obj > Default yes  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('pass')) {
  return 'ok';
}
$(f(1, 2, 3, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {} = tmpParamBare === undefined ? $('pass') : tmpParamBare;
  return 'ok';
};
$(f(1, 2, 3, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    bindingPatternObjRoot = $('pass');
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    bindingPatternObjRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    objPatternCrashTest = bindingPatternObjRoot === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      objPatternCrashTest = bindingPatternObjRoot === null;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpBranchingA$3 = function () {
        debugger;
        objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
        const tmpReturnArg$7 = tmpBranchingC$3();
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$9 = tmpBranchingC$3();
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        return 'ok';
      };
      if (objPatternCrashTest) {
        const tmpReturnArg$11 = tmpBranchingA$3();
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3();
        return tmpReturnArg$13;
      }
    };
    if (objPatternCrashTest) {
      const tmpReturnArg$15 = tmpBranchingA$1();
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1();
      return tmpReturnArg$17;
    }
  };
  let objPatternCrashTest = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA();
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB();
    return tmpReturnArg$21;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 2, 3, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpBranchingC$1 = function () {
    debugger;
    if (objPatternCrashTest) {
      objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
      return 'ok';
    } else {
      return 'ok';
    }
  };
  let bindingPatternObjRoot = undefined;
  let objPatternCrashTest = undefined;
  bindingPatternObjRoot = 1;
  objPatternCrashTest = bindingPatternObjRoot === undefined;
  if (objPatternCrashTest) {
    const tmpReturnArg = tmpBranchingC$1();
    return tmpReturnArg;
  } else {
    objPatternCrashTest = bindingPatternObjRoot === null;
    const tmpReturnArg$3 = tmpBranchingC$1();
    return tmpReturnArg$3;
  }
};
const tmpCalleeParam = f();
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
