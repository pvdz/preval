# Preval test case

# default_yes_yes_no__obj_missing.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['pass2']) }) {
  return y;
}
$(f({ a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [y = 'fail'] = $(['pass2']) } = tmpParamBare;
  return y;
};
$(f({ a: 11, b: 12 }, 10));
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
    const tmpCalleeParam$1 = ['pass2'];
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
    let arrPatternSplat$1 = [...objPatternAfterDefault$5];
    let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    let y$1 = undefined;
    const tmpIfTest$7 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let objPatternBeforeDefault$7 = $$2;
      let objPatternAfterDefault$7 = $$3;
      let tmpIfTest$9 = $$4;
      let arrPatternSplat$3 = $$5;
      let arrPatternBeforeDefault$3 = $$6;
      let y$3 = $$7;
      let tmpIfTest$11 = $$8;
      debugger;
      y$3 = 'fail';
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternObjRoot$7,
        objPatternBeforeDefault$7,
        objPatternAfterDefault$7,
        tmpIfTest$9,
        arrPatternSplat$3,
        arrPatternBeforeDefault$3,
        y$3,
        tmpIfTest$11,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let objPatternBeforeDefault$9 = $$2;
      let objPatternAfterDefault$9 = $$3;
      let tmpIfTest$13 = $$4;
      let arrPatternSplat$5 = $$5;
      let arrPatternBeforeDefault$5 = $$6;
      let y$5 = $$7;
      let tmpIfTest$15 = $$8;
      debugger;
      y$5 = arrPatternBeforeDefault$5;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternObjRoot$9,
        objPatternBeforeDefault$9,
        objPatternAfterDefault$9,
        tmpIfTest$13,
        arrPatternSplat$5,
        arrPatternBeforeDefault$5,
        y$5,
        tmpIfTest$15,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let objPatternBeforeDefault$11 = $$2;
      let objPatternAfterDefault$11 = $$3;
      let tmpIfTest$17 = $$4;
      let arrPatternSplat$7 = $$5;
      let arrPatternBeforeDefault$7 = $$6;
      let y$7 = $$7;
      let tmpIfTest$19 = $$8;
      debugger;
      return y$7;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$5,
        tmpIfTest$5,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        y$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$5,
        tmpIfTest$5,
        arrPatternSplat$1,
        arrPatternBeforeDefault$1,
        y$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = { a: 11, b: 12 };
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const objPatternAfterDefault$5 = $$0;
  debugger;
  const arrPatternSplat$1 = [...objPatternAfterDefault$5];
  const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  const tmpIfTest$7 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$7) {
    return 'fail';
  } else {
    return arrPatternBeforeDefault$1;
  }
};
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternBeforeDefault = tmpParamBare.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['pass2'];
    const SSA_objPatternAfterDefault$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_objPatternAfterDefault$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$13 = tmpBranchingC(objPatternBeforeDefault);
    return tmpReturnArg$13;
  }
};
const tmpCalleeParam$5 = { a: 11, b: 12 };
const tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
