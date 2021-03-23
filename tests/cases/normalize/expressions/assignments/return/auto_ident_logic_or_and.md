# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Return > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(0)) || ($($(1)) && $($(2))));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $($(0)) || ($($(1)) && $($(2))));
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
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    debugger;
    const tmpReturnArg$2 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpCallCallee$4 = $$0;
    let tmpCalleeParam$4 = $$1;
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    a = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let tmpCallCallee$8 = $$0;
      let tmpCalleeParam$8 = $$1;
      let tmpCallCallee$9 = $$2;
      let tmpCalleeParam$9 = $$3;
      debugger;
      const tmpCallCallee$10 = $;
      const tmpCalleeParam$10 = $(2);
      a = tmpCallCallee$10(tmpCalleeParam$10);
      const tmpReturnArg$3 = tmpBranchingC$1(tmpCallCallee$8, tmpCalleeParam$8, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let tmpCallCallee$11 = $$0;
      let tmpCalleeParam$11 = $$1;
      let tmpCallCallee$12 = $$2;
      let tmpCalleeParam$12 = $$3;
      debugger;
      const tmpReturnArg$4 = tmpBranchingC$1(tmpCallCallee$11, tmpCalleeParam$11, tmpCallCallee$12, tmpCalleeParam$12);
      return tmpReturnArg$4;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let tmpCallCallee$13 = $$0;
      let tmpCalleeParam$13 = $$1;
      let tmpCallCallee$14 = $$2;
      let tmpCalleeParam$14 = $$3;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC(tmpCallCallee$13, tmpCalleeParam$13);
      return tmpReturnArg$5;
    };
    if (a) {
      const tmpReturnArg$6 = tmpBranchingA$1(tmpCallCallee$4, tmpCalleeParam$4, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$6;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(tmpCallCallee$4, tmpCalleeParam$4, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpCallCallee$7 = $$0;
    let tmpCalleeParam$7 = $$1;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (a) {
    const tmpReturnArg$8 = tmpBranchingA(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$9;
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
  a = $(tmpCalleeParam);
  const tmpBranchingB = function () {
    debugger;
    const tmpCalleeParam$5 = $(1);
    a = $(tmpCalleeParam$5);
    if (a) {
      const tmpCalleeParam$10 = $(2);
      a = $(tmpCalleeParam$10);
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$7 = tmpBranchingC();
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (a) {
    const tmpReturnArg$8 = tmpBranchingC();
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB();
    return tmpReturnArg$9;
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
