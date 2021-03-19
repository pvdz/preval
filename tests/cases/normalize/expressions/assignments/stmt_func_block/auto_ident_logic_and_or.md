# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = ($($(1)) && $($(1))) || $($(2));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let a = { a: 999, b: 1000 };
    a = ($($(1)) && $($(1))) || $($(2));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (a$1, tmpCallCallee$2, tmpCalleeParam$2) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    a$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$2, tmpCalleeParam$2);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2, tmpCallCallee$4, tmpCalleeParam$4) {
    const tmpReturnArg$1 = tmpBranchingC(a$2, tmpCallCallee$4, tmpCalleeParam$4);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3, tmpCallCallee$5, tmpCalleeParam$5) {
    const tmpBranchingA$1 = function (a$4, tmpCallCallee$7, tmpCalleeParam$7) {
      const tmpReturnArg$2 = tmpBranchingC$1(a$4, tmpCallCallee$7, tmpCalleeParam$7);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (a$5, tmpCallCallee$8, tmpCalleeParam$8) {
      const tmpCallCallee$9 = $;
      const tmpCalleeParam$9 = $(2);
      a$5 = tmpCallCallee$9(tmpCalleeParam$9);
      const tmpReturnArg$3 = tmpBranchingC$1(a$5, tmpCallCallee$8, tmpCalleeParam$8);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (a$6, tmpCallCallee$10, tmpCalleeParam$10) {
      $(a$6);
    };
    if (a$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(a$3, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(a$3, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$5;
    }
  };
  if (a) {
    const tmpReturnArg$6 = tmpBranchingA(a, tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(a, tmpCallCallee, tmpCalleeParam);
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
  const tmpCalleeParam = $(1);
  const SSA_a = $(tmpCalleeParam);
  const tmpBranchingC = function (a$3) {
    if (a$3) {
      $(a$3);
      return undefined;
    } else {
      const tmpCalleeParam$9 = $(2);
      const SSA_a$5 = $(tmpCalleeParam$9);
      $(SSA_a$5);
      return undefined;
    }
  };
  if (SSA_a) {
    const tmpCalleeParam$3 = $(1);
    const SSA_a$1 = $(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(SSA_a$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$7 = tmpBranchingC(SSA_a);
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
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
