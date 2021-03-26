# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $?.(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $?.(1));
};
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
  const tmpIfTest = tmpChainRootCall != null;
  const tmpBranchingA = function ($$0, $$1) {
    let tmpChainRootCall$1 = $$0;
    let tmpIfTest$1 = $$1;
    debugger;
    const tmpChainElementCall$1 = tmpChainRootCall$1(1);
    a = tmpChainElementCall$1;
    const tmpReturnArg$3 = tmpBranchingC(tmpChainRootCall$1, tmpIfTest$1);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpChainRootCall$3 = $$0;
    let tmpIfTest$3 = $$1;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpChainRootCall$3, tmpIfTest$3);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpChainRootCall$5 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpChainRootCall, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpChainRootCall, tmpIfTest);
    return tmpReturnArg$9;
  }
};
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
  const tmpIfTest = $ != null;
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpChainElementCall$1 = $(1);
    a = tmpChainElementCall$1;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  }
};
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
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
