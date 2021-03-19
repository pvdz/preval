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
const f = (tmpParamDefault) => {
  let a = tmpParamDefault === undefined ? ([x] = [100]) : tmpParamDefault;
  return $(a);
};
f();
`````

## Normalized

`````js filename=intro
const f = function (tmpParamDefault) {
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, a$1, tmpIfTest$1) {
    const tmpNestedAssignArrPatternRhs$1 = [100];
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
    x = arrPatternSplat$1[0];
    a$1 = tmpNestedAssignArrPatternRhs$1;
    const tmpReturnArg$2 = tmpBranchingC(tmpParamDefault$1, a$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpParamDefault$2, a$2, tmpIfTest$2) {
    a$2 = tmpParamDefault$2;
    const tmpReturnArg$3 = tmpBranchingC(tmpParamDefault$2, a$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function (tmpParamDefault$3, a$3, tmpIfTest$3) {
    const tmpReturnArg$1 = $(a$3);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpParamDefault, a, tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamDefault, a, tmpIfTest);
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
