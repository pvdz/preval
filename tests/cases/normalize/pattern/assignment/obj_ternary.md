# Preval test case

# obj_ternary.md

> Normalize > Pattern > Assignment > Obj ternary
>
> Regression from obj param with default

Regression was causing infinite loop

#TODO

## Input

`````js filename=intro
let f = function () {
  let {} = $ ? 1 : 2;
};
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let {} = $ ? 1 : 2;
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpBranchingA = function () {
    debugger;
    bindingPatternObjRoot = 1;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    bindingPatternObjRoot = 2;
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
      if (objPatternCrashTest) {
        objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
        return undefined;
      } else {
        return undefined;
      }
    };
    if (objPatternCrashTest) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  let objPatternCrashTest = undefined;
  if ($) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
f();
`````

## Output

`````js filename=intro
let bindingPatternObjRoot = undefined;
let objPatternCrashTest = undefined;
const tmpBranchingC$1 = function () {
  debugger;
  if (objPatternCrashTest) {
    objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
    return undefined;
  } else {
    return undefined;
  }
};
const tmpBranchingC = function () {
  debugger;
  objPatternCrashTest = bindingPatternObjRoot === undefined;
  if (objPatternCrashTest) {
    tmpBranchingC$1();
    return undefined;
  } else {
    objPatternCrashTest = bindingPatternObjRoot === null;
    tmpBranchingC$1();
    return undefined;
  }
};
if ($) {
  bindingPatternObjRoot = 1;
  tmpBranchingC();
} else {
  bindingPatternObjRoot = 2;
  tmpBranchingC();
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
