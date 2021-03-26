# Preval test case

# func_group_call.md

> Normalize > Optional > Func group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $())?.()
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const y = (1, 2, $())?.();
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  const tmpChainRootCall = $();
  const tmpIfTest = tmpChainRootCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let y$1 = $$0;
    let tmpChainRootCall$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpChainElementCall$1 = tmpChainRootCall$1();
    y$1 = tmpChainElementCall$1;
    const tmpReturnArg = tmpBranchingC(y$1, tmpChainRootCall$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let y$3 = $$0;
    let tmpChainRootCall$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(y$3, tmpChainRootCall$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let y$5 = $$0;
    let tmpChainRootCall$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    const tmpReturnArg$3 = $(y$5);
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(y, tmpChainRootCall, tmpIfTest);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(y, tmpChainRootCall, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpChainRootCall = $();
  const tmpIfTest = tmpChainRootCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = tmpChainRootCall();
    const tmpReturnArg = $(tmpChainElementCall$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$7 = $(undefined);
    return tmpReturnArg$7;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
