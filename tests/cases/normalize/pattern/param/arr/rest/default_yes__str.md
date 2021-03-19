# Preval test case

# default_yes__str.md

> Normalize > Pattern > Param > Arr > Rest > Default yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x] = $(['fail'])) {
  return x;
}
$(f('abc', 200));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let [...x] = tmpParamDefault === undefined ? $(['fail']) : tmpParamDefault;
  return x;
};
$(f('abc', 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, bindingPatternArrRoot$1, tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = ['fail'];
    bindingPatternArrRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, bindingPatternArrRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, bindingPatternArrRoot$2, tmpIfTest$2) {
    bindingPatternArrRoot$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, bindingPatternArrRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, bindingPatternArrRoot$3, tmpIfTest$3) {
    let arrPatternSplat$1 = [...bindingPatternArrRoot$3];
    let x$1 = arrPatternSplat$1.slice(0);
    return x$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamDefault, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamDefault, bindingPatternArrRoot, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f('abc', 200);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (bindingPatternArrRoot$3) {
    const arrPatternSplat$1 = [...bindingPatternArrRoot$3];
    const x$1 = arrPatternSplat$1.slice(0);
    return x$1;
  };
  if (tmpIfTest) {
    const tmpCalleeParam$1 = ['fail'];
    const SSA_bindingPatternArrRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternArrRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$2 = f('abc', 200);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
