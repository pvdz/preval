# Preval test case

# default_yes_no__obj_str.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) }) {
  return y;
}
$(f({ x: 'abc', b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { ...y } = $({ a: 'fail' }) } = tmpParamBare;
  return y;
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
    const tmpCalleeParam$1 = { a: 'fail' };
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
    const tmpCallCallee$3 = objPatternRest;
    const tmpCalleeParam$3 = objPatternAfterDefault$5;
    const tmpCalleeParam$5 = [];
    const tmpCalleeParam$7 = undefined;
    let y$1 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
    return y$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$5 = $;
const tmpCallCallee$7 = f;
const tmpCalleeParam$11 = { x: 'abc', b: 11, c: 12 };
const tmpCalleeParam$13 = 10;
const tmpCalleeParam$9 = tmpCallCallee$7(tmpCalleeParam$11, tmpCalleeParam$13);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const objPatternAfterDefault$5 = $$0;
  debugger;
  const tmpCalleeParam$5 = [];
  const y$1 = objPatternRest(objPatternAfterDefault$5, tmpCalleeParam$5, undefined);
  return y$1;
};
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const objPatternBeforeDefault = tmpParamBare.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { a: 'fail' };
    const SSA_objPatternAfterDefault$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_objPatternAfterDefault$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$5 = tmpBranchingC(objPatternBeforeDefault);
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam$11 = { x: 'abc', b: 11, c: 12 };
const tmpCalleeParam$9 = f(tmpCalleeParam$11);
$(tmpCalleeParam$9);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
