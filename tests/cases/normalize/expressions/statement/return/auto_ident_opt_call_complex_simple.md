# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Return > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($)?.(1);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $($)?.(1);
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
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpReturnArg$1 = $$0;
    let tmpChainRootCall$1 = $$1;
    let tmpChainElementCall$3 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    const tmpChainElementCall$5 = tmpChainElementCall$3.call(tmpChainRootCall$1, 1);
    tmpReturnArg$1 = tmpChainElementCall$5;
    const tmpReturnArg$7 = tmpBranchingC(tmpReturnArg$1, tmpChainRootCall$1, tmpChainElementCall$3, tmpIfTest$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpReturnArg$3 = $$0;
    let tmpChainRootCall$3 = $$1;
    let tmpChainElementCall$7 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpReturnArg$9 = tmpBranchingC(tmpReturnArg$3, tmpChainRootCall$3, tmpChainElementCall$7, tmpIfTest$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpReturnArg$5 = $$0;
    let tmpChainRootCall$5 = $$1;
    let tmpChainElementCall$9 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    return tmpReturnArg$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$13;
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
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpChainElementCall.call($, 1);
    return tmpReturnArg$11;
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
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
