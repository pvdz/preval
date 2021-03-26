# Preval test case

# param_default.md

> Normalize > Arguments > Param default
>
> The `arguments` object is a valid default expression

#TODO

## Input

`````js filename=intro
function f(a = arguments) {
  return a;
}
$(f(1, 2, 3));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? tmpArgumentsAny : tmpParamBare;
  return a;
};
$(f(1, 2, 3));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
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
    let tmpArgumentsAny$3 = $$0;
    let tmpParamBare$3 = $$1;
    let a$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    a$3 = tmpParamBare$3;
    const tmpReturnArg$1 = tmpBranchingC(tmpArgumentsAny$3, tmpParamBare$3, a$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpArgumentsAny$5 = $$0;
    let tmpParamBare$5 = $$1;
    let a$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    return a$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpArgumentsAny, tmpParamBare, a, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpArgumentsAny, tmpParamBare, a, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 2, 3);
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
const tmpCalleeParam = f(1, 2, 3);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
