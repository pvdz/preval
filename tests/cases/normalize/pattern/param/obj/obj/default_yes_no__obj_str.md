# Preval test case

# default_yes_no__obj_str.md

> Normalize > Pattern > Param > Obj > Obj > Default yes no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) }) {
  return 'ok';
}
$(f({ x: 'abc', b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: {} = $({ x: 'fail' }) } = tmpParamBare;
  return 'ok';
};
$(f({ x: 'abc', b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternBeforeDefault$1 = $$2;
    let objPatternAfterDefault$1 = $$3;
    let tmpIfTest$1 = $$4;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { x: 'fail' };
    objPatternAfterDefault$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternObjRoot$1,
      objPatternBeforeDefault$1,
      objPatternAfterDefault$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$2 = $$0;
    let bindingPatternObjRoot$2 = $$1;
    let objPatternBeforeDefault$2 = $$2;
    let objPatternAfterDefault$2 = $$3;
    let tmpIfTest$2 = $$4;
    debugger;
    objPatternAfterDefault$2 = objPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$2,
      bindingPatternObjRoot$2,
      objPatternBeforeDefault$2,
      objPatternAfterDefault$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternBeforeDefault$3 = $$2;
    let objPatternAfterDefault$3 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    let objPatternCrashTest$1 = objPatternAfterDefault$3 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$4 = $$0;
      let bindingPatternObjRoot$4 = $$1;
      let objPatternBeforeDefault$4 = $$2;
      let objPatternAfterDefault$4 = $$3;
      let tmpIfTest$4 = $$4;
      let objPatternCrashTest$2 = $$5;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternObjRoot$4,
        objPatternBeforeDefault$4,
        objPatternAfterDefault$4,
        tmpIfTest$4,
        objPatternCrashTest$2,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$5 = $$0;
      let bindingPatternObjRoot$5 = $$1;
      let objPatternBeforeDefault$5 = $$2;
      let objPatternAfterDefault$5 = $$3;
      let tmpIfTest$5 = $$4;
      let objPatternCrashTest$3 = $$5;
      debugger;
      objPatternCrashTest$3 = objPatternAfterDefault$5 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$5,
        tmpIfTest$5,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$6 = $$0;
      let bindingPatternObjRoot$6 = $$1;
      let objPatternBeforeDefault$6 = $$2;
      let objPatternAfterDefault$6 = $$3;
      let tmpIfTest$6 = $$4;
      let objPatternCrashTest$4 = $$5;
      debugger;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpParamBare$7 = $$0;
        let bindingPatternObjRoot$7 = $$1;
        let objPatternBeforeDefault$7 = $$2;
        let objPatternAfterDefault$7 = $$3;
        let tmpIfTest$7 = $$4;
        let objPatternCrashTest$5 = $$5;
        debugger;
        objPatternCrashTest$5 = objPatternAfterDefault$7.cannotDestructureThis;
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamBare$7,
          bindingPatternObjRoot$7,
          objPatternBeforeDefault$7,
          objPatternAfterDefault$7,
          tmpIfTest$7,
          objPatternCrashTest$5,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpParamBare$8 = $$0;
        let bindingPatternObjRoot$8 = $$1;
        let objPatternBeforeDefault$8 = $$2;
        let objPatternAfterDefault$8 = $$3;
        let tmpIfTest$8 = $$4;
        let objPatternCrashTest$6 = $$5;
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamBare$8,
          bindingPatternObjRoot$8,
          objPatternBeforeDefault$8,
          objPatternAfterDefault$8,
          tmpIfTest$8,
          objPatternCrashTest$6,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpParamBare$9 = $$0;
        let bindingPatternObjRoot$9 = $$1;
        let objPatternBeforeDefault$9 = $$2;
        let objPatternAfterDefault$9 = $$3;
        let tmpIfTest$9 = $$4;
        let objPatternCrashTest$7 = $$5;
        debugger;
        return 'ok';
      };
      if (objPatternCrashTest$4) {
        const tmpReturnArg$6 = tmpBranchingA$2(
          tmpParamBare$6,
          bindingPatternObjRoot$6,
          objPatternBeforeDefault$6,
          objPatternAfterDefault$6,
          tmpIfTest$6,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(
          tmpParamBare$6,
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
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$3,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$3,
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
    const tmpReturnArg$10 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$11;
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = { x: 'abc', b: 11, c: 12 };
const tmpCalleeParam$4 = 10;
const tmpCalleeParam$2 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternBeforeDefault = tmpParamBare.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingC = function ($$0) {
    const objPatternAfterDefault$3 = $$0;
    debugger;
    const objPatternCrashTest$1 = objPatternAfterDefault$3 === undefined;
    const tmpBranchingC$1 = function ($$0, $$1) {
      const objPatternAfterDefault$6 = $$0;
      const objPatternCrashTest$4 = $$1;
      debugger;
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
    const tmpCalleeParam$1 = { x: 'fail' };
    const SSA_objPatternAfterDefault$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_objPatternAfterDefault$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$11 = tmpBranchingC(objPatternBeforeDefault);
    return tmpReturnArg$11;
  }
};
const tmpCalleeParam$3 = { x: 'abc', b: 11, c: 12 };
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 10);
$(tmpCalleeParam$2);
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
