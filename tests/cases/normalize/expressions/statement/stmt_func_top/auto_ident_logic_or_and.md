# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($(0)) || ($($(1)) && $($(2)));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  $($(0)) || ($($(1)) && $($(2)));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  const tmpIfTest = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (a$1, tmpCallCallee$3, tmpCalleeParam$3, tmpIfTest$2) {
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$3, tmpCalleeParam$3, tmpIfTest$2);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2, tmpCallCallee$4, tmpCalleeParam$4, tmpIfTest$3) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    const tmpIfTest$4 = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function (a$4, tmpCallCallee$8, tmpCalleeParam$8, tmpIfTest$6, tmpCallCallee$9, tmpCalleeParam$9, tmpIfTest$7) {
      const tmpCallCallee$10 = $;
      const tmpCalleeParam$10 = $(2);
      tmpCallCallee$10(tmpCalleeParam$10);
      const tmpReturnArg$1 = tmpBranchingC$1(
        a$4,
        tmpCallCallee$8,
        tmpCalleeParam$8,
        tmpIfTest$6,
        tmpCallCallee$9,
        tmpCalleeParam$9,
        tmpIfTest$7,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function (
      a$5,
      tmpCallCallee$11,
      tmpCalleeParam$11,
      tmpIfTest$8,
      tmpCallCallee$12,
      tmpCalleeParam$12,
      tmpIfTest$9,
    ) {
      const tmpReturnArg$2 = tmpBranchingC$1(
        a$5,
        tmpCallCallee$11,
        tmpCalleeParam$11,
        tmpIfTest$8,
        tmpCallCallee$12,
        tmpCalleeParam$12,
        tmpIfTest$9,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingC$1 = function (
      a$6,
      tmpCallCallee$13,
      tmpCalleeParam$13,
      tmpIfTest$10,
      tmpCallCallee$14,
      tmpCalleeParam$14,
      tmpIfTest$11,
    ) {
      const tmpReturnArg$3 = tmpBranchingC(a$6, tmpCallCallee$13, tmpCalleeParam$13, tmpIfTest$10);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$4 = tmpBranchingA$1(
        a$2,
        tmpCallCallee$4,
        tmpCalleeParam$4,
        tmpIfTest$3,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpIfTest$4,
      );
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(
        a$2,
        tmpCallCallee$4,
        tmpCalleeParam$4,
        tmpIfTest$3,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpIfTest$4,
      );
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingC = function (a$3, tmpCallCallee$7, tmpCalleeParam$7, tmpIfTest$5) {
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$15 = $;
const tmpCalleeParam$15 = f();
tmpCallCallee$15(tmpCalleeParam$15);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  const tmpBranchingB = function (a$2) {
    const tmpCalleeParam$5 = $(1);
    const tmpIfTest$4 = $(tmpCalleeParam$5);
    if (tmpIfTest$4) {
      const tmpCalleeParam$10 = $(2);
      $(tmpCalleeParam$10);
      $(a$2);
      return undefined;
    } else {
      $(a$2);
      return undefined;
    }
  };
  if (tmpIfTest) {
    $(a);
    return undefined;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(a);
    return tmpReturnArg$7;
  }
};
const tmpCalleeParam$15 = f();
$(tmpCalleeParam$15);
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
 - 7: { a: '999', b: '1000' }
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
