# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic and or
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = ($($(1)) && $($(1))) || $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = ($($(1)) && $($(1))) || $($(2));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (tmpCallCallee$2, tmpCalleeParam$2, a$1) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    a$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpCallCallee$4, tmpCalleeParam$4, a$2) {
    const tmpReturnArg$1 = tmpBranchingC(tmpCallCallee$4, tmpCalleeParam$4, a$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpCallCallee$5, tmpCalleeParam$5, a$3) {
    const tmpBranchingA$1 = function (tmpCallCallee$7, tmpCalleeParam$7, a$4) {
      const tmpReturnArg$2 = tmpBranchingC$1(tmpCallCallee$7, tmpCalleeParam$7, a$4);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (tmpCallCallee$8, tmpCalleeParam$8, a$5) {
      const tmpCallCallee$9 = $;
      const tmpCalleeParam$9 = $(2);
      a$5 = tmpCallCallee$9(tmpCalleeParam$9);
      const tmpReturnArg$3 = tmpBranchingC$1(tmpCallCallee$8, tmpCalleeParam$8, a$5);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (tmpCallCallee$10, tmpCalleeParam$10, a$6) {
      $(a$6);
    };
    if (a$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(tmpCallCallee$5, tmpCalleeParam$5, a$3);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(tmpCallCallee$5, tmpCalleeParam$5, a$3);
      return tmpReturnArg$5;
    }
  };
  if (a) {
    const tmpReturnArg$6 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, a);
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
  const a = $(tmpCalleeParam);
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
  if (a) {
    const tmpCalleeParam$3 = $(1);
    const SSA_a$1 = $(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(SSA_a$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$7 = tmpBranchingC(a);
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
