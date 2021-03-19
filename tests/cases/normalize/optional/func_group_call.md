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
  const y = (1, 2, $())?.();
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let y = undefined;
  const tmpChainRootCall = $();
  const tmpIfTest = tmpChainRootCall != null;
  const tmpBranchingA = function (y$1, tmpChainRootCall$1, tmpIfTest$1) {
    const tmpChainElementCall$1 = tmpChainRootCall$1();
    y$1 = tmpChainElementCall$1;
    const tmpReturnArg = tmpBranchingC(y$1, tmpChainRootCall$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (y$2, tmpChainRootCall$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(y$2, tmpChainRootCall$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (y$3, tmpChainRootCall$3, tmpIfTest$3) {
    const tmpReturnArg$2 = $(y$3);
    return tmpReturnArg$2;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(y, tmpChainRootCall, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$4 = tmpBranchingB(y, tmpChainRootCall, tmpIfTest);
    return tmpReturnArg$4;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpChainRootCall = $();
  const tmpIfTest = tmpChainRootCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = tmpChainRootCall();
    const tmpReturnArg = $(tmpChainElementCall$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$4 = $(undefined);
    return tmpReturnArg$4;
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
