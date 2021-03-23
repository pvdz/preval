# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Return > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = (1, 2, b)?.x);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = (1, 2, b)?.x);
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1) {
    let tmpChainRootProp$1 = $$0;
    let tmpIfTest$1 = $$1;
    debugger;
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
    a = tmpChainElementObject$1;
    const tmpReturnArg$2 = tmpBranchingC(tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpChainRootProp$2 = $$0;
    let tmpIfTest$2 = $$1;
    debugger;
    const tmpReturnArg$3 = tmpBranchingC(tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpChainRootProp$3 = $$0;
    let tmpIfTest$3 = $$1;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$5;
  }
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  a = undefined;
  const tmpIfTest = b != null;
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpChainElementObject$1 = b.x;
    a = tmpChainElementObject$1;
    const tmpReturnArg$2 = tmpBranchingC();
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  }
};
const b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
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
