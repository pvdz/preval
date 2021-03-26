# Preval test case

# arr.md

> Normalize > Pattern > Param > Base inner def > Arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f([ x = a ]) { return x }
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [x = a] = tmpParamBare;
  return x;
};
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let arrPatternSplat$1 = $$2;
    let arrPatternBeforeDefault$1 = $$3;
    let x$1 = $$4;
    let tmpIfTest$1 = $$5;
    debugger;
    x$1 = a;
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$1,
      arrPatternBeforeDefault$1,
      x$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$3 = $$2;
    let arrPatternBeforeDefault$3 = $$3;
    let x$3 = $$4;
    let tmpIfTest$3 = $$5;
    debugger;
    x$3 = arrPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternArrRoot$3,
      arrPatternSplat$3,
      arrPatternBeforeDefault$3,
      x$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let arrPatternSplat$5 = $$2;
    let arrPatternBeforeDefault$5 = $$3;
    let x$5 = $$4;
    let tmpIfTest$5 = $$5;
    debugger;
    return x$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpParamBare, bindingPatternArrRoot, arrPatternSplat, arrPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamBare, bindingPatternArrRoot, arrPatternSplat, arrPatternBeforeDefault, x, tmpIfTest);
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
