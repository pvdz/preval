# Preval test case

# default_yes__null.md

> Normalize > Pattern > Param > Obj > Default yes  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('fail')) {
  return 'bad';
}
$(f(null, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {} = tmpParamBare === undefined ? $('fail') : tmpParamBare;
  return 'bad';
};
$(f(null, 10));
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
    let objPatternCrashTest$1 = bindingPatternObjRoot$3 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$4 = $$0;
      let bindingPatternObjRoot$4 = $$1;
      let tmpIfTest$4 = $$2;
      let objPatternCrashTest$2 = $$3;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC$1(tmpParamBare$4, bindingPatternObjRoot$4, tmpIfTest$4, objPatternCrashTest$2);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$5 = $$0;
      let bindingPatternObjRoot$5 = $$1;
      let tmpIfTest$5 = $$2;
      let objPatternCrashTest$3 = $$3;
      debugger;
      objPatternCrashTest$3 = bindingPatternObjRoot$5 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpParamBare$5, bindingPatternObjRoot$5, tmpIfTest$5, objPatternCrashTest$3);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let tmpParamBare$6 = $$0;
      let bindingPatternObjRoot$6 = $$1;
      let tmpIfTest$6 = $$2;
      let objPatternCrashTest$4 = $$3;
      debugger;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3) {
        let tmpParamBare$7 = $$0;
        let bindingPatternObjRoot$7 = $$1;
        let tmpIfTest$7 = $$2;
        let objPatternCrashTest$5 = $$3;
        debugger;
        objPatternCrashTest$5 = bindingPatternObjRoot$7.cannotDestructureThis;
        const tmpReturnArg$4 = tmpBranchingC$2(tmpParamBare$7, bindingPatternObjRoot$7, tmpIfTest$7, objPatternCrashTest$5);
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3) {
        let tmpParamBare$8 = $$0;
        let bindingPatternObjRoot$8 = $$1;
        let tmpIfTest$8 = $$2;
        let objPatternCrashTest$6 = $$3;
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$2(tmpParamBare$8, bindingPatternObjRoot$8, tmpIfTest$8, objPatternCrashTest$6);
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3) {
        let tmpParamBare$9 = $$0;
        let bindingPatternObjRoot$9 = $$1;
        let tmpIfTest$9 = $$2;
        let objPatternCrashTest$7 = $$3;
        debugger;
        return 'bad';
      };
      if (objPatternCrashTest$4) {
        const tmpReturnArg$6 = tmpBranchingA$2(tmpParamBare$6, bindingPatternObjRoot$6, tmpIfTest$6, objPatternCrashTest$4);
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(tmpParamBare$6, bindingPatternObjRoot$6, tmpIfTest$6, objPatternCrashTest$4);
        return tmpReturnArg$7;
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$8 = tmpBranchingA$1(tmpParamBare$3, bindingPatternObjRoot$3, tmpIfTest$3, objPatternCrashTest$1);
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpParamBare$3, bindingPatternObjRoot$3, tmpIfTest$3, objPatternCrashTest$1);
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$11;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(null, 10);
tmpCallCallee(tmpCalleeParam);
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
    const objPatternCrashTest$1 = bindingPatternObjRoot$3 === undefined;
    const tmpBranchingC$1 = function ($$0, $$1) {
      const bindingPatternObjRoot$6 = $$0;
      const objPatternCrashTest$4 = $$1;
      debugger;
      if (objPatternCrashTest$4) {
        bindingPatternObjRoot$6.cannotDestructureThis;
        return 'bad';
      } else {
        return 'bad';
      }
    };
    if (objPatternCrashTest$1) {
      const tmpReturnArg$8 = tmpBranchingC$1(bindingPatternObjRoot$3, objPatternCrashTest$1);
      return tmpReturnArg$8;
    } else {
      const SSA_objPatternCrashTest$3 = bindingPatternObjRoot$3 === null;
      const tmpReturnArg$3 = tmpBranchingC$1(bindingPatternObjRoot$3, SSA_objPatternCrashTest$3);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const SSA_bindingPatternObjRoot$1 = $('fail');
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$11 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$11;
  }
};
const tmpCalleeParam = f(null, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
