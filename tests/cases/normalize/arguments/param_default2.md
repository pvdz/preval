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
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpArgumentsAny$1 = $$0;
    let tmpParamBare$1 = $$1;
    let a$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    a$1 = tmpArgumentsAny$1;
    const tmpReturnArg = tmpBranchingC(tmpArgumentsAny$1, tmpParamBare$1, a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpArgumentsAny$2 = $$0;
    let tmpParamBare$2 = $$1;
    let a$2 = $$2;
    let tmpIfTest$2 = $$3;
    debugger;
    a$2 = tmpParamBare$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpArgumentsAny$2, tmpParamBare$2, a$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpArgumentsAny$3 = $$0;
    let tmpParamBare$3 = $$1;
    let a$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    return a$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpArgumentsAny, tmpParamBare, a, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpArgumentsAny, tmpParamBare, a, tmpIfTest);
    return tmpReturnArg$3;
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
