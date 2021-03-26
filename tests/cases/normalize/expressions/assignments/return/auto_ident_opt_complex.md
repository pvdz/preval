# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = $(b)?.x);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $(b)?.x);
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
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpChainRootCall$1 = $$0;
    let tmpChainElementCall$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpChainElementObject$1 = tmpChainElementCall$1.x;
    a = tmpChainElementObject$1;
    const tmpReturnArg$3 = tmpBranchingC(tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$1);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpChainRootCall$3 = $$0;
    let tmpChainElementCall$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpChainRootCall$3, tmpChainElementCall$3, tmpIfTest$3);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpChainRootCall$5 = $$0;
    let tmpChainElementCall$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$9;
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
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpChainElementObject$1 = tmpChainElementCall.x;
    a = tmpChainElementObject$1;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
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
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
