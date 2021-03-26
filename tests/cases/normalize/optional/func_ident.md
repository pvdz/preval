# Preval test case

# func_ident.md

> Normalize > Optional > Func ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
function f() {
  return $(global?.foo);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $(global?.foo);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = global;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpCallCallee$1 = $$0;
    let tmpCalleeParam$1 = $$1;
    let tmpChainRootProp$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    const tmpChainElementObject$1 = tmpChainRootProp$1.foo;
    tmpCalleeParam$1 = tmpChainElementObject$1;
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$1, tmpCalleeParam$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    let tmpChainRootProp$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
    let tmpChainRootProp$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    const tmpReturnArg$1 = tmpCallCallee$5(tmpCalleeParam$5);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$9;
  }
};
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpChainRootProp = global;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = tmpChainRootProp.foo;
    const tmpReturnArg$3 = $(tmpChainElementObject$1);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$9 = $(undefined);
    return tmpReturnArg$9;
  }
};
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
`````

## Globals

BAD@! Found 1 implicit global bindings:

global

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
