# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Return > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($)?.($(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $($)?.($(1));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (tmpReturnArg$1, tmpChainRootCall$1, tmpChainElementCall$2, tmpIfTest$1) {
    const tmpCallObj$1 = tmpChainElementCall$2;
    const tmpCallVal$1 = tmpCallObj$1.call;
    const tmpCalleeParam$2 = tmpChainRootCall$1;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$3 = tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$2, tmpCalleeParam$3);
    tmpReturnArg$1 = tmpChainElementCall$3;
    const tmpReturnArg$4 = tmpBranchingC(tmpReturnArg$1, tmpChainRootCall$1, tmpChainElementCall$2, tmpIfTest$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function (tmpReturnArg$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$2) {
    const tmpReturnArg$5 = tmpBranchingC(tmpReturnArg$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpReturnArg$3, tmpChainRootCall$3, tmpChainElementCall$5, tmpIfTest$3) {
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$7;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$4 = f();
tmpCallCallee(tmpCalleeParam$4);
$(a);
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
    return tmpChainElementCall$3;
  } else {
    return undefined;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$4 = f();
$(tmpCalleeParam$4);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
