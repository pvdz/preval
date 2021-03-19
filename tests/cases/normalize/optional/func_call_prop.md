# Preval test case

# func_call_prop.md

> Normalize > Optional > Func call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)?.foo);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $(parseInt(15)?.foo);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootCall = parseInt;
  const tmpChainElementCall = tmpChainRootCall(15);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (tmpCallCallee$1, tmpCalleeParam$1, tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementCall$1.foo;
    tmpCalleeParam$1 = tmpChainElementObject$1;
    const tmpReturnArg$2 = tmpBranchingC(tmpCallCallee$1, tmpCalleeParam$1, tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpCallCallee$2, tmpCalleeParam$2, tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$2) {
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function (tmpCallCallee$3, tmpCalleeParam$3, tmpChainRootCall$3, tmpChainElementCall$3, tmpIfTest$3) {
    const tmpReturnArg$1 = tmpCallCallee$3(tmpCalleeParam$3);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
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
  const tmpChainElementCall = parseInt(15);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = tmpChainElementCall.foo;
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
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
