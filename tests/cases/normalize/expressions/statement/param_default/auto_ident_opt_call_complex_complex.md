# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($)?.($(1))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? $($)?.($(1)) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    p = undefined;
    const tmpChainRootCall$1 = $;
    const tmpChainElementCall$3 = tmpChainRootCall$1($);
    const tmpIfTest$3 = tmpChainElementCall$3 != null;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallObj$3 = tmpChainElementCall$3;
      const tmpCallVal$3 = tmpCallObj$3.call;
      const tmpCalleeParam$7 = tmpChainRootCall$1;
      const tmpCalleeParam$9 = $(1);
      const tmpChainElementCall$7 = tmpCallVal$3.call(tmpCallObj$3, tmpCalleeParam$7, tmpCalleeParam$9);
      p = tmpChainElementCall$7;
      const tmpReturnArg = tmpBranchingC$1();
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1();
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    p = tmpParamBare;
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function () {
    debugger;
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$11 = f();
tmpCallCallee(tmpCalleeParam$11);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpChainElementCall$3 = $($);
const tmpIfTest$3 = tmpChainElementCall$3 != null;
if (tmpIfTest$3) {
  const tmpCallVal$3 = tmpChainElementCall$3.call;
  const tmpCalleeParam$9 = $(1);
  tmpCallVal$3.call(tmpChainElementCall$3, $, tmpCalleeParam$9);
} else {
}
$(undefined);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: undefined
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
