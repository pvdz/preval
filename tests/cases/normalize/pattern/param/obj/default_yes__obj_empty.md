# Preval test case

# default_yes__obj_empty.md

> Normalize > Pattern > Param > Obj > Default yes  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('fail')) {
  return 'ok';
}
$(f({}, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {} = tmpParamBare === undefined ? $('fail') : tmpParamBare;
  return 'ok';
};
$(f({}, 10));
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
    bindingPatternObjRoot$1 = $('fail');
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
    let objPatternCrashTest$1 = bindingPatternObjRoot$5 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let tmpIfTest$7 = $$2;
      let objPatternCrashTest$3 = $$3;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpParamBare$7, bindingPatternObjRoot$7, tmpIfTest$7, objPatternCrashTest$3);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let tmpIfTest$9 = $$2;
      let objPatternCrashTest$5 = $$3;
      debugger;
      objPatternCrashTest$5 = bindingPatternObjRoot$9 === null;
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamBare$9, bindingPatternObjRoot$9, tmpIfTest$9, objPatternCrashTest$5);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let tmpIfTest$11 = $$2;
      let objPatternCrashTest$7 = $$3;
      debugger;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3) {
        let tmpParamBare$13 = $$0;
        let bindingPatternObjRoot$13 = $$1;
        let tmpIfTest$13 = $$2;
        let objPatternCrashTest$9 = $$3;
        debugger;
        objPatternCrashTest$9 = bindingPatternObjRoot$13.cannotDestructureThis;
        const tmpReturnArg$7 = tmpBranchingC$3(tmpParamBare$13, bindingPatternObjRoot$13, tmpIfTest$13, objPatternCrashTest$9);
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3) {
        let tmpParamBare$15 = $$0;
        let bindingPatternObjRoot$15 = $$1;
        let tmpIfTest$15 = $$2;
        let objPatternCrashTest$11 = $$3;
        debugger;
        const tmpReturnArg$9 = tmpBranchingC$3(tmpParamBare$15, bindingPatternObjRoot$15, tmpIfTest$15, objPatternCrashTest$11);
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3) {
        let tmpParamBare$17 = $$0;
        let bindingPatternObjRoot$17 = $$1;
        let tmpIfTest$17 = $$2;
        let objPatternCrashTest$13 = $$3;
        debugger;
        return 'ok';
      };
      if (objPatternCrashTest$7) {
        const tmpReturnArg$11 = tmpBranchingA$3(tmpParamBare$11, bindingPatternObjRoot$11, tmpIfTest$11, objPatternCrashTest$7);
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3(tmpParamBare$11, bindingPatternObjRoot$11, tmpIfTest$11, objPatternCrashTest$7);
        return tmpReturnArg$13;
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$15 = tmpBranchingA$1(tmpParamBare$5, bindingPatternObjRoot$5, tmpIfTest$5, objPatternCrashTest$1);
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(tmpParamBare$5, bindingPatternObjRoot$5, tmpIfTest$5, objPatternCrashTest$1);
      return tmpReturnArg$17;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$21;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = {};
const tmpCalleeParam$3 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function ($$0) {
    const bindingPatternObjRoot$5 = $$0;
    debugger;
    const objPatternCrashTest$1 = bindingPatternObjRoot$5 === undefined;
    const tmpBranchingC$1 = function ($$0, $$1) {
      const bindingPatternObjRoot$11 = $$0;
      const objPatternCrashTest$7 = $$1;
      debugger;
      if (objPatternCrashTest$7) {
        bindingPatternObjRoot$11.cannotDestructureThis;
        return 'ok';
      } else {
        return 'ok';
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$15 = tmpBranchingC$1(bindingPatternObjRoot$5, objPatternCrashTest$1);
      return tmpReturnArg$15;
    } else {
      const SSA_objPatternCrashTest$5 = bindingPatternObjRoot$5 === null;
      const tmpReturnArg$5 = tmpBranchingC$1(bindingPatternObjRoot$5, SSA_objPatternCrashTest$5);
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const SSA_bindingPatternObjRoot$1 = $('fail');
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$21 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$21;
  }
};
const tmpCalleeParam$1 = {};
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
