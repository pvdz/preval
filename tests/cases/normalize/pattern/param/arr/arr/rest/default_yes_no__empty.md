# Preval test case

# default_yes_no__empty.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x] = $('fail')]) {
  return 'bad';
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [[...x] = $('fail')] = tmpParamPattern;
  return 'bad';
};
$(f());
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
    arrPatternSplat$2,
    arrPatternBeforeDefault$1,
    arrPatternStep$1,
    tmpIfTest$1,
  ) {
    arrPatternStep$1 = $('fail');
    const tmpReturnArg = tmpBranchingC(
      tmpParamPattern$1,
      bindingPatternArrRoot$1,
      arrPatternSplat$2,
      arrPatternBeforeDefault$1,
      arrPatternStep$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function (
    tmpParamPattern$2,
    bindingPatternArrRoot$2,
    arrPatternSplat$3,
    arrPatternBeforeDefault$2,
    arrPatternStep$2,
    tmpIfTest$2,
  ) {
    arrPatternStep$2 = arrPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamPattern$2,
      bindingPatternArrRoot$2,
      arrPatternSplat$3,
      arrPatternBeforeDefault$2,
      arrPatternStep$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (
    tmpParamPattern$3,
    bindingPatternArrRoot$3,
    arrPatternSplat$4,
    arrPatternBeforeDefault$3,
    arrPatternStep$3,
    tmpIfTest$3,
  ) {
    let arrPatternSplat$5 = [...arrPatternStep$3];
    let x$1 = arrPatternSplat$5.slice(0);
    return 'bad';
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
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  const tmpBranchingC = function (arrPatternStep$3) {
    const arrPatternSplat$5 = [...arrPatternStep$3];
    arrPatternSplat$5.slice(0);
    return 'bad';
  };
  if (tmpIfTest) {
    const SSA_arrPatternStep$1 = $('fail');
    const tmpReturnArg = tmpBranchingC(SSA_arrPatternStep$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(arrPatternBeforeDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
