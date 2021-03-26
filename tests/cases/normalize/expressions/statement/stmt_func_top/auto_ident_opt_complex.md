# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = { a: 999, b: 1000 };
  $(b)?.x;
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  $(b)?.x;
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4) {
    let b$1 = $$0;
    let a$1 = $$1;
    let tmpChainRootCall$1 = $$2;
    let tmpChainElementCall$1 = $$3;
    let tmpIfTest$1 = $$4;
    debugger;
    const tmpChainElementObject$1 = tmpChainElementCall$1.x;
    const tmpReturnArg = tmpBranchingC(b$1, a$1, tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let b$3 = $$0;
    let a$3 = $$1;
    let tmpChainRootCall$3 = $$2;
    let tmpChainElementCall$3 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(b$3, a$3, tmpChainRootCall$3, tmpChainElementCall$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let b$5 = $$0;
    let a$5 = $$1;
    let tmpChainRootCall$5 = $$2;
    let tmpChainElementCall$5 = $$3;
    let tmpIfTest$5 = $$4;
    debugger;
    $(a$5);
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
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
  const b = { x: 1 };
  const a = { a: 999, b: 1000 };
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    tmpChainElementCall.x;
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
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
