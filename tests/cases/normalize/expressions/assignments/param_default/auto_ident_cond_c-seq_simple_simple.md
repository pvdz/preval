# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = (10, 20, $(30)) ? $(2) : $($(100)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = (10, 20, $(30)) ? $(2) : $($(100))) : tmpParamDefault;
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
    const tmpIfTest$3 = $(30);
    const tmpBranchingA$1 = function (tmpParamDefault$4, p$4, tmpIfTest$6, tmpNestedComplexRhs$2, tmpIfTest$7) {
      tmpNestedComplexRhs$2 = $(2);
      const tmpReturnArg = tmpBranchingC$1(tmpParamDefault$4, p$4, tmpIfTest$6, tmpNestedComplexRhs$2, tmpIfTest$7);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$8, tmpNestedComplexRhs$3, tmpIfTest$9) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(100);
      tmpNestedComplexRhs$3 = tmpCallCallee$2(tmpCalleeParam$2);
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamDefault$5, p$5, tmpIfTest$8, tmpNestedComplexRhs$3, tmpIfTest$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$10, tmpNestedComplexRhs$4, tmpIfTest$11) {
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$2 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpParamDefault$1, p$1, tmpIfTest$2, tmpNestedComplexRhs$1, tmpIfTest$3);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpParamDefault$1, p$1, tmpIfTest$2, tmpNestedComplexRhs$1, tmpIfTest$3);
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
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpIfTest$3 = $(30);
    if (tmpIfTest$3) {
      const SSA_tmpNestedComplexRhs$2 = $(2);
      a = SSA_tmpNestedComplexRhs$2;
      return undefined;
    } else {
      const tmpCalleeParam$2 = $(100);
      const SSA_tmpNestedComplexRhs$3 = $(tmpCalleeParam$2);
      a = SSA_tmpNestedComplexRhs$3;
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
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: undefined
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
