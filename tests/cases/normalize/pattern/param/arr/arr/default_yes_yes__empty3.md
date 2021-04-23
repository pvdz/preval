# Preval test case

# default_yes_yes__empty3.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  empty3
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
let f = function (tmpParamBare) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let arrPatternSplat$1 = undefined;
  if (tmpIfTest) {
    arrPatternBeforeDefault = ['pass3'][0];
    arrPatternStep = arrPatternBeforeDefault === undefined ? ['fail2'] : arrPatternBeforeDefault;
    arrPatternSplat$1 = [...arrPatternStep];
    return 'ok';
  } else {
  }
};
$(f());

`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let arrPatternSplat$1 = undefined;
  if (tmpIfTest) {
    arrPatternBeforeDefault = ['pass3'][0];
    arrPatternStep = arrPatternBeforeDefault === undefined ? ['fail2'] : arrPatternBeforeDefault;
    arrPatternSplat$1 = [...arrPatternStep];
    return 'ok';
  } else {
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let arrPatternSplat$1 = undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpAssignRhsProp$1 = ['pass3'];
    arrPatternBeforeDefault = tmpAssignRhsProp$1[0];
    const tmpIfTest$3 = arrPatternBeforeDefault === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      arrPatternStep = ['fail2'];
      const tmpReturnArg = tmpBranchingC$1();
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      arrPatternStep = arrPatternBeforeDefault;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      arrPatternSplat$1 = [...arrPatternStep];
      return 'ok';
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1();
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$7 = tmpBranchingC();
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$9 = tmpBranchingA();
    return tmpReturnArg$9;
  } else {
    const tmpReturnArg$11 = tmpBranchingB();
    return tmpReturnArg$11;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let arrPatternStep = undefined;
const tmpBranchingC$1 = function () {
  debugger;
  [...arrPatternStep];
  return undefined;
};
const tmpAssignRhsProp$1 = ['pass3'];
const tmpssa3_arrPatternBeforeDefault = tmpAssignRhsProp$1[0];
const tmpIfTest$3 = tmpssa3_arrPatternBeforeDefault === undefined;
if (tmpIfTest$3) {
  arrPatternStep = ['fail2'];
  tmpBranchingC$1();
} else {
  arrPatternStep = tmpssa3_arrPatternBeforeDefault;
  tmpBranchingC$1();
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
