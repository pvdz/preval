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
  debugger;
  let a = { a: 999, b: 1000 };
  a = $($)?.($(1));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = undefined;
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
    a = tmpChainElementCall$3;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    $(a);
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam$7 = f();
tmpCallCallee(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
let tmpSSA_a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
const tmpBranchingC = function () {
  debugger;
  $(tmpSSA_a);
  return undefined;
};
if (tmpIfTest) {
  const tmpCallVal$1 = tmpChainElementCall.call;
  const tmpCalleeParam$5 = $(1);
  const tmpChainElementCall$3 = tmpCallVal$1.call(tmpChainElementCall, $, tmpCalleeParam$5);
  tmpSSA_a = tmpChainElementCall$3;
  tmpBranchingC();
} else {
  tmpBranchingC();
}
$(undefined);
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
