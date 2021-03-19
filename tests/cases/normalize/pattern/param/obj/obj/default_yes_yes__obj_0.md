# Preval test case

# default_yes_yes__obj_0.md

> Normalize > Pattern > Param > Obj > Obj > Default yes yes  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) } = $({ x: { y: 'fail2' } })) {
  return 'ok';
}
$(f({ x: 0, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { x: {} = $({ x: 'fail' }) } = tmpParamDefault === undefined ? $({ x: { y: 'fail2' } }) : tmpParamDefault;
  return 'ok';
};
$(f({ x: 0, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpObjLitVal$1 = { y: 'fail2' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    bindingPatternObjRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, bindingPatternObjRoot$2, tmpIfTest$2) {
    bindingPatternObjRoot$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, bindingPatternObjRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, bindingPatternObjRoot$3, tmpIfTest$3) {
    let objPatternBeforeDefault$1 = bindingPatternObjRoot$3.x;
    let objPatternAfterDefault$1 = undefined;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function (
      tmpParamDefault$4,
      bindingPatternObjRoot$4,
      tmpIfTest$5,
      objPatternBeforeDefault$2,
      objPatternAfterDefault$2,
      tmpIfTest$6,
    ) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = { x: 'fail' };
      objPatternAfterDefault$2 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamDefault$4,
        bindingPatternObjRoot$4,
        tmpIfTest$5,
        objPatternBeforeDefault$2,
        objPatternAfterDefault$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpParamDefault$5,
      bindingPatternObjRoot$5,
      tmpIfTest$7,
      objPatternBeforeDefault$3,
      objPatternAfterDefault$3,
      tmpIfTest$8,
    ) {
      objPatternAfterDefault$3 = objPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamDefault$5,
        bindingPatternObjRoot$5,
        tmpIfTest$7,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpParamDefault$6,
      bindingPatternObjRoot$6,
      tmpIfTest$9,
      objPatternBeforeDefault$4,
      objPatternAfterDefault$4,
      tmpIfTest$10,
    ) {
      let objPatternCrashTest$2 = objPatternAfterDefault$4 === undefined;
      const tmpBranchingA$2 = function (
        tmpParamDefault$7,
        bindingPatternObjRoot$7,
        tmpIfTest$11,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$5,
        tmpIfTest$12,
        objPatternCrashTest$3,
      ) {
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamDefault$7,
          bindingPatternObjRoot$7,
          tmpIfTest$11,
          objPatternBeforeDefault$5,
          objPatternAfterDefault$5,
          tmpIfTest$12,
          objPatternCrashTest$3,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function (
        tmpParamDefault$8,
        bindingPatternObjRoot$8,
        tmpIfTest$13,
        objPatternBeforeDefault$6,
        objPatternAfterDefault$6,
        tmpIfTest$14,
        objPatternCrashTest$4,
      ) {
        objPatternCrashTest$4 = objPatternAfterDefault$6 === null;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamDefault$8,
          bindingPatternObjRoot$8,
          tmpIfTest$13,
          objPatternBeforeDefault$6,
          objPatternAfterDefault$6,
          tmpIfTest$14,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function (
        tmpParamDefault$9,
        bindingPatternObjRoot$9,
        tmpIfTest$15,
        objPatternBeforeDefault$7,
        objPatternAfterDefault$7,
        tmpIfTest$16,
        objPatternCrashTest$5,
      ) {
        const tmpBranchingA$3 = function (
          tmpParamDefault$10,
          bindingPatternObjRoot$10,
          tmpIfTest$17,
          objPatternBeforeDefault$8,
          objPatternAfterDefault$8,
          tmpIfTest$18,
          objPatternCrashTest$6,
        ) {
          objPatternCrashTest$6 = objPatternAfterDefault$8.cannotDestructureThis;
          const tmpReturnArg$6 = tmpBranchingC$3(
            tmpParamDefault$10,
            bindingPatternObjRoot$10,
            tmpIfTest$17,
            objPatternBeforeDefault$8,
            objPatternAfterDefault$8,
            tmpIfTest$18,
            objPatternCrashTest$6,
          );
          return tmpReturnArg$6;
        };
        const tmpBranchingB$3 = function (
          tmpParamDefault$11,
          bindingPatternObjRoot$11,
          tmpIfTest$19,
          objPatternBeforeDefault$9,
          objPatternAfterDefault$9,
          tmpIfTest$20,
          objPatternCrashTest$7,
        ) {
          const tmpReturnArg$7 = tmpBranchingC$3(
            tmpParamDefault$11,
            bindingPatternObjRoot$11,
            tmpIfTest$19,
            objPatternBeforeDefault$9,
            objPatternAfterDefault$9,
            tmpIfTest$20,
            objPatternCrashTest$7,
          );
          return tmpReturnArg$7;
        };
        const tmpBranchingC$3 = function (
          tmpParamDefault$12,
          bindingPatternObjRoot$12,
          tmpIfTest$21,
          objPatternBeforeDefault$10,
          objPatternAfterDefault$10,
          tmpIfTest$22,
          objPatternCrashTest$8,
        ) {
          return 'ok';
        };
        if (objPatternCrashTest$5) {
          const tmpReturnArg$8 = tmpBranchingA$3(
            tmpParamDefault$9,
            bindingPatternObjRoot$9,
            tmpIfTest$15,
            objPatternBeforeDefault$7,
            objPatternAfterDefault$7,
            tmpIfTest$16,
            objPatternCrashTest$5,
          );
          return tmpReturnArg$8;
        } else {
          const tmpReturnArg$9 = tmpBranchingB$3(
            tmpParamDefault$9,
            bindingPatternObjRoot$9,
            tmpIfTest$15,
            objPatternBeforeDefault$7,
            objPatternAfterDefault$7,
            tmpIfTest$16,
            objPatternCrashTest$5,
          );
          return tmpReturnArg$9;
        }
      };
      if (objPatternCrashTest$2) {
        const tmpReturnArg$10 = tmpBranchingA$2(
          tmpParamDefault$6,
          bindingPatternObjRoot$6,
          tmpIfTest$9,
          objPatternBeforeDefault$4,
          objPatternAfterDefault$4,
          tmpIfTest$10,
          objPatternCrashTest$2,
        );
        return tmpReturnArg$10;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$2(
          tmpParamDefault$6,
          bindingPatternObjRoot$6,
          tmpIfTest$9,
          objPatternBeforeDefault$4,
          objPatternAfterDefault$4,
          tmpIfTest$10,
          objPatternCrashTest$2,
        );
        return tmpReturnArg$11;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$12 = tmpBranchingA$1(
        tmpParamDefault$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$12;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(
        tmpParamDefault$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$14 = tmpBranchingA(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$14;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$15;
  }
};
const tmpCallCallee$4 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = { x: 0, b: 11, c: 12 };
const tmpCalleeParam$6 = 10;
const tmpCalleeParam$4 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternObjRoot$3) {
    const objPatternBeforeDefault$1 = bindingPatternObjRoot$3.x;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingC$1 = function (objPatternAfterDefault$4) {
      const objPatternCrashTest$2 = objPatternAfterDefault$4 === undefined;
      const tmpBranchingC$2 = function (objPatternAfterDefault$7, objPatternCrashTest$5) {
        if (objPatternCrashTest$5) {
          objPatternAfterDefault$7.cannotDestructureThis;
          return 'ok';
        } else {
          return 'ok';
        }
      };
      if (objPatternCrashTest$2) {
        const tmpReturnArg$10 = tmpBranchingC$2(objPatternAfterDefault$4, objPatternCrashTest$2);
        return tmpReturnArg$10;
      } else {
        const SSA_objPatternCrashTest$4 = objPatternAfterDefault$4 === null;
        const tmpReturnArg$5 = tmpBranchingC$2(objPatternAfterDefault$4, SSA_objPatternCrashTest$4);
        return tmpReturnArg$5;
      }
    };
    if (tmpIfTest$4) {
      const tmpCalleeParam$3 = { x: 'fail' };
      const SSA_objPatternAfterDefault$2 = $(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_objPatternAfterDefault$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingC$1(objPatternBeforeDefault$1);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const tmpObjLitVal$1 = { y: 'fail2' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$5 = { x: 0, b: 11, c: 12 };
const tmpCalleeParam$4 = f(tmpCalleeParam$5, 10);
$(tmpCalleeParam$4);
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
