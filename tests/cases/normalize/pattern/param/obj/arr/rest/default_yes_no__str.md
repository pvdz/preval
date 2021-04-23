# Preval test case

# default_yes_no__str.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] = $(['pass']) }) {
  return y;
}
$(f('abc', 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [...y] = $(['pass']) } = tmpParamBare;
  return y;
};
$(f('abc', 10));
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
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['pass'];
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    objPatternAfterDefault = objPatternBeforeDefault;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    arrPatternSplat = [...objPatternAfterDefault];
    y = arrPatternSplat.slice(0);
    return y;
  };
  let arrPatternSplat = undefined;
  let y = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f('abc', 10);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const objPatternBeforeDefault = 'abc'.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingC = function () {
    debugger;
    const tmpssa2_arrPatternSplat = [...objPatternAfterDefault];
    const tmpssa2_y = tmpssa2_arrPatternSplat.slice(0);
    return tmpssa2_y;
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['pass'];
    objPatternAfterDefault = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass']
 - 2: ['pass']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
