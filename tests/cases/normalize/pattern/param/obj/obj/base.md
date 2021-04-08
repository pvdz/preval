# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const a = 1, b = 2;
function f({ x: {} = a } = b) {
  return 'ok';
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: {} = a } = tmpParamBare === undefined ? b : tmpParamBare;
  return 'ok';
};
const a = 1,
  b = 2;
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
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
    bindingPatternObjRoot = b;
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
    objPatternBeforeDefault = bindingPatternObjRoot.x;
    const tmpIfTest$1 = objPatternBeforeDefault === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      objPatternAfterDefault = a;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      objPatternAfterDefault = objPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      objPatternCrashTest = objPatternAfterDefault === undefined;
      const tmpBranchingA$3 = function () {
        debugger;
        const tmpReturnArg$7 = tmpBranchingC$3();
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        objPatternCrashTest = objPatternAfterDefault === null;
        const tmpReturnArg$9 = tmpBranchingC$3();
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpBranchingA$5 = function () {
          debugger;
          objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
          const tmpReturnArg$11 = tmpBranchingC$5();
          return tmpReturnArg$11;
        };
        const tmpBranchingB$5 = function () {
          debugger;
          const tmpReturnArg$13 = tmpBranchingC$5();
          return tmpReturnArg$13;
        };
        const tmpBranchingC$5 = function () {
          debugger;
          return 'ok';
        };
        if (objPatternCrashTest) {
          const tmpReturnArg$15 = tmpBranchingA$5();
          return tmpReturnArg$15;
        } else {
          const tmpReturnArg$17 = tmpBranchingB$5();
          return tmpReturnArg$17;
        }
      };
      if (objPatternCrashTest) {
        const tmpReturnArg$19 = tmpBranchingA$3();
        return tmpReturnArg$19;
      } else {
        const tmpReturnArg$21 = tmpBranchingB$3();
        return tmpReturnArg$21;
      }
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$23 = tmpBranchingA$1();
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1();
      return tmpReturnArg$25;
    }
  };
  let objPatternBeforeDefault = undefined;
  let objPatternAfterDefault = undefined;
  let objPatternCrashTest = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$27 = tmpBranchingA();
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$29 = tmpBranchingB();
    return tmpReturnArg$29;
  }
};
const a = 1;
const b = 2;
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
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
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function () {
    debugger;
    objPatternBeforeDefault = bindingPatternObjRoot.x;
    const tmpIfTest$1 = objPatternBeforeDefault === undefined;
    const tmpBranchingC$1 = function () {
      debugger;
      objPatternCrashTest = objPatternAfterDefault === undefined;
      const tmpBranchingC$3 = function () {
        debugger;
        if (objPatternCrashTest) {
          objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
          return 'ok';
        } else {
          return 'ok';
        }
      };
      if (objPatternCrashTest) {
        const tmpReturnArg$19 = tmpBranchingC$3();
        return tmpReturnArg$19;
      } else {
        objPatternCrashTest = objPatternAfterDefault === null;
        const tmpReturnArg$9 = tmpBranchingC$3();
        return tmpReturnArg$9;
      }
    };
    if (tmpIfTest$1) {
      objPatternAfterDefault = 1;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    }
  };
  let objPatternBeforeDefault = undefined;
  let objPatternAfterDefault = undefined;
  let objPatternCrashTest = undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = 2;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    bindingPatternObjRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  }
};
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
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
