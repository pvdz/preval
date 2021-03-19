# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident logic or and
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $($(0)) || ($($(1)) && $($(2)));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let a = $($(0)) || ($($(1)) && $($(2)));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (tmpCallCallee$3, tmpCalleeParam$3, a$1) {
    const tmpReturnArg = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpCallCallee$4, tmpCalleeParam$4, a$2) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    a$2 = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function (tmpCallCallee$8, tmpCalleeParam$8, a$4, tmpCallCallee$9, tmpCalleeParam$9) {
      const tmpCallCallee$10 = $;
      const tmpCalleeParam$10 = $(2);
      a$4 = tmpCallCallee$10(tmpCalleeParam$10);
      const tmpReturnArg$1 = tmpBranchingC$1(tmpCallCallee$8, tmpCalleeParam$8, a$4, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function (tmpCallCallee$11, tmpCalleeParam$11, a$5, tmpCallCallee$12, tmpCalleeParam$12) {
      const tmpReturnArg$2 = tmpBranchingC$1(tmpCallCallee$11, tmpCalleeParam$11, a$5, tmpCallCallee$12, tmpCalleeParam$12);
      return tmpReturnArg$2;
    };
    const tmpBranchingC$1 = function (tmpCallCallee$13, tmpCalleeParam$13, a$6, tmpCallCallee$14, tmpCalleeParam$14) {
      const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$13, tmpCalleeParam$13, a$6);
      return tmpReturnArg$3;
    };
    if (a$2) {
      const tmpReturnArg$4 = tmpBranchingA$1(tmpCallCallee$4, tmpCalleeParam$4, a$2, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(tmpCallCallee$4, tmpCalleeParam$4, a$2, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingC = function (tmpCallCallee$7, tmpCalleeParam$7, a$3) {
    $(a$3);
  };
  if (a) {
    const tmpReturnArg$6 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, a);
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
  const tmpCalleeParam = $(0);
  const a = $(tmpCalleeParam);
  const tmpBranchingB = function () {
    const tmpCalleeParam$5 = $(1);
    const SSA_a$2 = $(tmpCalleeParam$5);
    if (SSA_a$2) {
      const tmpCalleeParam$10 = $(2);
      const SSA_a$4 = $(tmpCalleeParam$10);
      $(SSA_a$4);
      return undefined;
    } else {
      $(SSA_a$2);
      return undefined;
    }
  };
  if (a) {
    $(a);
    return undefined;
  } else {
    const tmpReturnArg$7 = tmpBranchingB();
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
 - 7: 2
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
