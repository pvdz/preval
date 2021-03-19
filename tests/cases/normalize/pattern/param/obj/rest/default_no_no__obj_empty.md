# Preval test case

# default_no_no__obj_empty.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return x;
}
$(f({}, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let { ...x } = tmpParamDefault === undefined ? $({ a: 'fail' }) : tmpParamDefault;
  return x;
};
$(f({}, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'fail' };
    bindingPatternObjRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, bindingPatternObjRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, bindingPatternObjRoot$2, tmpIfTest$2) {
    bindingPatternObjRoot$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, bindingPatternObjRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, bindingPatternObjRoot$3, tmpIfTest$3) {
    const tmpCallCallee$2 = objPatternRest;
    const tmpCalleeParam$2 = bindingPatternObjRoot$3;
    const tmpCalleeParam$3 = [];
    const tmpCalleeParam$4 = 'x';
    let x$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4);
    return x$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamDefault, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee$3 = $;
const tmpCallCallee$4 = f;
const tmpCalleeParam$6 = {};
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$5 = tmpCallCallee$4(tmpCalleeParam$6, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternObjRoot$3) {
    const tmpCalleeParam$3 = [];
    const x$1 = objPatternRest(bindingPatternObjRoot$3, tmpCalleeParam$3, 'x');
    return x$1;
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { a: 'fail' };
    const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$6 = {};
const tmpCalleeParam$5 = f(tmpCalleeParam$6, 10);
$(tmpCalleeParam$5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
