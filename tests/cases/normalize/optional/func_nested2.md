# Preval test case

# func_nested2.md

> Normalize > Optional > Func nested2
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: 1};
  return $(obj?.a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: 1 };
  return $(obj?.a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: 1 };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4) {
    let obj$1 = $$0;
    let tmpCallCallee$1 = $$1;
    let tmpCalleeParam$1 = $$2;
    let tmpChainRootProp$1 = $$3;
    let tmpIfTest$1 = $$4;
    debugger;
    const tmpChainElementObject$1 = tmpChainRootProp$1.a;
    tmpCalleeParam$1 = tmpChainElementObject$1;
    const tmpReturnArg$3 = tmpBranchingC(obj$1, tmpCallCallee$1, tmpCalleeParam$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let obj$3 = $$0;
    let tmpCallCallee$3 = $$1;
    let tmpCalleeParam$3 = $$2;
    let tmpChainRootProp$3 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(obj$3, tmpCallCallee$3, tmpCalleeParam$3, tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let obj$5 = $$0;
    let tmpCallCallee$5 = $$1;
    let tmpCalleeParam$5 = $$2;
    let tmpChainRootProp$5 = $$3;
    let tmpIfTest$5 = $$4;
    debugger;
    const tmpReturnArg$1 = tmpCallCallee$5(tmpCalleeParam$5);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(obj, tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(obj, tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
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
  const obj = { a: 1 };
  const tmpIfTest = obj != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = obj.a;
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

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
