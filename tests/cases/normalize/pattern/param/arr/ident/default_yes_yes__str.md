# Preval test case

# default_yes_yes__str.md

> Normalize > Pattern > Param > Arr > Ident > Default yes yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('fail')] = $('fail2')) {
  return x;
}
$(f('xyz', 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [x = $('fail')] = tmpParamBare === undefined ? $('fail2') : tmpParamBare;
  return x;
};
$(f('xyz', 200));
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
    bindingPatternArrRoot = $('fail2');
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
      x = $('fail');
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      x = arrPatternBeforeDefault;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      return x;
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
  let x = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('xyz', 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpssa2_arrPatternSplat = ['x', 'y', 'z'];
  const tmpssa3_arrPatternBeforeDefault = tmpssa2_arrPatternSplat[0];
  const tmpIfTest$1 = tmpssa3_arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpReturnArg = $('fail');
    return tmpReturnArg;
  } else {
    return tmpssa3_arrPatternBeforeDefault;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
