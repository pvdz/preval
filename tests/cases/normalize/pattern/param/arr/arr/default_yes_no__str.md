# Preval test case

# default_yes_no__str.md

> Normalize > Pattern > Param > Arr > Arr > Default yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])]) {
  return 'ok';
}
$(f('abc', 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[] = $(['fail2'])] = tmpParamBare;
  return 'ok';
};
$(f('abc', 200));
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
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$1 = $$0;
    let bindingPatternArrRoot$1 = $$1;
    let arrPatternSplat$3 = $$2;
    let arrPatternBeforeDefault$1 = $$3;
    let arrPatternStep$1 = $$4;
    let tmpIfTest$1 = $$5;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['fail2'];
    arrPatternStep$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$3,
      arrPatternBeforeDefault$1,
      arrPatternStep$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$5 = $$2;
    let arrPatternBeforeDefault$3 = $$3;
    let arrPatternStep$3 = $$4;
    let tmpIfTest$3 = $$5;
    debugger;
    arrPatternStep$3 = arrPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternArrRoot$3,
      arrPatternSplat$5,
      arrPatternBeforeDefault$3,
      arrPatternStep$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let arrPatternSplat$7 = $$2;
    let arrPatternBeforeDefault$5 = $$3;
    let arrPatternStep$5 = $$4;
    let tmpIfTest$5 = $$5;
    debugger;
    let arrPatternSplat$9 = [...arrPatternStep$5];
    return 'ok';
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(
      tmpParamBare,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f('abc', 200);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const arrPatternStep$5 = $$0;
  debugger;
  [...arrPatternStep$5];
  return 'ok';
};
const f = function () {
  debugger;
  const arrPatternSplat = ['a', 'b', 'c'];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['fail2'];
    const tmpSSA_arrPatternStep$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpSSA_arrPatternStep$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$5 = tmpBranchingC(arrPatternBeforeDefault);
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
