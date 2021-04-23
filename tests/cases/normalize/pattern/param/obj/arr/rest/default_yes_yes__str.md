# Preval test case

# default_yes_yes__str.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default yes yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] = $(['pass']) } = $({ x: ['fail2'] })) {
  return y;
}
$(f('abc', 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [...y] = $(['pass']) } = tmpParamBare === undefined ? $({ x: ['fail2'] }) : tmpParamBare;
  return y;
};
$(f('abc', 10));
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
    const tmpObjLitVal$1 = ['fail2'];
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
      const tmpCalleeParam$5 = ['pass'];
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
      arrPatternSplat = [...objPatternAfterDefault];
      y = arrPatternSplat.slice(0);
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
  let arrPatternSplat = undefined;
  let y = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f('abc', 10);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let objPatternAfterDefault = undefined;
  const tmpBranchingC$1 = function () {
    debugger;
    const tmpssa2_arrPatternSplat = [...objPatternAfterDefault];
    const tmpssa2_y = tmpssa2_arrPatternSplat.slice(0);
    return tmpssa2_y;
  };
  const tmpssa3_objPatternBeforeDefault = 'abc'.x;
  const tmpIfTest$1 = tmpssa3_objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = ['pass'];
    objPatternAfterDefault = $(tmpCalleeParam$1);
    const tmpReturnArg$1 = tmpBranchingC$1();
    return tmpReturnArg$1;
  } else {
    objPatternAfterDefault = tmpssa3_objPatternBeforeDefault;
    const tmpReturnArg$4 = tmpBranchingC$1();
    return tmpReturnArg$4;
  }
};
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
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
