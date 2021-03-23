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
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let a$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpNestedAssignArrPatternRhs$1 = [100];
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
    x = arrPatternSplat$1[0];
    a$1 = tmpNestedAssignArrPatternRhs$1;
    const tmpReturnArg$2 = tmpBranchingC(tmpParamBare$1, a$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let a$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    a$2 = tmpParamBare$2;
    const tmpReturnArg$3 = tmpBranchingC(tmpParamBare$2, a$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let a$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$1 = $(a$3);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpParamBare, a, tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamBare, a, tmpIfTest);
    return tmpReturnArg$5;
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
