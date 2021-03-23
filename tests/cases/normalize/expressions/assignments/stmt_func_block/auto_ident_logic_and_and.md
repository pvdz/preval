# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = $($(1)) && $($(1)) && $($(2));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let a = { a: 999, b: 1000 };
    a = $($(1)) && $($(1)) && $($(2));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let a$1 = $$0;
    let tmpCallCallee$2 = $$1;
    let tmpCalleeParam$2 = $$2;
    debugger;
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    a$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$2, tmpCalleeParam$2);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let a$2 = $$0;
    let tmpCallCallee$4 = $$1;
    let tmpCalleeParam$4 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$2, tmpCallCallee$4, tmpCalleeParam$4);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let a$3 = $$0;
    let tmpCallCallee$5 = $$1;
    let tmpCalleeParam$5 = $$2;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let a$4 = $$0;
      let tmpCallCallee$7 = $$1;
      let tmpCalleeParam$7 = $$2;
      debugger;
      const tmpCallCallee$8 = $;
      const tmpCalleeParam$8 = $(2);
      a$4 = tmpCallCallee$8(tmpCalleeParam$8);
      const tmpReturnArg$2 = tmpBranchingC$1(a$4, tmpCallCallee$7, tmpCalleeParam$7);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let a$5 = $$0;
      let tmpCallCallee$9 = $$1;
      let tmpCalleeParam$9 = $$2;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(a$5, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let a$6 = $$0;
      let tmpCallCallee$10 = $$1;
      let tmpCalleeParam$10 = $$2;
      debugger;
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
  debugger;
  const tmpCalleeParam = $(1);
  const SSA_a = $(tmpCalleeParam);
  const tmpBranchingC = function ($$0) {
    const a$3 = $$0;
    debugger;
    if (a$3) {
      const tmpCalleeParam$8 = $(2);
      const SSA_a$4 = $(tmpCalleeParam$8);
      $(SSA_a$4);
      return undefined;
    } else {
      $(a$3);
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
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
