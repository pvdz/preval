# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    $($)?.(1);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let a = { a: 999, b: 1000 };
    $($)?.(1);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let a$1 = $$0;
    let tmpChainRootCall$1 = $$1;
    let tmpChainElementCall$3 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    const tmpChainElementCall$5 = tmpChainElementCall$3.call(tmpChainRootCall$1, 1);
    const tmpReturnArg = tmpBranchingC(a$1, tmpChainRootCall$1, tmpChainElementCall$3, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let tmpChainRootCall$3 = $$1;
    let tmpChainElementCall$7 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$3, tmpChainRootCall$3, tmpChainElementCall$7, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let a$5 = $$0;
    let tmpChainRootCall$5 = $$1;
    let tmpChainElementCall$9 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    $(a$5);
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$5;
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
  const a = { a: 999, b: 1000 };
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    tmpChainElementCall.call($, 1);
    $(a);
    return undefined;
  } else {
    $(a);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
