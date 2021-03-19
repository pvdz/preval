# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = $($)?.($(1));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  a = $($)?.($(1));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (a$1, tmpChainRootCall$1, tmpChainElementCall$2, tmpIfTest$1) {
    const tmpCallObj$1 = tmpChainElementCall$2;
    const tmpCallVal$1 = tmpCallObj$1.call;
    const tmpCalleeParam$2 = tmpChainRootCall$1;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$3 = tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$2, tmpCalleeParam$3);
    a$1 = tmpChainElementCall$3;
    const tmpReturnArg = tmpBranchingC(a$1, tmpChainRootCall$1, tmpChainElementCall$2, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(a$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3, tmpChainRootCall$3, tmpChainElementCall$5, tmpIfTest$3) {
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam$4 = f();
tmpCallCallee(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpCallVal$1 = tmpChainElementCall.call;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$3 = tmpCallVal$1.call(tmpChainElementCall, $, tmpCalleeParam$3);
    $(tmpChainElementCall$3);
    return undefined;
  } else {
    $(undefined);
    return undefined;
  }
};
const tmpCalleeParam$4 = f();
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
