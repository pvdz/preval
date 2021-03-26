# Preval test case

# arr_arr.md

> Normalize > Pattern > Param > Base outer def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i([[ x ]] = c ) { return x }
`````

## Pre Normal

`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x]] = tmpParamBare === undefined ? c : tmpParamBare;
  return x;
};
`````

## Normalized

`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    bindingPatternArrRoot$1 = c;
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternArrRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    bindingPatternArrRoot$3 = tmpParamBare$3;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$3, bindingPatternArrRoot$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    let arrPatternSplat$3 = [...bindingPatternArrRoot$5];
    let arrPatternStep$1 = arrPatternSplat$3[0];
    let arrPatternSplat$5 = [...arrPatternStep$1];
    let x$1 = arrPatternSplat$5[0];
    return x$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamBare, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$5;
  }
};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
