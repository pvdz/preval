# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($)?.($(1)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = $($)?.($(1))) : tmpParamDefault;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, p$1, tmpIfTest$2) {
    let tmpNestedComplexRhs$1 = undefined;
    const tmpChainRootCall$1 = $;
    const tmpChainElementCall$2 = tmpChainRootCall$1($);
    const tmpIfTest$3 = tmpChainElementCall$2 != null;
    const tmpBranchingA$1 = function (
      tmpParamDefault$4,
      p$4,
      tmpIfTest$6,
      tmpNestedComplexRhs$2,
      tmpChainRootCall$2,
      tmpChainElementCall$4,
      tmpIfTest$7,
    ) {
      const tmpCallObj$2 = tmpChainElementCall$4;
      const tmpCallVal$2 = tmpCallObj$2.call;
      const tmpCalleeParam$4 = tmpChainRootCall$2;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$5 = tmpCallVal$2.call(tmpCallObj$2, tmpCalleeParam$4, tmpCalleeParam$5);
      tmpNestedComplexRhs$2 = tmpChainElementCall$5;
      const tmpReturnArg = tmpBranchingC$1(
        tmpParamDefault$4,
        p$4,
        tmpIfTest$6,
        tmpNestedComplexRhs$2,
        tmpChainRootCall$2,
        tmpChainElementCall$4,
        tmpIfTest$7,
      );
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (
      tmpParamDefault$5,
      p$5,
      tmpIfTest$8,
      tmpNestedComplexRhs$3,
      tmpChainRootCall$3,
      tmpChainElementCall$6,
      tmpIfTest$9,
    ) {
      const tmpReturnArg$1 = tmpBranchingC$1(
        tmpParamDefault$5,
        p$5,
        tmpIfTest$8,
        tmpNestedComplexRhs$3,
        tmpChainRootCall$3,
        tmpChainElementCall$6,
        tmpIfTest$9,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (
      tmpParamDefault$6,
      p$6,
      tmpIfTest$10,
      tmpNestedComplexRhs$4,
      tmpChainRootCall$4,
      tmpChainElementCall$7,
      tmpIfTest$11,
    ) {
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$2 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(
        tmpParamDefault$1,
        p$1,
        tmpIfTest$2,
        tmpNestedComplexRhs$1,
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(
        tmpParamDefault$1,
        p$1,
        tmpIfTest$2,
        tmpNestedComplexRhs$1,
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function (tmpParamDefault$2, p$2, tmpIfTest$4) {
    p$2 = tmpParamDefault$2;
    const tmpReturnArg$5 = tmpBranchingC(tmpParamDefault$2, p$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpParamDefault$3, p$3, tmpIfTest$5) {};
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$7;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$6 = f();
tmpCallCallee(tmpCalleeParam$6);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$3 = tmpChainElementCall$2 != null;
    if (tmpIfTest$3) {
      const tmpCallVal$2 = tmpChainElementCall$2.call;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$5 = tmpCallVal$2.call(tmpChainElementCall$2, $, tmpCalleeParam$5);
      a = tmpChainElementCall$5;
      return undefined;
    } else {
      a = undefined;
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA();
    return tmpReturnArg$6;
  } else {
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
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
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
