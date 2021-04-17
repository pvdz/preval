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
  debugger;
  return $($)?.($(1));
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
  const tmpBranchingA = function () {
    debugger;
    const tmpCallObj$1 = tmpChainElementCall;
    const tmpCallVal$1 = tmpCallObj$1.call;
    const tmpCalleeParam$3 = tmpChainRootCall;
    const tmpCalleeParam$5 = $(1);
    const tmpChainElementCall$3 = tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$3, tmpCalleeParam$5);
    tmpReturnArg = tmpChainElementCall$3;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function () {
    debugger;
    return tmpReturnArg;
  };
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA();
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB();
    return tmpReturnArg$7;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$7 = f();
tmpCallCallee(tmpCalleeParam$7);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpCallVal$1 = tmpChainElementCall.call;
    const tmpCalleeParam$5 = $(1);
    const tmpChainElementCall$3 = tmpCallVal$1.call(tmpChainElementCall, $, tmpCalleeParam$5);
    return tmpChainElementCall$3;
  } else {
    return undefined;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
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
