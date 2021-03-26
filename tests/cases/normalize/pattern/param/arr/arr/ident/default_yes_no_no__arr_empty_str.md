# Preval test case

# default_yes_no_no__arr_empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes no no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('pass')]]) {
  return x;
}
$(f(['', 4, 5], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x = $('pass')]] = tmpParamBare;
  return x;
};
$(f(['', 4, 5], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let arrPatternSplat$3 = $$2;
    let arrPatternStep$1 = $$3;
    let arrPatternSplat$5 = $$4;
    let arrPatternBeforeDefault$1 = $$5;
    let x$1 = $$6;
    let tmpIfTest$1 = $$7;
    debugger;
    x$1 = $('pass');
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$3,
      arrPatternStep$1,
      arrPatternSplat$5,
      arrPatternBeforeDefault$1,
      x$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$7 = $$2;
    let arrPatternStep$3 = $$3;
    let arrPatternSplat$9 = $$4;
    let arrPatternBeforeDefault$3 = $$5;
    let x$3 = $$6;
    let tmpIfTest$3 = $$7;
    debugger;
    x$3 = arrPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternArrRoot$3,
      arrPatternSplat$7,
      arrPatternStep$3,
      arrPatternSplat$9,
      arrPatternBeforeDefault$3,
      x$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let arrPatternSplat$11 = $$2;
    let arrPatternStep$5 = $$3;
    let arrPatternSplat$13 = $$4;
    let arrPatternBeforeDefault$5 = $$5;
    let x$5 = $$6;
    let tmpIfTest$5 = $$7;
    debugger;
    return x$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternBeforeDefault,
      x,
      tmpIfTest,
    );
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternStep,
      arrPatternSplat$1,
      arrPatternBeforeDefault,
      x,
      tmpIfTest,
    );
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = ['', 4, 5];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const arrPatternSplat = [...tmpParamBare];
  const arrPatternStep = arrPatternSplat[0];
  const arrPatternSplat$1 = [...arrPatternStep];
  const arrPatternBeforeDefault = arrPatternSplat$1[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpReturnArg$3 = $('pass');
    return tmpReturnArg$3;
  } else {
    return arrPatternBeforeDefault;
  }
};
const tmpCalleeParam$1 = ['', 4, 5];
const tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
