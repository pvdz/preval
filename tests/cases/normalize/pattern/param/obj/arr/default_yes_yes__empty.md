# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Obj > Arr > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) } = $({ x: ['fail2'] })) {
  return 'ok';
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [] = $(['fail']) } = tmpParamBare === undefined ? $({ x: ['fail2'] }) : tmpParamBare;
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
    const tmpObjLitVal$1 = ['fail2'];
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
      const tmpCalleeParam$5 = ['fail'];
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
      let arrPatternSplat$3 = [...objPatternAfterDefault$7];
      return 'ok';
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        tmpIfTest$5,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        tmpIfTest$5,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$13;
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
  [...objPatternAfterDefault$7];
  return 'ok';
};
const f = function () {
  debugger;
  const tmpObjLitVal$1 = ['fail2'];
  const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
  const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
  const objPatternBeforeDefault$1 = SSA_bindingPatternObjRoot$1.x;
  const tmpIfTest$7 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$7) {
    const tmpCalleeParam$4 = ['fail'];
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
 - 1: { x: '["fail2"]' }
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
