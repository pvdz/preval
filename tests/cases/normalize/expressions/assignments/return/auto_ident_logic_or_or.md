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
  return (a = $($(0)) || $($(1)) || $($(2)));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (tmpCallCallee$2, tmpCalleeParam$2) {
    const tmpReturnArg$2 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpCallCallee$3, tmpCalleeParam$3) {
    const tmpCallCallee$4 = $;
    const tmpCalleeParam$4 = $(1);
    a = tmpCallCallee$4(tmpCalleeParam$4);
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function (tmpCallCallee$5, tmpCalleeParam$5) {
    const tmpBranchingA$1 = function (tmpCallCallee$7, tmpCalleeParam$7) {
      const tmpReturnArg$5 = tmpBranchingC$1(tmpCallCallee$7, tmpCalleeParam$7);
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function (tmpCallCallee$8, tmpCalleeParam$8) {
      const tmpCallCallee$9 = $;
      const tmpCalleeParam$9 = $(2);
      a = tmpCallCallee$9(tmpCalleeParam$9);
      const tmpReturnArg$6 = tmpBranchingC$1(tmpCallCallee$8, tmpCalleeParam$8);
      return tmpReturnArg$6;
    };
    const tmpBranchingC$1 = function (tmpCallCallee$10, tmpCalleeParam$10) {
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
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  const tmpBranchingC = function () {
    const tmpBranchingC$1 = function () {
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
