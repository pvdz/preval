# Preval test case

# default_no_no__obj_123.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { ...x } = tmpParamBare === undefined ? $({ a: 'fail' }) : tmpParamBare;
  return x;
};
$(f({ x: 1, b: 2, c: 3 }, 10));
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
    const tmpCalleeParam$1 = { a: 'fail' };
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
    const tmpCallCallee$3 = objPatternRest;
    const tmpCalleeParam$3 = bindingPatternObjRoot$5;
    const tmpCalleeParam$5 = [];
    const tmpCalleeParam$7 = 'x';
    let x$1 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
    return x$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$5 = $;
const tmpCallCallee$7 = f;
const tmpCalleeParam$11 = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$13 = 10;
const tmpCalleeParam$9 = tmpCallCallee$7(tmpCalleeParam$11, tmpCalleeParam$13);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const bindingPatternObjRoot$5 = $$0;
  debugger;
  const tmpCalleeParam$5 = [];
  const x$1 = objPatternRest(bindingPatternObjRoot$5, tmpCalleeParam$5, 'x');
  return x$1;
};
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { a: 'fail' };
    const tmpSSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpSSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$5 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam$11 = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$9 = f(tmpCalleeParam$11);
$(tmpCalleeParam$9);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', b: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
