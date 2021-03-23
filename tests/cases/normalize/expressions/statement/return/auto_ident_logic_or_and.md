# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Return > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(0)) || ($($(1)) && $($(2)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $($(0)) || ($($(1)) && $($(2)));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    let tmpReturnArg$1 = $$2;
    debugger;
    const tmpReturnArg$4 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, tmpReturnArg$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$4 = $$0;
    let tmpCalleeParam$4 = $$1;
    let tmpReturnArg$2 = $$2;
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    tmpReturnArg$2 = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpCallCallee$8 = $$0;
      let tmpCalleeParam$8 = $$1;
      let tmpReturnArg$5 = $$2;
      let tmpCallCallee$9 = $$3;
      let tmpCalleeParam$9 = $$4;
      debugger;
      const tmpCallCallee$10 = $;
      const tmpCalleeParam$10 = $(2);
      tmpReturnArg$5 = tmpCallCallee$10(tmpCalleeParam$10);
      const tmpReturnArg$8 = tmpBranchingC$1(tmpCallCallee$8, tmpCalleeParam$8, tmpReturnArg$5, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$8;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpCallCallee$11 = $$0;
      let tmpCalleeParam$11 = $$1;
      let tmpReturnArg$6 = $$2;
      let tmpCallCallee$12 = $$3;
      let tmpCalleeParam$12 = $$4;
      debugger;
      const tmpReturnArg$9 = tmpBranchingC$1(tmpCallCallee$11, tmpCalleeParam$11, tmpReturnArg$6, tmpCallCallee$12, tmpCalleeParam$12);
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpCallCallee$13 = $$0;
      let tmpCalleeParam$13 = $$1;
      let tmpReturnArg$7 = $$2;
      let tmpCallCallee$14 = $$3;
      let tmpCalleeParam$14 = $$4;
      debugger;
      const tmpReturnArg$10 = tmpBranchingC(tmpCallCallee$13, tmpCalleeParam$13, tmpReturnArg$7);
      return tmpReturnArg$10;
    };
    if (tmpReturnArg$2) {
      const tmpReturnArg$11 = tmpBranchingA$1(tmpCallCallee$4, tmpCalleeParam$4, tmpReturnArg$2, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$11;
    } else {
      const tmpReturnArg$12 = tmpBranchingB$1(tmpCallCallee$4, tmpCalleeParam$4, tmpReturnArg$2, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$12;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$7 = $$0;
    let tmpCalleeParam$7 = $$1;
    let tmpReturnArg$3 = $$2;
    debugger;
    return tmpReturnArg$3;
  };
  if (tmpReturnArg) {
    const tmpReturnArg$13 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, tmpReturnArg);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$14 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, tmpReturnArg);
    return tmpReturnArg$14;
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
const f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  const tmpReturnArg = $(tmpCalleeParam);
  const tmpBranchingB = function () {
    debugger;
    const tmpCalleeParam$5 = $(1);
    const SSA_tmpReturnArg$2 = $(tmpCalleeParam$5);
    if (SSA_tmpReturnArg$2) {
      const tmpCalleeParam$10 = $(2);
      const SSA_tmpReturnArg$5 = $(tmpCalleeParam$10);
      return SSA_tmpReturnArg$5;
    } else {
      return SSA_tmpReturnArg$2;
    }
  };
  if (tmpReturnArg) {
    return tmpReturnArg;
  } else {
    const tmpReturnArg$14 = tmpBranchingB();
    return tmpReturnArg$14;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$15 = f();
$(tmpCalleeParam$15);
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
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
