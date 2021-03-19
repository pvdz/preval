# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) }) {
  return y;
}
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x: { ...y } = $({ a: 'pass' }) } = tmpParamPattern;
  return y;
};
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternObjRoot$1,
    objPatternBeforeDefault$1,
    objPatternAfterDefault$1,
    tmpIfTest$1,
  ) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'pass' };
    objPatternAfterDefault$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternObjRoot$1,
      objPatternBeforeDefault$1,
      objPatternAfterDefault$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternObjRoot$2,
    objPatternBeforeDefault$2,
    objPatternAfterDefault$2,
    tmpIfTest$2,
  ) {
    objPatternAfterDefault$2 = objPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternObjRoot$2,
      objPatternBeforeDefault$2,
      objPatternAfterDefault$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternObjRoot$3,
    objPatternBeforeDefault$3,
    objPatternAfterDefault$3,
    tmpIfTest$3,
  ) {
    const tmpCallCallee$2 = objPatternRest;
    const tmpCalleeParam$2 = objPatternAfterDefault$3;
    const tmpCalleeParam$3 = [];
    const tmpCalleeParam$4 = undefined;
    let y$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4);
    return y$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternBeforeDefault,
      objPatternAfterDefault,
      tmpIfTest,
    );
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternObjRoot,
      objPatternBeforeDefault,
      objPatternAfterDefault,
      tmpIfTest,
    );
    return tmpReturnArg$3;
  }
};
const tmpCallCallee$3 = $;
const tmpCallCallee$4 = f;
const tmpCalleeParam$6 = { x: undefined, b: 11, c: 12 };
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$5 = tmpCallCallee$4(tmpCalleeParam$6, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingC = function (objPatternAfterDefault$3) {
    const tmpCalleeParam$3 = [];
    const y$1 = objPatternRest(objPatternAfterDefault$3, tmpCalleeParam$3, undefined);
    return y$1;
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { a: 'pass' };
    const SSA_objPatternAfterDefault$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_objPatternAfterDefault$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(objPatternBeforeDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$6 = { x: undefined, b: 11, c: 12 };
const tmpCalleeParam$5 = f(tmpCalleeParam$6, 10);
$(tmpCalleeParam$5);
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
