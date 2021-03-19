# Preval test case

# func_group_ident.md

> Normalize > Optional > Func group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  const a = {x: 1}
  const y = (1, a)?.x
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const a = { x: 1 };
  const y = (1, a)?.x;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const a = { x: 1 };
  let y = undefined;
  const tmpChainRootProp = a;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (a$1, y$1, tmpChainRootProp$1, tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
    y$1 = tmpChainElementObject$1;
    const tmpReturnArg = tmpBranchingC(a$1, y$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2, y$2, tmpChainRootProp$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(a$2, y$2, tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3, y$3, tmpChainRootProp$3, tmpIfTest$3) {
    const tmpReturnArg$2 = $(y$3);
    return tmpReturnArg$2;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(a, y, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$4 = tmpBranchingB(a, y, tmpChainRootProp, tmpIfTest);
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
  const a = { x: 1 };
  const tmpIfTest = a != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = a.x;
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
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
