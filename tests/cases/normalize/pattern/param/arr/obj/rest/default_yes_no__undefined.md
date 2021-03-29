# Preval test case

# default_yes_no__undefined.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return 'bad';
}
$(f(undefined, 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{ ...x } = $({ a: 'fail' })] = tmpParamBare;
  return 'bad';
};
$(f(undefined, 200));
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
    let arrPatternSplat$1 = $$2;
    let arrPatternBeforeDefault$1 = $$3;
    let arrPatternStep$1 = $$4;
    let tmpIfTest$1 = $$5;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'fail' };
    arrPatternStep$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$1,
      arrPatternBeforeDefault$1,
      arrPatternStep$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$3 = $$0;
    let bindingPatternArrRoot$3 = $$1;
    let arrPatternSplat$3 = $$2;
    let arrPatternBeforeDefault$3 = $$3;
    let arrPatternStep$3 = $$4;
    let tmpIfTest$3 = $$5;
    debugger;
    arrPatternStep$3 = arrPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternArrRoot$3,
      arrPatternSplat$3,
      arrPatternBeforeDefault$3,
      arrPatternStep$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpParamBare$5 = $$0;
    let bindingPatternArrRoot$5 = $$1;
    let arrPatternSplat$5 = $$2;
    let arrPatternBeforeDefault$5 = $$3;
    let arrPatternStep$5 = $$4;
    let tmpIfTest$5 = $$5;
    debugger;
    const tmpCallCallee$3 = objPatternRest;
    const tmpCalleeParam$3 = arrPatternStep$5;
    const tmpCalleeParam$5 = [];
    const tmpCalleeParam$7 = undefined;
    let x$1 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
    return 'bad';
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
const tmpCallCallee$5 = $;
const tmpCalleeParam$9 = f(undefined, 200);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const arrPatternStep$5 = $$0;
  debugger;
  const tmpCalleeParam$5 = [];
  objPatternRest(arrPatternStep$5, tmpCalleeParam$5, undefined);
  return 'bad';
};
const f = function () {
  debugger;
  const arrPatternSplat = [...undefined];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { a: 'fail' };
    const SSA_arrPatternStep$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_arrPatternStep$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$5 = tmpBranchingC(arrPatternBeforeDefault);
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam$9 = f();
$(tmpCalleeParam$9);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
