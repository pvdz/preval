# Preval test case

# default_yes_no__0.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x] = $('fail')]) {
  return 'bad';
}
$(f(0, 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[...x] = $('fail')] = tmpParamBare;
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
    arrPatternStep = $('fail');
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
    arrPatternSplat$1 = [...arrPatternStep];
    x = arrPatternSplat$1.slice(0);
    return 'bad';
  };
  let arrPatternSplat$1 = undefined;
  let x = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(0, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...0];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
const tmpBranchingC = function () {
  debugger;
  arrPatternSplat$1 = [...arrPatternStep];
  arrPatternSplat$1.slice(0);
  return 'bad';
};
let arrPatternSplat$1 = undefined;
if (tmpIfTest) {
  arrPatternStep = $('fail');
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
