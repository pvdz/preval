# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Return > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $?.(1);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $?.(1);
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpReturnArg = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest = tmpChainRootCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpReturnArg$1 = $$0;
    let tmpChainRootCall$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpChainElementCall$1 = tmpChainRootCall$1(1);
    tmpReturnArg$1 = tmpChainElementCall$1;
    const tmpReturnArg$4 = tmpBranchingC(tmpReturnArg$1, tmpChainRootCall$1, tmpIfTest$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpReturnArg$2 = $$0;
    let tmpChainRootCall$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpReturnArg$2, tmpChainRootCall$2, tmpIfTest$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpReturnArg$3 = $$0;
    let tmpChainRootCall$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpReturnArg, tmpChainRootCall, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpReturnArg, tmpChainRootCall, tmpIfTest);
    return tmpReturnArg$7;
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
  const tmpIfTest = $ != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = $(1);
    return tmpChainElementCall$1;
  } else {
    return undefined;
  }
};
const a = { a: 999, b: 1000 };
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
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
