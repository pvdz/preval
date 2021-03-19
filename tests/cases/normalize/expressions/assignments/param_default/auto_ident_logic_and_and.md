# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(1)) && $($(1)) && $($(2)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = $($(1)) && $($(1)) && $($(2))) : tmpParamDefault;
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
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    let tmpNestedComplexRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpBranchingA$1 = function (tmpParamDefault$4, p$4, tmpIfTest$4, tmpCallCallee$6, tmpCalleeParam$6, tmpNestedComplexRhs$2) {
      const tmpCallCallee$7 = $;
      const tmpCalleeParam$7 = $(1);
      tmpNestedComplexRhs$2 = tmpCallCallee$7(tmpCalleeParam$7);
      const tmpBranchingA$2 = function (
        tmpParamDefault$7,
        p$7,
        tmpIfTest$7,
        tmpCallCallee$11,
        tmpCalleeParam$11,
        tmpNestedComplexRhs$5,
        tmpCallCallee$12,
        tmpCalleeParam$12,
      ) {
        const tmpCallCallee$13 = $;
        const tmpCalleeParam$13 = $(2);
        tmpNestedComplexRhs$5 = tmpCallCallee$13(tmpCalleeParam$13);
        const tmpReturnArg = tmpBranchingC$2(
          tmpParamDefault$7,
          p$7,
          tmpIfTest$7,
          tmpCallCallee$11,
          tmpCalleeParam$11,
          tmpNestedComplexRhs$5,
          tmpCallCallee$12,
          tmpCalleeParam$12,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$2 = function (
        tmpParamDefault$8,
        p$8,
        tmpIfTest$8,
        tmpCallCallee$14,
        tmpCalleeParam$14,
        tmpNestedComplexRhs$6,
        tmpCallCallee$15,
        tmpCalleeParam$15,
      ) {
        const tmpReturnArg$1 = tmpBranchingC$2(
          tmpParamDefault$8,
          p$8,
          tmpIfTest$8,
          tmpCallCallee$14,
          tmpCalleeParam$14,
          tmpNestedComplexRhs$6,
          tmpCallCallee$15,
          tmpCalleeParam$15,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$2 = function (
        tmpParamDefault$9,
        p$9,
        tmpIfTest$9,
        tmpCallCallee$16,
        tmpCalleeParam$16,
        tmpNestedComplexRhs$7,
        tmpCallCallee$17,
        tmpCalleeParam$17,
      ) {
        const tmpReturnArg$2 = tmpBranchingC$1(
          tmpParamDefault$9,
          p$9,
          tmpIfTest$9,
          tmpCallCallee$16,
          tmpCalleeParam$16,
          tmpNestedComplexRhs$7,
        );
        return tmpReturnArg$2;
      };
      if (tmpNestedComplexRhs$2) {
        const tmpReturnArg$3 = tmpBranchingA$2(
          tmpParamDefault$4,
          p$4,
          tmpIfTest$4,
          tmpCallCallee$6,
          tmpCalleeParam$6,
          tmpNestedComplexRhs$2,
          tmpCallCallee$7,
          tmpCalleeParam$7,
        );
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$4 = tmpBranchingB$2(
          tmpParamDefault$4,
          p$4,
          tmpIfTest$4,
          tmpCallCallee$6,
          tmpCalleeParam$6,
          tmpNestedComplexRhs$2,
          tmpCallCallee$7,
          tmpCalleeParam$7,
        );
        return tmpReturnArg$4;
      }
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$5, tmpCallCallee$9, tmpCalleeParam$9, tmpNestedComplexRhs$3) {
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamDefault$5, p$5, tmpIfTest$5, tmpCallCallee$9, tmpCalleeParam$9, tmpNestedComplexRhs$3);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$6, tmpCallCallee$10, tmpCalleeParam$10, tmpNestedComplexRhs$4) {
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$6 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$6);
      return tmpReturnArg$6;
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpParamDefault$1, p$1, tmpIfTest$1, tmpCallCallee$3, tmpCalleeParam$3, tmpNestedComplexRhs$1);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(tmpParamDefault$1, p$1, tmpIfTest$1, tmpCallCallee$3, tmpCalleeParam$3, tmpNestedComplexRhs$1);
      return tmpReturnArg$8;
    }
  };
  const tmpBranchingB = function (tmpParamDefault$2, p$2, tmpIfTest$2) {
    p$2 = tmpParamDefault$2;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamDefault$2, p$2, tmpIfTest$2);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function (tmpParamDefault$3, p$3, tmpIfTest$3) {};
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$11;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$18 = $;
const tmpCalleeParam$18 = f();
tmpCallCallee$18(tmpCalleeParam$18);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpCalleeParam$3 = $(1);
    const tmpNestedComplexRhs$1 = $(tmpCalleeParam$3);
    const tmpBranchingA$1 = function () {
      const tmpCalleeParam$7 = $(1);
      const SSA_tmpNestedComplexRhs$2 = $(tmpCalleeParam$7);
      if (SSA_tmpNestedComplexRhs$2) {
        const tmpCalleeParam$13 = $(2);
        const SSA_tmpNestedComplexRhs$5 = $(tmpCalleeParam$13);
        a = SSA_tmpNestedComplexRhs$5;
        return undefined;
      } else {
        a = SSA_tmpNestedComplexRhs$2;
        return undefined;
      }
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      a = tmpNestedComplexRhs$1;
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA();
    return tmpReturnArg$10;
  } else {
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$18 = f();
$(tmpCalleeParam$18);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: undefined
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
