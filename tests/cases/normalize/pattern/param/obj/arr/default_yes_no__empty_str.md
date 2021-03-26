# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) }) {
  return 'ok';
}
$(f('', 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [] = $(['fail']) } = tmpParamBare;
  return 'ok';
};
$(f('', 10));
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
    const tmpCalleeParam$1 = ['fail'];
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
    return 'ok';
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f('', 10);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const objPatternBeforeDefault = ''.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingC = function ($$0) {
    const objPatternAfterDefault$5 = $$0;
    debugger;
    [...objPatternAfterDefault$5];
    return 'ok';
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['fail'];
    const SSA_objPatternAfterDefault$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_objPatternAfterDefault$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$5 = tmpBranchingC(objPatternBeforeDefault);
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['fail']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
