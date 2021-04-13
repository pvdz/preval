# Preval test case

# default_yes_no__0.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return 'bad';
}
$(f(0, 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: 'fail' })] = tmpParamBare;
  return 'bad';
};
$(f(0, 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'fail' };
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    arrPatternStep = arrPatternBeforeDefault;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpCallCallee$3 = objPatternRest;
    const tmpCalleeParam$3 = arrPatternStep;
    const tmpCalleeParam$5 = [];
    const tmpCalleeParam$7 = undefined;
    x = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
    return 'bad';
  };
  let x = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$5 = $;
const tmpCalleeParam$9 = f(0, 200);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...0];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
const tmpBranchingC = function () {
  debugger;
  const tmpCalleeParam$3 = arrPatternStep;
  const tmpCalleeParam$5 = [];
  objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
  return 'bad';
};
if (tmpIfTest) {
  const tmpCalleeParam$1 = { a: 'fail' };
  arrPatternStep = $(tmpCalleeParam$1);
  tmpBranchingC();
} else {
  arrPatternStep = arrPatternBeforeDefault;
  tmpBranchingC();
}
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
