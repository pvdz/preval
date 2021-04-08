# Preval test case

# param_default2.md

> Normalize > Arguments > Param default2
>
> The `arguments` object is a valid default expression

#TODO

## Input

`````js filename=intro
const f = function(a = arguments) {
  return a;
};
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  const tmpArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? tmpArgumentsAny : tmpParamBare;
  return a;
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  const tmpArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    a = tmpArgumentsAny;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    a = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    return a;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    return tmpArgumentsAny;
  } else {
    return tmpParamBare;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
