# Preval test case

# default_yes_yes__arr_empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])] = $(['fail3'])) {
  return 'ok';
}
$(f(['', 4, 5], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[] = $(['fail2'])] = tmpParamBare === undefined ? $(['fail3']) : tmpParamBare;
  return 'ok';
};
$(f(['', 4, 5], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['fail3'];
    bindingPatternArrRoot = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    bindingPatternArrRoot = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    arrPatternSplat = [...bindingPatternArrRoot];
    arrPatternBeforeDefault = arrPatternSplat[0];
    const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = ['fail2'];
      arrPatternStep = tmpCallCallee$5(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      arrPatternStep = arrPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      arrPatternSplat$1 = [...arrPatternStep];
      return 'ok';
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let arrPatternSplat$1 = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$7 = $;
const tmpCallCallee$9 = f;
const tmpCalleeParam$9 = ['', 4, 5];
const tmpCalleeParam$11 = 200;
const tmpCalleeParam$7 = tmpCallCallee$9(tmpCalleeParam$9, tmpCalleeParam$11);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const tmpCalleeParam$9 = ['', 4, 5];
const tmpBranchingC$1 = function () {
  debugger;
  [...arrPatternStep];
  return undefined;
};
let bindingPatternArrRoot = undefined;
const tmpIfTest = tmpCalleeParam$9 === undefined;
let arrPatternStep = undefined;
const tmpBranchingC = function () {
  debugger;
  const tmpSSA_tmpssa2_arrPatternSplat = [...bindingPatternArrRoot];
  const tmpSSA_tmpssa3_arrPatternBeforeDefault = tmpSSA_tmpssa2_arrPatternSplat[0];
  const tmpIfTest$1 = tmpSSA_tmpssa3_arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$5 = ['fail2'];
    arrPatternStep = $(tmpCalleeParam$5);
    tmpBranchingC$1();
    return undefined;
  } else {
    arrPatternStep = tmpSSA_tmpssa3_arrPatternBeforeDefault;
    tmpBranchingC$1();
    return undefined;
  }
};
if (tmpIfTest) {
  const tmpCalleeParam$1 = ['fail3'];
  bindingPatternArrRoot = $(tmpCalleeParam$1);
  tmpBranchingC();
} else {
  bindingPatternArrRoot = tmpCalleeParam$9;
  tmpBranchingC();
}
$('ok');
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
