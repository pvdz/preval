# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = ($($(1)) && $($(1))) || $($(2)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = ($($(1)) && $($(1))) || $($(2))) : tmpParamDefault;
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
      const tmpReturnArg = tmpBranchingC$1(tmpParamDefault$4, p$4, tmpIfTest$4, tmpCallCallee$6, tmpCalleeParam$6, tmpNestedComplexRhs$2);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$5, tmpCallCallee$8, tmpCalleeParam$8, tmpNestedComplexRhs$3) {
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamDefault$5, p$5, tmpIfTest$5, tmpCallCallee$8, tmpCalleeParam$8, tmpNestedComplexRhs$3);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$6, tmpCallCallee$9, tmpCalleeParam$9, tmpNestedComplexRhs$4) {
      const tmpBranchingA$2 = function (tmpParamDefault$7, p$7, tmpIfTest$7, tmpCallCallee$11, tmpCalleeParam$11, tmpNestedComplexRhs$5) {
        const tmpReturnArg$2 = tmpBranchingC$2(
          tmpParamDefault$7,
          p$7,
          tmpIfTest$7,
          tmpCallCallee$11,
          tmpCalleeParam$11,
          tmpNestedComplexRhs$5,
        );
        return tmpReturnArg$2;
      };
      const tmpBranchingB$2 = function (tmpParamDefault$8, p$8, tmpIfTest$8, tmpCallCallee$12, tmpCalleeParam$12, tmpNestedComplexRhs$6) {
        const tmpCallCallee$13 = $;
        const tmpCalleeParam$13 = $(2);
        tmpNestedComplexRhs$6 = tmpCallCallee$13(tmpCalleeParam$13);
        const tmpReturnArg$3 = tmpBranchingC$2(
          tmpParamDefault$8,
          p$8,
          tmpIfTest$8,
          tmpCallCallee$12,
          tmpCalleeParam$12,
          tmpNestedComplexRhs$6,
        );
        return tmpReturnArg$3;
      };
      const tmpBranchingC$2 = function (tmpParamDefault$9, p$9, tmpIfTest$9, tmpCallCallee$14, tmpCalleeParam$14, tmpNestedComplexRhs$7) {
        a = tmpNestedComplexRhs$7;
        p$9 = tmpNestedComplexRhs$7;
        const tmpReturnArg$4 = tmpBranchingC(tmpParamDefault$9, p$9, tmpIfTest$9);
        return tmpReturnArg$4;
      };
      if (tmpNestedComplexRhs$4) {
        const tmpReturnArg$5 = tmpBranchingA$2(
          tmpParamDefault$6,
          p$6,
          tmpIfTest$6,
          tmpCallCallee$9,
          tmpCalleeParam$9,
          tmpNestedComplexRhs$4,
        );
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$6 = tmpBranchingB$2(
          tmpParamDefault$6,
          p$6,
          tmpIfTest$6,
          tmpCallCallee$9,
          tmpCalleeParam$9,
          tmpNestedComplexRhs$4,
        );
        return tmpReturnArg$6;
      }
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
const tmpCallCallee$15 = $;
const tmpCalleeParam$15 = f();
tmpCallCallee$15(tmpCalleeParam$15);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpCalleeParam$3 = $(1);
    const tmpNestedComplexRhs$1 = $(tmpCalleeParam$3);
    const tmpBranchingC$1 = function (tmpNestedComplexRhs$4) {
      if (tmpNestedComplexRhs$4) {
        a = tmpNestedComplexRhs$4;
        return undefined;
      } else {
        const tmpCalleeParam$13 = $(2);
        const SSA_tmpNestedComplexRhs$6 = $(tmpCalleeParam$13);
        a = SSA_tmpNestedComplexRhs$6;
        return undefined;
      }
    };
    if (tmpNestedComplexRhs$1) {
      const tmpCalleeParam$7 = $(1);
      const SSA_tmpNestedComplexRhs$2 = $(tmpCalleeParam$7);
      const tmpReturnArg = tmpBranchingC$1(SSA_tmpNestedComplexRhs$2);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$8 = tmpBranchingC$1(tmpNestedComplexRhs$1);
      return tmpReturnArg$8;
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
const tmpCalleeParam$15 = f();
$(tmpCalleeParam$15);
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
 - 5: undefined
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
