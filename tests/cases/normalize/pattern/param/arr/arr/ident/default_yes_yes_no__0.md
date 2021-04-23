# Preval test case

# default_yes_yes_no__0.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])]) {
  return 'bad';
}
$(f(0, 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x = $('fail')] = $(['fail2'])] = tmpParamBare;
  return 'bad';
};
$(f(0, 200));
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
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['fail2'];
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    arrPatternStep = arrPatternBeforeDefault;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    arrPatternSplat$1 = [...arrPatternStep];
    arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
    const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      x = $('fail');
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      x = arrPatternBeforeDefault$1;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      return 'bad';
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  let arrPatternSplat$1 = undefined;
  let arrPatternBeforeDefault$1 = undefined;
  let x = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(0, 200);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...0];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
const tmpBranchingC = function () {
  debugger;
  const tmpSSA_tmpssa2_arrPatternSplat$1 = [...arrPatternStep];
  const tmpSSA_tmpssa3_arrPatternBeforeDefault$1 = tmpSSA_tmpssa2_arrPatternSplat$1[0];
  const tmpIfTest$1 = tmpSSA_tmpssa3_arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    $('fail');
    return undefined;
  } else {
    return undefined;
  }
};
if (tmpIfTest) {
  const tmpCalleeParam$1 = ['fail2'];
  arrPatternStep = $(tmpCalleeParam$1);
  tmpBranchingC();
} else {
  arrPatternStep = arrPatternBeforeDefault;
  tmpBranchingC();
}
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
