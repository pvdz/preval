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
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpObjLitVal$1 = { y: 'pass2' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    bindingPatternObjRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternObjRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    bindingPatternObjRoot$3 = tmpParamBare$3;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$3, bindingPatternObjRoot$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    let objPatternBeforeDefault$1 = bindingPatternObjRoot$5.x;
    let objPatternAfterDefault$1 = undefined;
    const tmpIfTest$7 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let tmpIfTest$9 = $$2;
      let objPatternBeforeDefault$3 = $$3;
      let objPatternAfterDefault$3 = $$4;
      let tmpIfTest$11 = $$5;
      debugger;
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = { x: 'fail' };
      objPatternAfterDefault$3 = tmpCallCallee$5(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternObjRoot$7,
        tmpIfTest$9,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$11,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let tmpIfTest$13 = $$2;
      let objPatternBeforeDefault$5 = $$3;
      let objPatternAfterDefault$5 = $$4;
      let tmpIfTest$15 = $$5;
      debugger;
      objPatternAfterDefault$5 = objPatternBeforeDefault$5;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternObjRoot$9,
        tmpIfTest$13,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$5,
        tmpIfTest$15,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let tmpIfTest$17 = $$2;
      let objPatternBeforeDefault$7 = $$3;
      let objPatternAfterDefault$7 = $$4;
      let tmpIfTest$19 = $$5;
      debugger;
      let objPatternCrashTest$3 = objPatternAfterDefault$7 === undefined;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$13 = $$0;
        let bindingPatternObjRoot$13 = $$1;
        let tmpIfTest$21 = $$2;
        let objPatternBeforeDefault$9 = $$3;
        let objPatternAfterDefault$9 = $$4;
        let tmpIfTest$23 = $$5;
        let objPatternCrashTest$5 = $$6;
        debugger;
        const tmpReturnArg$7 = tmpBranchingC$3(
          tmpParamBare$13,
          bindingPatternObjRoot$13,
          tmpIfTest$21,
          objPatternBeforeDefault$9,
          objPatternAfterDefault$9,
          tmpIfTest$23,
          objPatternCrashTest$5,
        );
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$15 = $$0;
        let bindingPatternObjRoot$15 = $$1;
        let tmpIfTest$25 = $$2;
        let objPatternBeforeDefault$11 = $$3;
        let objPatternAfterDefault$11 = $$4;
        let tmpIfTest$27 = $$5;
        let objPatternCrashTest$7 = $$6;
        debugger;
        objPatternCrashTest$7 = objPatternAfterDefault$11 === null;
        const tmpReturnArg$9 = tmpBranchingC$3(
          tmpParamBare$15,
          bindingPatternObjRoot$15,
          tmpIfTest$25,
          objPatternBeforeDefault$11,
          objPatternAfterDefault$11,
          tmpIfTest$27,
          objPatternCrashTest$7,
        );
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$17 = $$0;
        let bindingPatternObjRoot$17 = $$1;
        let tmpIfTest$29 = $$2;
        let objPatternBeforeDefault$13 = $$3;
        let objPatternAfterDefault$13 = $$4;
        let tmpIfTest$31 = $$5;
        let objPatternCrashTest$9 = $$6;
        debugger;
        const tmpBranchingA$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
          let tmpParamBare$19 = $$0;
          let bindingPatternObjRoot$19 = $$1;
          let tmpIfTest$33 = $$2;
          let objPatternBeforeDefault$15 = $$3;
          let objPatternAfterDefault$15 = $$4;
          let tmpIfTest$35 = $$5;
          let objPatternCrashTest$11 = $$6;
          debugger;
          objPatternCrashTest$11 = objPatternAfterDefault$15.cannotDestructureThis;
          const tmpReturnArg$11 = tmpBranchingC$5(
            tmpParamBare$19,
            bindingPatternObjRoot$19,
            tmpIfTest$33,
            objPatternBeforeDefault$15,
            objPatternAfterDefault$15,
            tmpIfTest$35,
            objPatternCrashTest$11,
          );
          return tmpReturnArg$11;
        };
        const tmpBranchingB$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
          let tmpParamBare$21 = $$0;
          let bindingPatternObjRoot$21 = $$1;
          let tmpIfTest$37 = $$2;
          let objPatternBeforeDefault$17 = $$3;
          let objPatternAfterDefault$17 = $$4;
          let tmpIfTest$39 = $$5;
          let objPatternCrashTest$13 = $$6;
          debugger;
          const tmpReturnArg$13 = tmpBranchingC$5(
            tmpParamBare$21,
            bindingPatternObjRoot$21,
            tmpIfTest$37,
            objPatternBeforeDefault$17,
            objPatternAfterDefault$17,
            tmpIfTest$39,
            objPatternCrashTest$13,
          );
          return tmpReturnArg$13;
        };
        const tmpBranchingC$5 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
          let tmpParamBare$23 = $$0;
          let bindingPatternObjRoot$23 = $$1;
          let tmpIfTest$41 = $$2;
          let objPatternBeforeDefault$19 = $$3;
          let objPatternAfterDefault$19 = $$4;
          let tmpIfTest$43 = $$5;
          let objPatternCrashTest$15 = $$6;
          debugger;
          return 'ok';
        };
        if (objPatternCrashTest$9) {
          const tmpReturnArg$15 = tmpBranchingA$5(
            tmpParamBare$17,
            bindingPatternObjRoot$17,
            tmpIfTest$29,
            objPatternBeforeDefault$13,
            objPatternAfterDefault$13,
            tmpIfTest$31,
            objPatternCrashTest$9,
          );
          return tmpReturnArg$15;
        } else {
          const tmpReturnArg$17 = tmpBranchingB$5(
            tmpParamBare$17,
            bindingPatternObjRoot$17,
            tmpIfTest$29,
            objPatternBeforeDefault$13,
            objPatternAfterDefault$13,
            tmpIfTest$31,
            objPatternCrashTest$9,
          );
          return tmpReturnArg$17;
        }
      };
      if (objPatternCrashTest$3) {
        const tmpReturnArg$19 = tmpBranchingA$3(
          tmpParamBare$11,
          bindingPatternObjRoot$11,
          tmpIfTest$17,
          objPatternBeforeDefault$7,
          objPatternAfterDefault$7,
          tmpIfTest$19,
          objPatternCrashTest$3,
        );
        return tmpReturnArg$19;
      } else {
        const tmpReturnArg$21 = tmpBranchingB$3(
          tmpParamBare$11,
          bindingPatternObjRoot$11,
          tmpIfTest$17,
          objPatternBeforeDefault$7,
          objPatternAfterDefault$7,
          tmpIfTest$19,
          objPatternCrashTest$3,
        );
        return tmpReturnArg$21;
      }
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$23 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        tmpIfTest$5,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        tmpIfTest$5,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$25;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$27 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$29 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$29;
  }
};
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const tmpBranchingC$1 = function ($$0) {
  const objPatternAfterDefault$7 = $$0;
  debugger;
  const objPatternCrashTest$3 = objPatternAfterDefault$7 === undefined;
  if (objPatternCrashTest$3) {
    const tmpReturnArg$19 = tmpBranchingC$3(objPatternAfterDefault$7, objPatternCrashTest$3);
    return tmpReturnArg$19;
  } else {
    const SSA_objPatternCrashTest$7 = objPatternAfterDefault$7 === null;
    const tmpReturnArg$9 = tmpBranchingC$3(objPatternAfterDefault$7, SSA_objPatternCrashTest$7);
    return tmpReturnArg$9;
  }
};
const tmpBranchingC$3 = function ($$0, $$1) {
  const objPatternAfterDefault$13 = $$0;
  const objPatternCrashTest$9 = $$1;
  debugger;
  if (objPatternCrashTest$9) {
    objPatternAfterDefault$13.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
const f = function () {
  debugger;
  const tmpObjLitVal$1 = { y: 'pass2' };
  const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
  const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
  const objPatternBeforeDefault$1 = SSA_bindingPatternObjRoot$1.x;
  const tmpIfTest$7 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$7) {
    const tmpCalleeParam$4 = { x: 'fail' };
    const SSA_objPatternAfterDefault$1 = $(tmpCalleeParam$4);
    const tmpReturnArg$1 = tmpBranchingC$1(SSA_objPatternAfterDefault$1);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$6 = tmpBranchingC$1(objPatternBeforeDefault$1);
    return tmpReturnArg$6;
  }
};
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
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
