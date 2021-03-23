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
    const tmpReturnArg$2 = tmpBranchingC(obj$1, tmpCallCallee$1, tmpCalleeParam$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let obj$2 = $$0;
    let tmpCallCallee$2 = $$1;
    let tmpCalleeParam$2 = $$2;
    let tmpChainRootProp$2 = $$3;
    let tmpIfTest$2 = $$4;
    debugger;
    const tmpReturnArg$3 = tmpBranchingC(obj$2, tmpCallCallee$2, tmpCalleeParam$2, tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let obj$3 = $$0;
    let tmpCallCallee$3 = $$1;
    let tmpCalleeParam$3 = $$2;
    let tmpChainRootProp$3 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    const tmpReturnArg$1 = tmpCallCallee$3(tmpCalleeParam$3);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(obj, tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(obj, tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$4 = $;
const tmpCalleeParam$4 = f();
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const obj = { a: 1 };
  const tmpIfTest = obj != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = obj.a;
    const tmpReturnArg$2 = $(tmpChainElementObject$1);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$5 = $(undefined);
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam$4 = f();
$(tmpCalleeParam$4);
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
