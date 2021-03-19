# Preval test case

# arr_arr.md

> Normalize > Pattern > Param > Base inner def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i([[ x = a ]]) { return x }
`````

## Pre Normal

`````js filename=intro
let i = function (tmpParamPattern) {
  let [[x = a]] = tmpParamPattern;
  return x;
};
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternArrRoot$1,
    arrPatternSplat$2,
    arrPatternStep$1,
    arrPatternSplat$3,
    arrPatternBeforeDefault$1,
    x$1,
    tmpIfTest$1,
  ) {
    x$1 = a;
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$2,
      arrPatternStep$1,
      arrPatternSplat$3,
      arrPatternBeforeDefault$1,
      x$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternArrRoot$2,
    arrPatternSplat$4,
    arrPatternStep$2,
    arrPatternSplat$5,
    arrPatternBeforeDefault$2,
    x$2,
    tmpIfTest$2,
  ) {
    x$2 = arrPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$4,
      arrPatternStep$2,
      arrPatternSplat$5,
      arrPatternBeforeDefault$2,
      x$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternArrRoot$3,
    arrPatternSplat$6,
    arrPatternStep$3,
    arrPatternSplat$7,
    arrPatternBeforeDefault$3,
    x$3,
    tmpIfTest$3,
  ) {
    return x$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternBeforeDefault,
      x,
      tmpIfTest,
    );
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternBeforeDefault,
      x,
      tmpIfTest,
    );
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
