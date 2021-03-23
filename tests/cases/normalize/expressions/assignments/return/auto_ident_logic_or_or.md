# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Return > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(0)) || $($(1)) || $($(2)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $($(0)) || $($(1)) || $($(2)));
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
    let tmpCallCallee$2 = $$0;
    let tmpCalleeParam$2 = $$1;
    debugger;
    const tmpReturnArg$2 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    debugger;
    const tmpCallCallee$4 = $;
    const tmpCalleeParam$4 = $(1);
    a = tmpCallCallee$4(tmpCalleeParam$4);
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3);
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
      const tmpReturnArg$5 = tmpBranchingC$1(tmpCallCallee$7, tmpCalleeParam$7);
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpCallCallee$8 = $$0;
      let tmpCalleeParam$8 = $$1;
      debugger;
      const tmpCallCallee$9 = $;
      const tmpCalleeParam$9 = $(2);
      a = tmpCallCallee$9(tmpCalleeParam$9);
      const tmpReturnArg$6 = tmpBranchingC$1(tmpCallCallee$8, tmpCalleeParam$8);
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
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  const tmpBranchingC = function () {
    debugger;
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$4 = a;
      return tmpReturnArg$4;
    };
    if (a) {
      const tmpReturnArg$7 = tmpBranchingC$1();
      return tmpReturnArg$7;
    } else {
      const tmpCalleeParam$9 = $(2);
      a = $(tmpCalleeParam$9);
      const tmpReturnArg$6 = tmpBranchingC$1();
      return tmpReturnArg$6;
    }
  };
  if (a) {
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  } else {
    const tmpCalleeParam$4 = $(1);
    a = $(tmpCalleeParam$4);
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
