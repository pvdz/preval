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
  let y = undefined;
  y = (1, 2, $())?.foo;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let y = undefined;
  y = undefined;
  const tmpChainRootProp = $();
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (y$1, tmpChainRootProp$1, tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.foo;
    y$1 = tmpChainElementObject$1;
    const tmpReturnArg = tmpBranchingC(y$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (y$2, tmpChainRootProp$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(y$2, tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (y$3, tmpChainRootProp$3, tmpIfTest$3) {
    const tmpReturnArg$2 = $(y$3);
    return tmpReturnArg$2;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(y, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$4 = tmpBranchingB(y, tmpChainRootProp, tmpIfTest);
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
  const tmpChainRootProp = $();
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = tmpChainRootProp.foo;
    const tmpReturnArg = $(tmpChainElementObject$1);
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
