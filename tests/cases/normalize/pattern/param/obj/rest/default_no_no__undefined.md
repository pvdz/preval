# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'pass' })) {
  return x;
}
$(f(undefined, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { ...x } = tmpParamBare === undefined ? $({ a: 'pass' }) : tmpParamBare;
  return x;
};
$(f(undefined, 10));
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
    const tmpCalleeParam$1 = { a: 'pass' };
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
    const tmpCallCallee$2 = objPatternRest;
    const tmpCalleeParam$2 = bindingPatternObjRoot$3;
    const tmpCalleeParam$3 = [];
    const tmpCalleeParam$4 = 'x';
    let x$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4);
    return x$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$5 = f(undefined, 10);
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = { a: 'pass' };
const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
const tmpCalleeParam$3 = [];
const x$1 = objPatternRest(SSA_bindingPatternObjRoot$1, tmpCalleeParam$3, 'x');
$(x$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
