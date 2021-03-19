# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(1)) && $($(2)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = $($(1)) && $($(2))) : tmpParamDefault;
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
  const tmpBranchingA = function (tmpParamDefault$1, p$1, tmpIfTest$1) {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(1);
    let tmpNestedComplexRhs$1 = tmpCallCallee$2(tmpCalleeParam$2);
    const tmpBranchingA$1 = function (tmpParamDefault$4, p$4, tmpIfTest$4, tmpCallCallee$4, tmpCalleeParam$4, tmpNestedComplexRhs$2) {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(2);
      tmpNestedComplexRhs$2 = tmpCallCallee$5(tmpCalleeParam$5);
      const tmpReturnArg = tmpBranchingC$1(tmpParamDefault$4, p$4, tmpIfTest$4, tmpCallCallee$4, tmpCalleeParam$4, tmpNestedComplexRhs$2);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$5, tmpCallCallee$6, tmpCalleeParam$6, tmpNestedComplexRhs$3) {
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamDefault$5, p$5, tmpIfTest$5, tmpCallCallee$6, tmpCalleeParam$6, tmpNestedComplexRhs$3);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$6, tmpCallCallee$7, tmpCalleeParam$7, tmpNestedComplexRhs$4) {
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$2 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$6);
      return tmpReturnArg$2;
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpParamDefault$1, p$1, tmpIfTest$1, tmpCallCallee$2, tmpCalleeParam$2, tmpNestedComplexRhs$1);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpParamDefault$1, p$1, tmpIfTest$1, tmpCallCallee$2, tmpCalleeParam$2, tmpNestedComplexRhs$1);
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function (tmpParamDefault$2, p$2, tmpIfTest$2) {
    p$2 = tmpParamDefault$2;
    const tmpReturnArg$5 = tmpBranchingC(tmpParamDefault$2, p$2, tmpIfTest$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpParamDefault$3, p$3, tmpIfTest$3) {};
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$7;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$8 = $;
const tmpCalleeParam$8 = f();
tmpCallCallee$8(tmpCalleeParam$8);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpCalleeParam$2 = $(1);
    const tmpNestedComplexRhs$1 = $(tmpCalleeParam$2);
    if (tmpNestedComplexRhs$1) {
      const tmpCalleeParam$5 = $(2);
      const SSA_tmpNestedComplexRhs$2 = $(tmpCalleeParam$5);
      a = SSA_tmpNestedComplexRhs$2;
      return undefined;
    } else {
      a = tmpNestedComplexRhs$1;
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
const tmpCalleeParam$8 = f();
$(tmpCalleeParam$8);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
