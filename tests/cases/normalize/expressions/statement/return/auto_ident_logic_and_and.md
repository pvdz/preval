# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Return > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(1)) && $($(1)) && $($(2));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $($(1)) && $($(1)) && $($(2));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (tmpCallCallee$2, tmpCalleeParam$2, tmpReturnArg$1) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    tmpReturnArg$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg$4 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, tmpReturnArg$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function (tmpCallCallee$4, tmpCalleeParam$4, tmpReturnArg$2) {
    const tmpReturnArg$5 = tmpBranchingC(tmpCallCallee$4, tmpCalleeParam$4, tmpReturnArg$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpCallCallee$5, tmpCalleeParam$5, tmpReturnArg$3) {
    const tmpBranchingA$1 = function (tmpCallCallee$7, tmpCalleeParam$7, tmpReturnArg$6) {
      const tmpCallCallee$8 = $;
      const tmpCalleeParam$8 = $(2);
      tmpReturnArg$6 = tmpCallCallee$8(tmpCalleeParam$8);
      const tmpReturnArg$9 = tmpBranchingC$1(tmpCallCallee$7, tmpCalleeParam$7, tmpReturnArg$6);
      return tmpReturnArg$9;
    };
    const tmpBranchingB$1 = function (tmpCallCallee$9, tmpCalleeParam$9, tmpReturnArg$7) {
      const tmpReturnArg$10 = tmpBranchingC$1(tmpCallCallee$9, tmpCalleeParam$9, tmpReturnArg$7);
      return tmpReturnArg$10;
    };
    const tmpBranchingC$1 = function (tmpCallCallee$10, tmpCalleeParam$10, tmpReturnArg$8) {
      return tmpReturnArg$8;
    };
    if (tmpReturnArg$3) {
      const tmpReturnArg$11 = tmpBranchingA$1(tmpCallCallee$5, tmpCalleeParam$5, tmpReturnArg$3);
      return tmpReturnArg$11;
    } else {
      const tmpReturnArg$12 = tmpBranchingB$1(tmpCallCallee$5, tmpCalleeParam$5, tmpReturnArg$3);
      return tmpReturnArg$12;
    }
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
const tmpCallCallee$11 = $;
const tmpCalleeParam$11 = f();
tmpCallCallee$11(tmpCalleeParam$11);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = $(1);
  const tmpReturnArg = $(tmpCalleeParam);
  const tmpBranchingC = function (tmpReturnArg$3) {
    if (tmpReturnArg$3) {
      const tmpCalleeParam$8 = $(2);
      const SSA_tmpReturnArg$6 = $(tmpCalleeParam$8);
      return SSA_tmpReturnArg$6;
    } else {
      return tmpReturnArg$3;
    }
  };
  if (tmpReturnArg) {
    const tmpCalleeParam$3 = $(1);
    const SSA_tmpReturnArg$1 = $(tmpCalleeParam$3);
    const tmpReturnArg$4 = tmpBranchingC(SSA_tmpReturnArg$1);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$14 = tmpBranchingC(tmpReturnArg);
    return tmpReturnArg$14;
  }
};
const a = { a: 999, b: 1000 };
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
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
