# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'pass' })]) {
  return x;
}
$(f('', 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [{ ...x } = $({ a: 'pass' })] = tmpParamPattern;
  return x;
};
$(f('', 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingA = function (
    tmpParamPattern$1,
    bindingPatternArrRoot$1,
    arrPatternSplat$1,
    arrPatternBeforeDefault$1,
    arrPatternStep$1,
    tmpIfTest$1,
  ) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'pass' };
    arrPatternStep$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$1,
      arrPatternBeforeDefault$1,
      arrPatternStep$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternArrRoot$2,
    arrPatternSplat$2,
    arrPatternBeforeDefault$2,
    arrPatternStep$2,
    tmpIfTest$2,
  ) {
    arrPatternStep$2 = arrPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$2,
      arrPatternBeforeDefault$2,
      arrPatternStep$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternArrRoot$3,
    arrPatternSplat$3,
    arrPatternBeforeDefault$3,
    arrPatternStep$3,
    tmpIfTest$3,
  ) {
    const tmpCallCallee$2 = objPatternRest;
    const tmpCalleeParam$2 = arrPatternStep$3;
    const tmpCalleeParam$3 = [];
    const tmpCalleeParam$4 = undefined;
    let x$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4);
    return x$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(
      tmpParamPattern,
      bindingPatternArrRoot,
      arrPatternSplat,
      arrPatternBeforeDefault,
      arrPatternStep,
      tmpIfTest,
    );
    return tmpReturnArg$3;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$5 = f('', 200);
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingC = function (arrPatternStep$3) {
    const tmpCalleeParam$3 = [];
    const x$1 = objPatternRest(arrPatternStep$3, tmpCalleeParam$3, undefined);
    return x$1;
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = { a: 'pass' };
    const SSA_arrPatternStep$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_arrPatternStep$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(arrPatternBeforeDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$5 = f('', 200);
$(tmpCalleeParam$5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
