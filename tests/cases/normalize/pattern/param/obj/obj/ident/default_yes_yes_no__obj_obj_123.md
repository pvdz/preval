# Preval test case

# default_yes_yes_no__obj_obj_123.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes no  obj obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { y = $('fail') } = $({ y: 'fail2' }) } = tmpParamBare;
  return y;
};
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
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
    let objPatternBeforeDefault$2 = $$2;
    let objPatternAfterDefault$1 = $$3;
    let tmpIfTest$1 = $$4;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { y: 'fail2' };
    objPatternAfterDefault$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternObjRoot$1,
      objPatternBeforeDefault$2,
      objPatternAfterDefault$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$2 = $$0;
    let bindingPatternObjRoot$2 = $$1;
    let objPatternBeforeDefault$3 = $$2;
    let objPatternAfterDefault$2 = $$3;
    let tmpIfTest$2 = $$4;
    debugger;
    objPatternAfterDefault$2 = objPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$2,
      bindingPatternObjRoot$2,
      objPatternBeforeDefault$3,
      objPatternAfterDefault$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternBeforeDefault$4 = $$2;
    let objPatternAfterDefault$3 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    let objPatternBeforeDefault$5 = objPatternAfterDefault$3.y;
    let y$1 = undefined;
    const tmpIfTest$4 = objPatternBeforeDefault$5 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$4 = $$0;
      let bindingPatternObjRoot$4 = $$1;
      let objPatternBeforeDefault$6 = $$2;
      let objPatternAfterDefault$4 = $$3;
      let tmpIfTest$5 = $$4;
      let objPatternBeforeDefault$7 = $$5;
      let y$2 = $$6;
      let tmpIfTest$6 = $$7;
      debugger;
      y$2 = $('fail');
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternObjRoot$4,
        objPatternBeforeDefault$6,
        objPatternAfterDefault$4,
        tmpIfTest$5,
        objPatternBeforeDefault$7,
        y$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$5 = $$0;
      let bindingPatternObjRoot$5 = $$1;
      let objPatternBeforeDefault$8 = $$2;
      let objPatternAfterDefault$5 = $$3;
      let tmpIfTest$7 = $$4;
      let objPatternBeforeDefault$9 = $$5;
      let y$3 = $$6;
      let tmpIfTest$8 = $$7;
      debugger;
      y$3 = objPatternBeforeDefault$9;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$8,
        objPatternAfterDefault$5,
        tmpIfTest$7,
        objPatternBeforeDefault$9,
        y$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$6 = $$0;
      let bindingPatternObjRoot$6 = $$1;
      let objPatternBeforeDefault$10 = $$2;
      let objPatternAfterDefault$6 = $$3;
      let tmpIfTest$9 = $$4;
      let objPatternBeforeDefault$11 = $$5;
      let y$4 = $$6;
      let tmpIfTest$10 = $$7;
      debugger;
      return y$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        objPatternBeforeDefault$4,
        objPatternAfterDefault$3,
        tmpIfTest$3,
        objPatternBeforeDefault$5,
        y$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        objPatternBeforeDefault$4,
        objPatternAfterDefault$3,
        tmpIfTest$3,
        objPatternBeforeDefault$5,
        y$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$3 = { x: tmpObjLitVal, b: 11, c: 12 };
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
    const objPatternBeforeDefault$5 = objPatternAfterDefault$3.y;
    const tmpIfTest$4 = objPatternBeforeDefault$5 === undefined;
    if (tmpIfTest$4) {
      const SSA_y$2 = $('fail');
      return SSA_y$2;
    } else {
      return objPatternBeforeDefault$5;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { y: 'fail2' };
    const SSA_objPatternAfterDefault$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_objPatternAfterDefault$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$7 = tmpBranchingC(objPatternBeforeDefault);
    return tmpReturnArg$7;
  }
};
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$3 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$2 = f(tmpCalleeParam$3, 10);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
