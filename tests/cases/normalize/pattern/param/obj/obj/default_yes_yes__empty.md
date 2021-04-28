# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Obj > Obj > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) } = $({ x: { y: 'pass2' } })) {
  return 'ok';
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: {} = $({ x: 'fail' }) } = tmpParamBare === undefined ? $({ x: { y: 'pass2' } }) : tmpParamBare;
  return 'ok';
};
$(f());
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
    const tmpCallCallee$1 = $;
    const tmpObjLitVal$1 = { y: 'pass2' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    bindingPatternObjRoot = tmpCallCallee$1(tmpCalleeParam$1);
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
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = { x: 'fail' };
      objPatternAfterDefault = tmpCallCallee$5(tmpCalleeParam$5);
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
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
let objPatternAfterDefault = undefined;
let objPatternCrashTest = undefined;
const tmpBranchingC$3 = function () {
  debugger;
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
    return undefined;
  } else {
    return undefined;
  }
};
const tmpBranchingC$1 = function () {
  debugger;
  objPatternCrashTest = objPatternAfterDefault === undefined;
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
    return undefined;
  } else {
    objPatternCrashTest = objPatternAfterDefault === null;
    tmpBranchingC$3();
    return undefined;
  }
};
const tmpObjLitVal$1 = { y: 'pass2' };
const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
const tmpSSA_bindingPatternObjRoot = $(tmpCalleeParam$1);
const tmpssa3_objPatternBeforeDefault = tmpSSA_bindingPatternObjRoot.x;
const tmpIfTest$1 = tmpssa3_objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$5 = { x: 'fail' };
  objPatternAfterDefault = $(tmpCalleeParam$5);
  tmpBranchingC$1();
} else {
  objPatternAfterDefault = tmpssa3_objPatternBeforeDefault;
  tmpBranchingC$1();
}
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"\\"pass2\\""}' }
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
