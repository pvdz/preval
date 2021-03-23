# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = $($(0)) || ($($(1)) && $($(2)));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = $($(0)) || ($($(1)) && $($(2)));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let a$1 = $$0;
    let tmpCallCallee$3 = $$1;
    let tmpCalleeParam$3 = $$2;
    debugger;
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$3, tmpCalleeParam$3);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let a$2 = $$0;
    let tmpCallCallee$4 = $$1;
    let tmpCalleeParam$4 = $$2;
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    a$2 = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let a$4 = $$0;
      let tmpCallCallee$8 = $$1;
      let tmpCalleeParam$8 = $$2;
      let tmpCallCallee$9 = $$3;
      let tmpCalleeParam$9 = $$4;
      debugger;
      const tmpCallCallee$10 = $;
      const tmpCalleeParam$10 = $(2);
      a$4 = tmpCallCallee$10(tmpCalleeParam$10);
      const tmpReturnArg$1 = tmpBranchingC$1(a$4, tmpCallCallee$8, tmpCalleeParam$8, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let a$5 = $$0;
      let tmpCallCallee$11 = $$1;
      let tmpCalleeParam$11 = $$2;
      let tmpCallCallee$12 = $$3;
      let tmpCalleeParam$12 = $$4;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC$1(a$5, tmpCallCallee$11, tmpCalleeParam$11, tmpCallCallee$12, tmpCalleeParam$12);
      return tmpReturnArg$2;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let a$6 = $$0;
      let tmpCallCallee$13 = $$1;
      let tmpCalleeParam$13 = $$2;
      let tmpCallCallee$14 = $$3;
      let tmpCalleeParam$14 = $$4;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(a$6, tmpCallCallee$13, tmpCalleeParam$13);
      return tmpReturnArg$3;
    };
    if (a$2) {
      const tmpReturnArg$4 = tmpBranchingA$1(a$2, tmpCallCallee$4, tmpCalleeParam$4, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(a$2, tmpCallCallee$4, tmpCalleeParam$4, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$5;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let a$3 = $$0;
    let tmpCallCallee$7 = $$1;
    let tmpCalleeParam$7 = $$2;
    debugger;
    $(a$3);
  };
  if (a) {
    const tmpReturnArg$6 = tmpBranchingA(a, tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(a, tmpCallCallee, tmpCalleeParam);
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
  debugger;
  const tmpCalleeParam = $(0);
  const SSA_a = $(tmpCalleeParam);
  const tmpBranchingB = function () {
    debugger;
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
  if (SSA_a) {
    $(SSA_a);
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
