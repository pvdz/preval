# Preval test case

# func_group_literal.md

> Normalize > Optional > Func group literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)?.foo
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const y = (1, 2, 3)?.foo;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let y = undefined;
  const tmpChainRootProp = 3;
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
const tmpChainElementObject$1 = (3).foo;
const tmpReturnArg = $(tmpChainElementObject$1);
$(tmpReturnArg);
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
