# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Return > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(1)) && $($(1)) && $($(2)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $($(1)) && $($(1)) && $($(2)));
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
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    a = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpCallCallee$7 = $$0;
    let tmpCalleeParam$7 = $$1;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpCallCallee$7, tmpCalleeParam$7);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpCallCallee$9 = $$0;
    let tmpCalleeParam$9 = $$1;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpCallCallee$13 = $$0;
      let tmpCalleeParam$13 = $$1;
      debugger;
      const tmpCallCallee$15 = $;
      const tmpCalleeParam$15 = $(2);
      a = tmpCallCallee$15(tmpCalleeParam$15);
      const tmpReturnArg$9 = tmpBranchingC$1(tmpCallCallee$13, tmpCalleeParam$13);
      return tmpReturnArg$9;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpCallCallee$17 = $$0;
      let tmpCalleeParam$17 = $$1;
      debugger;
      const tmpReturnArg$11 = tmpBranchingC$1(tmpCallCallee$17, tmpCalleeParam$17);
      return tmpReturnArg$11;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpCallCallee$19 = $$0;
      let tmpCalleeParam$19 = $$1;
      debugger;
      let tmpReturnArg$7 = a;
      return tmpReturnArg$7;
    };
    if (a) {
      const tmpReturnArg$13 = tmpBranchingA$1(tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1(tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$15;
    }
  };
  if (a) {
    const tmpReturnArg$17 = tmpBranchingA(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$17;
  } else {
    const tmpReturnArg$19 = tmpBranchingB(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$19;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$21 = $;
const tmpCalleeParam$21 = f();
tmpCallCallee$21(tmpCalleeParam$21);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  const tmpBranchingC = function () {
    debugger;
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$7 = a;
      return tmpReturnArg$7;
    };
    if (a) {
      const tmpCalleeParam$15 = $(2);
      a = $(tmpCalleeParam$15);
      const tmpReturnArg$9 = tmpBranchingC$1();
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$15 = tmpBranchingC$1();
      return tmpReturnArg$15;
    }
  };
  if (a) {
    const tmpCalleeParam$5 = $(1);
    a = $(tmpCalleeParam$5);
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$19 = tmpBranchingC();
    return tmpReturnArg$19;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$21 = f();
$(tmpCalleeParam$21);
$(a);
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
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
