# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(0)) || 2)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = $($(0)) || 2) : tmpParamDefault;
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
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(0);
    let tmpNestedComplexRhs$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpBranchingA$1 = function (tmpParamDefault$4, p$4, tmpIfTest$4, tmpCallCallee$2, tmpCalleeParam$2, tmpNestedComplexRhs$2) {
      const tmpReturnArg = tmpBranchingC$1(tmpParamDefault$4, p$4, tmpIfTest$4, tmpCallCallee$2, tmpCalleeParam$2, tmpNestedComplexRhs$2);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$5, tmpCallCallee$3, tmpCalleeParam$3, tmpNestedComplexRhs$3) {
      tmpNestedComplexRhs$3 = 2;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamDefault$5, p$5, tmpIfTest$5, tmpCallCallee$3, tmpCalleeParam$3, tmpNestedComplexRhs$3);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$6, tmpCallCallee$4, tmpCalleeParam$4, tmpNestedComplexRhs$4) {
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$2 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$6);
      return tmpReturnArg$2;
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpParamDefault$1, p$1, tmpIfTest$1, tmpCallCallee$1, tmpCalleeParam$1, tmpNestedComplexRhs$1);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpParamDefault$1, p$1, tmpIfTest$1, tmpCallCallee$1, tmpCalleeParam$1, tmpNestedComplexRhs$1);
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
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$5(tmpCalleeParam$5);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpCalleeParam$1 = $(0);
    const tmpNestedComplexRhs$1 = $(tmpCalleeParam$1);
    if (tmpNestedComplexRhs$1) {
      a = tmpNestedComplexRhs$1;
      return undefined;
    } else {
      a = 2;
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
const tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: undefined
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
