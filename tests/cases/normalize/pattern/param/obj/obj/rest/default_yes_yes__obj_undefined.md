# Preval test case

# default_yes_yes__obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { ...y } = $({ a: 'pass' }) } = tmpParamBare === undefined ? $({ x: { a: 'fail2' } }) : tmpParamBare;
  return y;
};
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$1 = $;
    const tmpObjLitVal$1 = { a: 'fail2' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    bindingPatternObjRoot = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    bindingPatternObjRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    objPatternBeforeDefault = bindingPatternObjRoot.x;
    const tmpIfTest$1 = objPatternBeforeDefault === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = { a: 'pass' };
      objPatternAfterDefault = tmpCallCallee$5(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      objPatternAfterDefault = objPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpCallCallee$7 = objPatternRest;
      const tmpCalleeParam$7 = objPatternAfterDefault;
      const tmpCalleeParam$9 = [];
      const tmpCalleeParam$11 = undefined;
      y = tmpCallCallee$7(tmpCalleeParam$7, tmpCalleeParam$9, tmpCalleeParam$11);
      return y;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  let objPatternBeforeDefault = undefined;
  let objPatternAfterDefault = undefined;
  let y = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$9 = $;
const tmpCallCallee$11 = f;
const tmpCalleeParam$15 = { x: undefined, b: 11, c: 12 };
const tmpCalleeParam$17 = 10;
const tmpCalleeParam$13 = tmpCallCallee$11(tmpCalleeParam$15, tmpCalleeParam$17);
tmpCallCallee$9(tmpCalleeParam$13);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpBranchingC$1 = function () {
    debugger;
    const tmpCalleeParam$7 = objPatternAfterDefault;
    const tmpCalleeParam$9 = [];
    y = objPatternRest(tmpCalleeParam$7, tmpCalleeParam$9, undefined);
    return y;
  };
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function () {
    debugger;
    objPatternBeforeDefault = bindingPatternObjRoot.x;
    const tmpIfTest$1 = objPatternBeforeDefault === undefined;
    if (tmpIfTest$1) {
      const tmpCalleeParam$5 = { a: 'pass' };
      objPatternAfterDefault = $(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    }
  };
  let objPatternBeforeDefault = undefined;
  let objPatternAfterDefault = undefined;
  let y = undefined;
  if (tmpIfTest) {
    const tmpObjLitVal$1 = { a: 'fail2' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    bindingPatternObjRoot = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    bindingPatternObjRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$15 = { x: undefined, b: 11, c: 12 };
const tmpCalleeParam$13 = f(tmpCalleeParam$15);
$(tmpCalleeParam$13);
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
