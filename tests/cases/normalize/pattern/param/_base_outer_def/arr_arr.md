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
let i = function (tmpParamDefault) {
  let [[x]] = tmpParamDefault === undefined ? c : tmpParamDefault;
  return x;
};
`````

## Normalized

`````js filename=intro
let i = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternArrRoot$1, tmpIfTest$1) {
    bindingPatternArrRoot$1 = c;
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, bindingPatternArrRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, bindingPatternArrRoot$2, tmpIfTest$2) {
    bindingPatternArrRoot$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, bindingPatternArrRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, bindingPatternArrRoot$3, tmpIfTest$3) {
    let arrPatternSplat$2 = [...bindingPatternArrRoot$3];
    let arrPatternStep$1 = arrPatternSplat$2[0];
    let arrPatternSplat$3 = [...arrPatternStep$1];
    let x$1 = arrPatternSplat$3[0];
    return x$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamDefault, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamDefault, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$3;
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
