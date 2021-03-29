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
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternBeforeDefault$3 = $$2;
    let objPatternAfterDefault$3 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    objPatternAfterDefault$3 = objPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternObjRoot$3,
      objPatternBeforeDefault$3,
      objPatternAfterDefault$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let objPatternBeforeDefault$5 = $$2;
    let objPatternAfterDefault$5 = $$3;
    let tmpIfTest$5 = $$4;
    debugger;
    let objPatternCrashTest$1 = objPatternAfterDefault$5 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let objPatternBeforeDefault$7 = $$2;
      let objPatternAfterDefault$7 = $$3;
      let tmpIfTest$7 = $$4;
      let objPatternCrashTest$3 = $$5;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternObjRoot$7,
        objPatternBeforeDefault$7,
        objPatternAfterDefault$7,
        tmpIfTest$7,
        objPatternCrashTest$3,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let objPatternBeforeDefault$9 = $$2;
      let objPatternAfterDefault$9 = $$3;
      let tmpIfTest$9 = $$4;
      let objPatternCrashTest$5 = $$5;
      debugger;
      objPatternCrashTest$5 = objPatternAfterDefault$9 === null;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternObjRoot$9,
        objPatternBeforeDefault$9,
        objPatternAfterDefault$9,
        tmpIfTest$9,
        objPatternCrashTest$5,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let objPatternBeforeDefault$11 = $$2;
      let objPatternAfterDefault$11 = $$3;
      let tmpIfTest$11 = $$4;
      let objPatternCrashTest$7 = $$5;
      debugger;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpParamBare$13 = $$0;
        let bindingPatternObjRoot$13 = $$1;
        let objPatternBeforeDefault$13 = $$2;
        let objPatternAfterDefault$13 = $$3;
        let tmpIfTest$13 = $$4;
        let objPatternCrashTest$9 = $$5;
        debugger;
        objPatternCrashTest$9 = objPatternAfterDefault$13.cannotDestructureThis;
        const tmpReturnArg$7 = tmpBranchingC$3(
          tmpParamBare$13,
          bindingPatternObjRoot$13,
          objPatternBeforeDefault$13,
          objPatternAfterDefault$13,
          tmpIfTest$13,
          objPatternCrashTest$9,
        );
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpParamBare$15 = $$0;
        let bindingPatternObjRoot$15 = $$1;
        let objPatternBeforeDefault$15 = $$2;
        let objPatternAfterDefault$15 = $$3;
        let tmpIfTest$15 = $$4;
        let objPatternCrashTest$11 = $$5;
        debugger;
        const tmpReturnArg$9 = tmpBranchingC$3(
          tmpParamBare$15,
          bindingPatternObjRoot$15,
          objPatternBeforeDefault$15,
          objPatternAfterDefault$15,
          tmpIfTest$15,
          objPatternCrashTest$11,
        );
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
        let tmpParamBare$17 = $$0;
        let bindingPatternObjRoot$17 = $$1;
        let objPatternBeforeDefault$17 = $$2;
        let objPatternAfterDefault$17 = $$3;
        let tmpIfTest$17 = $$4;
        let objPatternCrashTest$13 = $$5;
        debugger;
        return 'ok';
      };
      if (objPatternCrashTest$7) {
        const tmpReturnArg$11 = tmpBranchingA$3(
          tmpParamBare$11,
          bindingPatternObjRoot$11,
          objPatternBeforeDefault$11,
          objPatternAfterDefault$11,
          tmpIfTest$11,
          objPatternCrashTest$7,
        );
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3(
          tmpParamBare$11,
          bindingPatternObjRoot$11,
          objPatternBeforeDefault$11,
          objPatternAfterDefault$11,
          tmpIfTest$11,
          objPatternCrashTest$7,
        );
        return tmpReturnArg$13;
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$15 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$5,
        tmpIfTest$5,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$5,
        tmpIfTest$5,
        objPatternCrashTest$1,
      );
      return tmpReturnArg$17;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$21;
  }
};
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = { x: 'abc', b: 11, c: 12 };
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const objPatternAfterDefault$5 = $$0;
  debugger;
  const objPatternCrashTest$1 = objPatternAfterDefault$5 === undefined;
  if (objPatternCrashTest$1) {
    const tmpReturnArg$15 = tmpBranchingC$1(objPatternAfterDefault$5, objPatternCrashTest$1);
    return tmpReturnArg$15;
  } else {
    const tmpSSA_objPatternCrashTest$5 = objPatternAfterDefault$5 === null;
    const tmpReturnArg$5 = tmpBranchingC$1(objPatternAfterDefault$5, tmpSSA_objPatternCrashTest$5);
    return tmpReturnArg$5;
  }
};
const tmpBranchingC$1 = function ($$0, $$1) {
  const objPatternAfterDefault$11 = $$0;
  const objPatternCrashTest$7 = $$1;
  debugger;
  if (objPatternCrashTest$7) {
    objPatternAfterDefault$11.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternBeforeDefault = tmpParamBare.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { x: 'fail' };
    const tmpSSA_objPatternAfterDefault$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpSSA_objPatternAfterDefault$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$21 = tmpBranchingC(objPatternBeforeDefault);
    return tmpReturnArg$21;
  }
};
const tmpCalleeParam$5 = { x: 'abc', b: 11, c: 12 };
const tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
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
