# Preval test case

# param_default.md

> Normalize > This > Param default
>
> The `this` object is a valid default expression

#TODO

## Input

`````js filename=intro
function f(a = this) {
  return a;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpthis = this;
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? tmpthis : tmpParamBare;
  return a;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpthis = this;
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpthis$1 = $$0;
    let tmpParamBare$1 = $$1;
    let a$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    a$1 = tmpthis$1;
    const tmpReturnArg = tmpBranchingC(tmpthis$1, tmpParamBare$1, a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpthis$3 = $$0;
    let tmpParamBare$3 = $$1;
    let a$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    a$3 = tmpParamBare$3;
    const tmpReturnArg$1 = tmpBranchingC(tmpthis$3, tmpParamBare$3, a$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpthis$5 = $$0;
    let tmpParamBare$5 = $$1;
    let a$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    return a$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpthis, tmpParamBare, a, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpthis, tmpParamBare, a, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpthis = this;
  debugger;
  return tmpthis;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
