# Preval test case

# default_yes_no_no__arr_empty.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes no no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') }]) {
  return 'bad';
}
$(f([], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ x: x = $('pass') }] = tmpParamBare;
  return 'bad';
};
$(f([], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function () {
    debugger;
    x = $('pass');
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    x = objPatternBeforeDefault;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    return 'bad';
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = [];
const arrPatternSplat = [...tmpCalleeParam$1];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $('pass');
} else {
}
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
