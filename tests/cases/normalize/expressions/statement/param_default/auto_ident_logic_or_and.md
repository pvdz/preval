# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Param default > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(0)) || ($($(1)) && $($(2)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? $($(0)) || ($($(1)) && $($(2))) : tmpParamDefault;
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
    const tmpCalleeParam$3 = $(0);
    p$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpBranchingA$1 = function (tmpParamDefault$4, p$4, tmpIfTest$4, tmpCallCallee$6, tmpCalleeParam$6) {
      const tmpReturnArg = tmpBranchingC$1(tmpParamDefault$4, p$4, tmpIfTest$4, tmpCallCallee$6, tmpCalleeParam$6);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$5, tmpCallCallee$7, tmpCalleeParam$7) {
      const tmpCallCallee$8 = $;
      const tmpCalleeParam$8 = $(1);
      p$5 = tmpCallCallee$8(tmpCalleeParam$8);
      const tmpBranchingA$2 = function (
        tmpParamDefault$7,
        p$7,
        tmpIfTest$7,
        tmpCallCallee$11,
        tmpCalleeParam$11,
        tmpCallCallee$12,
        tmpCalleeParam$12,
      ) {
        const tmpCallCallee$13 = $;
        const tmpCalleeParam$13 = $(2);
        p$7 = tmpCallCallee$13(tmpCalleeParam$13);
        const tmpReturnArg$1 = tmpBranchingC$2(
          tmpParamDefault$7,
          p$7,
          tmpIfTest$7,
          tmpCallCallee$11,
          tmpCalleeParam$11,
          tmpCallCallee$12,
          tmpCalleeParam$12,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingB$2 = function (
        tmpParamDefault$8,
        p$8,
        tmpIfTest$8,
        tmpCallCallee$14,
        tmpCalleeParam$14,
        tmpCallCallee$15,
        tmpCalleeParam$15,
      ) {
        const tmpReturnArg$2 = tmpBranchingC$2(
          tmpParamDefault$8,
          p$8,
          tmpIfTest$8,
          tmpCallCallee$14,
          tmpCalleeParam$14,
          tmpCallCallee$15,
          tmpCalleeParam$15,
        );
        return tmpReturnArg$2;
      };
      const tmpBranchingC$2 = function (
        tmpParamDefault$9,
        p$9,
        tmpIfTest$9,
        tmpCallCallee$16,
        tmpCalleeParam$16,
        tmpCallCallee$17,
        tmpCalleeParam$17,
      ) {
        const tmpReturnArg$3 = tmpBranchingC$1(tmpParamDefault$9, p$9, tmpIfTest$9, tmpCallCallee$16, tmpCalleeParam$16);
        return tmpReturnArg$3;
      };
      if (p$5) {
        const tmpReturnArg$4 = tmpBranchingA$2(
          tmpParamDefault$5,
          p$5,
          tmpIfTest$5,
          tmpCallCallee$7,
          tmpCalleeParam$7,
          tmpCallCallee$8,
          tmpCalleeParam$8,
        );
        return tmpReturnArg$4;
      } else {
        const tmpReturnArg$5 = tmpBranchingB$2(
          tmpParamDefault$5,
          p$5,
          tmpIfTest$5,
          tmpCallCallee$7,
          tmpCalleeParam$7,
          tmpCallCallee$8,
          tmpCalleeParam$8,
        );
        return tmpReturnArg$5;
      }
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$6, tmpCallCallee$10, tmpCalleeParam$10) {
      const tmpReturnArg$6 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$6);
      return tmpReturnArg$6;
    };
    if (p$1) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpParamDefault$1, p$1, tmpIfTest$1, tmpCallCallee$3, tmpCalleeParam$3);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(tmpParamDefault$1, p$1, tmpIfTest$1, tmpCallCallee$3, tmpCalleeParam$3);
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
    const tmpCalleeParam$3 = $(0);
    const SSA_p$1 = $(tmpCalleeParam$3);
    const tmpBranchingB$1 = function () {
      const tmpCalleeParam$8 = $(1);
      const SSA_p$5 = $(tmpCalleeParam$8);
      if (SSA_p$5) {
        const tmpCalleeParam$13 = $(2);
        $(tmpCalleeParam$13);
        return undefined;
      } else {
        return undefined;
      }
    };
    if (SSA_p$1) {
      return undefined;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1();
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
const a = { a: 999, b: 1000 };
const tmpCalleeParam$18 = f();
$(tmpCalleeParam$18);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: undefined
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
