# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($(1)) && $($(1)) && $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  $($(1)) && $($(1)) && $($(2));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (a$1, tmpCallCallee$2, tmpCalleeParam$2, tmpIfTest$1) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    tmpIfTest$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$2, tmpCalleeParam$2, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2, tmpCallCallee$4, tmpCalleeParam$4, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(a$2, tmpCallCallee$4, tmpCalleeParam$4, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3, tmpCallCallee$5, tmpCalleeParam$5, tmpIfTest$3) {
    const tmpBranchingA$1 = function (a$4, tmpCallCallee$7, tmpCalleeParam$7, tmpIfTest$4) {
      const tmpCallCallee$8 = $;
      const tmpCalleeParam$8 = $(2);
      tmpCallCallee$8(tmpCalleeParam$8);
      const tmpReturnArg$2 = tmpBranchingC$1(a$4, tmpCallCallee$7, tmpCalleeParam$7, tmpIfTest$4);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (a$5, tmpCallCallee$9, tmpCalleeParam$9, tmpIfTest$5) {
      const tmpReturnArg$3 = tmpBranchingC$1(a$5, tmpCallCallee$9, tmpCalleeParam$9, tmpIfTest$5);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (a$6, tmpCallCallee$10, tmpCalleeParam$10, tmpIfTest$6) {
      $(a$6);
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(a$3, tmpCallCallee$5, tmpCalleeParam$5, tmpIfTest$3);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(a$3, tmpCallCallee$5, tmpCalleeParam$5, tmpIfTest$3);
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$11 = $;
const tmpCalleeParam$11 = f();
tmpCallCallee$11(tmpCalleeParam$11);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(1);
  const tmpIfTest = $(tmpCalleeParam);
  const tmpBranchingC = function (a$3, tmpIfTest$3) {
    if (tmpIfTest$3) {
      const tmpCalleeParam$8 = $(2);
      $(tmpCalleeParam$8);
      $(a$3);
      return undefined;
    } else {
      $(a$3);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$3 = $(1);
    const SSA_tmpIfTest$1 = $(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(a, SSA_tmpIfTest$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$7 = tmpBranchingC(a, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCalleeParam$11 = f();
$(tmpCalleeParam$11);
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
 - 7: { a: '999', b: '1000' }
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
