# Preval test case

# default_yes_yes__obj_obj_123.md

> Normalize > Pattern > Param > Obj > Obj > Default yes yes  obj obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) } = $({ x: { y: 'fail2' } })) {
  return 'ok';
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: {} = $({ x: 'fail' }) } = tmpParamBare === undefined ? $({ x: { y: 'fail2' } }) : tmpParamBare;
  return 'ok';
};
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
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
    const tmpObjLitVal$1 = { y: 'fail2' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    bindingPatternObjRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternObjRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let bindingPatternObjRoot$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    bindingPatternObjRoot$2 = tmpParamBare$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$2, bindingPatternObjRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    let objPatternBeforeDefault$1 = bindingPatternObjRoot$3.x;
    let objPatternAfterDefault$1 = undefined;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$4 = $$0;
      let bindingPatternObjRoot$4 = $$1;
      let tmpIfTest$5 = $$2;
      let objPatternBeforeDefault$2 = $$3;
      let objPatternAfterDefault$2 = $$4;
      let tmpIfTest$6 = $$5;
      debugger;
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = { x: 'fail' };
      objPatternAfterDefault$2 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternObjRoot$4,
        tmpIfTest$5,
        objPatternBeforeDefault$2,
        objPatternAfterDefault$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$5 = $$0;
      let bindingPatternObjRoot$5 = $$1;
      let tmpIfTest$7 = $$2;
      let objPatternBeforeDefault$3 = $$3;
      let objPatternAfterDefault$3 = $$4;
      let tmpIfTest$8 = $$5;
      debugger;
      objPatternAfterDefault$3 = objPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        tmpIfTest$7,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$6 = $$0;
      let bindingPatternObjRoot$6 = $$1;
      let tmpIfTest$9 = $$2;
      let objPatternBeforeDefault$4 = $$3;
      let objPatternAfterDefault$4 = $$4;
      let tmpIfTest$10 = $$5;
      debugger;
      let objPatternCrashTest$2 = objPatternAfterDefault$4 === undefined;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$7 = $$0;
        let bindingPatternObjRoot$7 = $$1;
        let tmpIfTest$11 = $$2;
        let objPatternBeforeDefault$5 = $$3;
        let objPatternAfterDefault$5 = $$4;
        let tmpIfTest$12 = $$5;
        let objPatternCrashTest$3 = $$6;
        debugger;
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamBare$7,
          bindingPatternObjRoot$7,
          tmpIfTest$11,
          objPatternBeforeDefault$5,
          objPatternAfterDefault$5,
          tmpIfTest$12,
          objPatternCrashTest$3,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$8 = $$0;
        let bindingPatternObjRoot$8 = $$1;
        let tmpIfTest$13 = $$2;
        let objPatternBeforeDefault$6 = $$3;
        let objPatternAfterDefault$6 = $$4;
        let tmpIfTest$14 = $$5;
        let objPatternCrashTest$4 = $$6;
        debugger;
        objPatternCrashTest$4 = objPatternAfterDefault$6 === null;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamBare$8,
          bindingPatternObjRoot$8,
          tmpIfTest$13,
          objPatternBeforeDefault$6,
          objPatternAfterDefault$6,
          tmpIfTest$14,
          objPatternCrashTest$4,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$9 = $$0;
        let bindingPatternObjRoot$9 = $$1;
        let tmpIfTest$15 = $$2;
        let objPatternBeforeDefault$7 = $$3;
        let objPatternAfterDefault$7 = $$4;
        let tmpIfTest$16 = $$5;
        let objPatternCrashTest$5 = $$6;
        debugger;
        const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
          let tmpParamBare$10 = $$0;
          let bindingPatternObjRoot$10 = $$1;
          let tmpIfTest$17 = $$2;
          let objPatternBeforeDefault$8 = $$3;
          let objPatternAfterDefault$8 = $$4;
          let tmpIfTest$18 = $$5;
          let objPatternCrashTest$6 = $$6;
          debugger;
          objPatternCrashTest$6 = objPatternAfterDefault$8.cannotDestructureThis;
          const tmpReturnArg$6 = tmpBranchingC$3(
            tmpParamBare$10,
            bindingPatternObjRoot$10,
            tmpIfTest$17,
            objPatternBeforeDefault$8,
            objPatternAfterDefault$8,
            tmpIfTest$18,
            objPatternCrashTest$6,
          );
          return tmpReturnArg$6;
        };
        const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
          let tmpParamBare$11 = $$0;
          let bindingPatternObjRoot$11 = $$1;
          let tmpIfTest$19 = $$2;
          let objPatternBeforeDefault$9 = $$3;
          let objPatternAfterDefault$9 = $$4;
          let tmpIfTest$20 = $$5;
          let objPatternCrashTest$7 = $$6;
          debugger;
          const tmpReturnArg$7 = tmpBranchingC$3(
            tmpParamBare$11,
            bindingPatternObjRoot$11,
            tmpIfTest$19,
            objPatternBeforeDefault$9,
            objPatternAfterDefault$9,
            tmpIfTest$20,
            objPatternCrashTest$7,
          );
          return tmpReturnArg$7;
        };
        const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
          let tmpParamBare$12 = $$0;
          let bindingPatternObjRoot$12 = $$1;
          let tmpIfTest$21 = $$2;
          let objPatternBeforeDefault$10 = $$3;
          let objPatternAfterDefault$10 = $$4;
          let tmpIfTest$22 = $$5;
          let objPatternCrashTest$8 = $$6;
          debugger;
          return 'ok';
        };
        if (objPatternCrashTest$5) {
          const tmpReturnArg$8 = tmpBranchingA$3(
            tmpParamBare$9,
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
            tmpParamBare$9,
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
          tmpParamBare$6,
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
          tmpParamBare$6,
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
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$12;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(
        tmpParamBare$3,
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
    const tmpReturnArg$14 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$14;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$15;
  }
};
const tmpCallCallee$4 = $;
const tmpCallCallee$5 = f;
const tmpObjLitVal$2 = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$5 = { x: tmpObjLitVal$2, b: 11, c: 12 };
const tmpCalleeParam$6 = 10;
const tmpCalleeParam$4 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function ($$0) {
    const bindingPatternObjRoot$3 = $$0;
    debugger;
    const objPatternBeforeDefault$1 = bindingPatternObjRoot$3.x;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingC$1 = function ($$0) {
      const objPatternAfterDefault$4 = $$0;
      debugger;
      const objPatternCrashTest$2 = objPatternAfterDefault$4 === undefined;
      const tmpBranchingC$2 = function ($$0, $$1) {
        const objPatternAfterDefault$7 = $$0;
        const objPatternCrashTest$5 = $$1;
        debugger;
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
      const tmpReturnArg$13 = tmpBranchingC$1(objPatternBeforeDefault$1);
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    const tmpObjLitVal$1 = { y: 'fail2' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$15 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$15;
  }
};
const tmpObjLitVal$2 = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$5 = { x: tmpObjLitVal$2, b: 11, c: 12 };
const tmpCalleeParam$4 = f(tmpCalleeParam$5);
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
