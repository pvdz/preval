# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Param > Obj > Arr > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) }) {
  return 'ok';
}
$(f({ x: undefined, a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [] = $(['fail']) } = tmpParamBare;
  return 'ok';
};
$(f({ x: undefined, a: 11, b: 12 }, 10));
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
    const tmpCalleeParam$1 = ['fail'];
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
    return 'ok';
  };
  let arrPatternSplat = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = { x: undefined, a: 11, b: 12 };
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const tmpCalleeParam$5 = { x: undefined, a: 11, b: 12 };
const objPatternBeforeDefault = tmpCalleeParam$5.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
const tmpBranchingC = function () {
  debugger;
  [...objPatternAfterDefault];
  return undefined;
};
if (tmpIfTest) {
  const tmpCalleeParam$1 = ['fail'];
  objPatternAfterDefault = $(tmpCalleeParam$1);
  tmpBranchingC();
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
  tmpBranchingC();
}
$('ok');
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
