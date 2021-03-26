# Preval test case

# func_assign_member.md

> Normalize > Optional > Func assign member
>
> Assignment of a member expression where the object is a sequence

This could appear and is most likely a transformation artifact.

## Input

`````js filename=intro
function f() {
  var y;
  y = (1, 2, $())?.foo;
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = (1, 2, $())?.foo;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = undefined;
  const tmpChainRootProp = $();
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let y$1 = $$0;
    let tmpChainRootProp$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpChainElementObject$1 = tmpChainRootProp$1.foo;
    y$1 = tmpChainElementObject$1;
    const tmpReturnArg = tmpBranchingC(y$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let y$3 = $$0;
    let tmpChainRootProp$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(y$3, tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let y$5 = $$0;
    let tmpChainRootProp$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    const tmpReturnArg$3 = $(y$5);
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(y, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(y, tmpChainRootProp, tmpIfTest);
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
  const tmpChainRootProp = $();
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = tmpChainRootProp.foo;
    const tmpReturnArg = $(tmpChainElementObject$1);
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
