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
  debugger;
  const a = { x: 1 };
  const y = (1, a)?.x;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const a = { x: 1 };
  let y = undefined;
  const tmpChainRootProp = a;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let a$1 = $$0;
    let y$1 = $$1;
    let tmpChainRootProp$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
    y$1 = tmpChainElementObject$1;
    const tmpReturnArg = tmpBranchingC(a$1, y$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let y$3 = $$1;
    let tmpChainRootProp$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$3, y$3, tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let a$5 = $$0;
    let y$5 = $$1;
    let tmpChainRootProp$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    const tmpReturnArg$3 = $(y$5);
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA(a, y, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(a, y, tmpChainRootProp, tmpIfTest);
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
  const a = { x: 1 };
  const tmpIfTest = a != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = a.x;
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
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
