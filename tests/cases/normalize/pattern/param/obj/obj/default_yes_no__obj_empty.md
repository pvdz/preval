# Preval test case

# default_yes_no__obj_empty.md

> Normalize > Pattern > Param > Obj > Obj > Default yes no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'pass' }) }) {
  return 'ok';
}
$(f({}, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x: {} = $({ x: 'pass' }) } = tmpParamPattern;
  return 'ok';
};
$(f({}, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternObjRoot$1,
    objPatternBeforeDefault$1,
    objPatternAfterDefault$1,
    tmpIfTest$1,
  ) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { x: 'pass' };
    objPatternAfterDefault$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternObjRoot$1,
      objPatternBeforeDefault$1,
      objPatternAfterDefault$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternObjRoot$2,
    objPatternBeforeDefault$2,
    objPatternAfterDefault$2,
    tmpIfTest$2,
  ) {
    objPatternAfterDefault$2 = objPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternObjRoot$2,
      objPatternBeforeDefault$2,
      objPatternAfterDefault$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternObjRoot$3,
    objPatternBeforeDefault$3,
    objPatternAfterDefault$3,
    tmpIfTest$3,
  ) {
    let objPatternCrashTest$1 = objPatternAfterDefault$3 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamPattern$4,
      bindingPatternObjRoot$4,
      objPatternBeforeDefault$4,
      objPatternAfterDefault$4,
      tmpIfTest$4,
      objPatternCrashTest$2,
    ) {
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamPattern$4,
        bindingPatternObjRoot$4,
        objPatternBeforeDefault$4,
        objPatternAfterDefault$4,
        tmpIfTest$4,
        objPatternCrashTest$2,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamPattern$5,
      bindingPatternObjRoot$5,
      objPatternBeforeDefault$5,
      objPatternAfterDefault$5,
      tmpIfTest$5,
      objPatternCrashTest$3,
    ) {
      objPatternCrashTest$3 = objPatternAfterDefault$5 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamPattern$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$5,
        tmpIfTest$5,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamPattern$6,
      bindingPatternObjRoot$6,
      objPatternBeforeDefault$6,
      objPatternAfterDefault$6,
      tmpIfTest$6,
      objPatternCrashTest$4,
    ) {
      const tmpBranchingA$2 = function (
        tmpParamPattern$7,
        bindingPatternObjRoot$7,
        objPatternBeforeDefault$7,
        objPatternAfterDefault$7,
        tmpIfTest$7,
        objPatternCrashTest$5,
      ) {
        objPatternCrashTest$5 = objPatternAfterDefault$7.cannotDestructureThis;
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamPattern$7,
          bindingPatternObjRoot$7,
          objPatternBeforeDefault$7,
          objPatternAfterDefault$7,
          tmpIfTest$7,
          objPatternCrashTest$5,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function (
        tmpParamPattern$8,
        bindingPatternObjRoot$8,
        objPatternBeforeDefault$8,
        objPatternAfterDefault$8,
        tmpIfTest$8,
        objPatternCrashTest$6,
      ) {
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamPattern$8,
          bindingPatternObjRoot$8,
          objPatternBeforeDefault$8,
          objPatternAfterDefault$8,
          tmpIfTest$8,
          objPatternCrashTest$6,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function (
        tmpParamPattern$9,
        bindingPatternObjRoot$9,
        objPatternBeforeDefault$9,
        objPatternAfterDefault$9,
        tmpIfTest$9,
        objPatternCrashTest$7,
      ) {
        return 'ok';
      };
      if (objPatternCrashTest$4) {
        const tmpReturnArg$6 = tmpBranchingA$2(
          tmpParamPattern$6,
          bindingPatternObjRoot$6,
          objPatternBeforeDefault$6,
          objPatternAfterDefault$6,
          tmpIfTest$6,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(
          tmpParamPattern$6,
          bindingPatternObjRoot$6,
          objPatternBeforeDefault$6,
          objPatternAfterDefault$6,
          tmpIfTest$6,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$7;
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$8 = tmpBranchingA$1(
        tmpParamPattern$3,
        bindingPatternObjRoot$3,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$3,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamPattern$3,
        bindingPatternObjRoot$3,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$3,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternBeforeDefault,
      objPatternAfterDefault,
      tmpIfTest,
    );
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternBeforeDefault,
      objPatternAfterDefault,
      tmpIfTest,
    );
    return tmpReturnArg$11;
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = {};
const tmpCalleeParam$4 = 10;
const tmpCalleeParam$2 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingC = function (objPatternAfterDefault$3) {
    const objPatternCrashTest$1 = objPatternAfterDefault$3 === undefined;
    const tmpBranchingC$1 = function (objPatternAfterDefault$6, objPatternCrashTest$4) {
      if (objPatternCrashTest$4) {
        objPatternAfterDefault$6.cannotDestructureThis;
        return 'ok';
      } else {
        return 'ok';
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$8 = tmpBranchingC$1(objPatternAfterDefault$3, objPatternCrashTest$1);
      return tmpReturnArg$8;
    } else {
      const SSA_objPatternCrashTest$3 = objPatternAfterDefault$3 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(objPatternAfterDefault$3, SSA_objPatternCrashTest$3);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { x: 'pass' };
    const SSA_objPatternAfterDefault$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_objPatternAfterDefault$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(objPatternBeforeDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$3 = {};
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 10);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '"pass"' }
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
