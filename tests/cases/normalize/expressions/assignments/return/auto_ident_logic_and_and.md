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
    let tmpCallCallee$2 = $$0;
    let tmpCalleeParam$2 = $$1;
    debugger;
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    a = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg$2 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpCallCallee$4 = $$0;
    let tmpCalleeParam$4 = $$1;
    debugger;
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$4, tmpCalleeParam$4);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpCallCallee$7 = $$0;
      let tmpCalleeParam$7 = $$1;
      debugger;
      const tmpCallCallee$8 = $;
      const tmpCalleeParam$8 = $(2);
      a = tmpCallCallee$8(tmpCalleeParam$8);
      const tmpReturnArg$5 = tmpBranchingC$1(tmpCallCallee$7, tmpCalleeParam$7);
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpCallCallee$9 = $$0;
      let tmpCalleeParam$9 = $$1;
      debugger;
      const tmpReturnArg$6 = tmpBranchingC$1(tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$6;
    };
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpCallCallee$10 = $$0;
      let tmpCalleeParam$10 = $$1;
      debugger;
      let tmpReturnArg$4 = a;
      return tmpReturnArg$4;
    };
    if (a) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$8;
    }
  };
  if (a) {
    const tmpReturnArg$9 = tmpBranchingA(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$9;
  } else {
    const tmpReturnArg$10 = tmpBranchingB(tmpCallCallee, tmpCalleeParam);
    return tmpReturnArg$10;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$11 = $;
const tmpCalleeParam$11 = f();
tmpCallCallee$11(tmpCalleeParam$11);
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
      const tmpReturnArg$4 = a;
      return tmpReturnArg$4;
    };
    if (a) {
      const tmpCalleeParam$8 = $(2);
      a = $(tmpCalleeParam$8);
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$8 = tmpBranchingC$1();
      return tmpReturnArg$8;
    }
  };
  if (a) {
    const tmpCalleeParam$3 = $(1);
    a = $(tmpCalleeParam$3);
    const tmpReturnArg$2 = tmpBranchingC();
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$10 = tmpBranchingC();
    return tmpReturnArg$10;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$11 = f();
$(tmpCalleeParam$11);
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
