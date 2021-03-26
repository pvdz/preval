# Preval test case

# default_yes__empty.md

> Normalize > Pattern > Param > Arr > Rest > Default yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x] = $(['pass'])) {
  return x;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [...x] = tmpParamBare === undefined ? $(['pass']) : tmpParamBare;
  return x;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['pass'];
    bindingPatternArrRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
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
    let arrPatternSplat$1 = [...bindingPatternArrRoot$5];
    let x$1 = arrPatternSplat$1.slice(0);
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
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = ['pass'];
const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...SSA_bindingPatternArrRoot$1];
const x$1 = arrPatternSplat$1.slice(0);
$(x$1);
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
