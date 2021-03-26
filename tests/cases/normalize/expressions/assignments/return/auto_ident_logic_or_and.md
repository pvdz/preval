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
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
    debugger;
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$5, tmpCalleeParam$5);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpCallCallee$7 = $$0;
    let tmpCalleeParam$7 = $$1;
    debugger;
    const tmpCallCallee$9 = $;
    const tmpCalleeParam$9 = $(1);
    a = tmpCallCallee$9(tmpCalleeParam$9);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let tmpCallCallee$15 = $$0;
      let tmpCalleeParam$15 = $$1;
      let tmpCallCallee$17 = $$2;
      let tmpCalleeParam$17 = $$3;
      debugger;
      const tmpCallCallee$19 = $;
      const tmpCalleeParam$19 = $(2);
      a = tmpCallCallee$19(tmpCalleeParam$19);
      const tmpReturnArg$5 = tmpBranchingC$1(tmpCallCallee$15, tmpCalleeParam$15, tmpCallCallee$17, tmpCalleeParam$17);
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let tmpCallCallee$21 = $$0;
      let tmpCalleeParam$21 = $$1;
      let tmpCallCallee$23 = $$2;
      let tmpCalleeParam$23 = $$3;
      debugger;
      const tmpReturnArg$7 = tmpBranchingC$1(tmpCallCallee$21, tmpCalleeParam$21, tmpCallCallee$23, tmpCalleeParam$23);
      return tmpReturnArg$7;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let tmpCallCallee$25 = $$0;
      let tmpCalleeParam$25 = $$1;
      let tmpCallCallee$27 = $$2;
      let tmpCalleeParam$27 = $$3;
      debugger;
      const tmpReturnArg$9 = tmpBranchingC(tmpCallCallee$25, tmpCalleeParam$25);
      return tmpReturnArg$9;
    };
    if (a) {
      const tmpReturnArg$11 = tmpBranchingA$1(tmpCallCallee$7, tmpCalleeParam$7, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$11;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(tmpCallCallee$7, tmpCalleeParam$7, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$13;
    }
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpCallCallee$13 = $$0;
    let tmpCalleeParam$13 = $$1;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (a) {
    const tmpReturnArg$15 = tmpBranchingA(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingB(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$17;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$29 = $;
const tmpCalleeParam$29 = f();
tmpCallCallee$29(tmpCalleeParam$29);
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
    const tmpCalleeParam$9 = $(1);
    a = $(tmpCalleeParam$9);
    if (a) {
      const tmpCalleeParam$19 = $(2);
      a = $(tmpCalleeParam$19);
      const tmpReturnArg$5 = tmpBranchingC();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$13 = tmpBranchingC();
      return tmpReturnArg$13;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (a) {
    const tmpReturnArg$15 = tmpBranchingC();
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingB();
    return tmpReturnArg$17;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$29 = f();
$(tmpCalleeParam$29);
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
