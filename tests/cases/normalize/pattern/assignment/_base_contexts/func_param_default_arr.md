# Preval test case

# func_param_default_arr.md

> Normalize > Pattern > Assignment > Base contexts > Func param default arr
>
> Testing simple pattern normalizations

#TODO: arrow

## Input

`````js filename=intro
const f = (a = [ x ] = [100]) => { return $(a) };
f();
`````

## Pre Normal

`````js filename=intro
const f = ($$0) => {
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? ([x] = [100]) : tmpParamBare;
  return $(a);
};
f();
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpNestedAssignArrPatternRhs$1 = [100];
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
    x = arrPatternSplat$1[0];
    a = tmpNestedAssignArrPatternRhs$1;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingB = function () {
    debugger;
    a = tmpParamBare;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function () {
    debugger;
    tmpReturnArg = $(a);
    return tmpReturnArg;
  };
  let tmpReturnArg = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA();
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB();
    return tmpReturnArg$7;
  }
};
f();
`````

## Output

`````js filename=intro
const tmpNestedAssignArrPatternRhs$1 = [100];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
x = arrPatternSplat$1[0];
$(tmpNestedAssignArrPatternRhs$1);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
