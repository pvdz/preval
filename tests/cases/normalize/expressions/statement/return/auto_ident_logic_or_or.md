# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Return > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(0)) || $($(1)) || $($(2));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $($(0)) || $($(1)) || $($(2));
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
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (tmpCallCallee$2, tmpCalleeParam$2, tmpReturnArg$1) {
    const tmpReturnArg$4 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, tmpReturnArg$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function (tmpCallCallee$3, tmpCalleeParam$3, tmpReturnArg$2) {
    const tmpCallCallee$4 = $;
    const tmpCalleeParam$4 = $(1);
    tmpReturnArg$2 = tmpCallCallee$4(tmpCalleeParam$4);
    const tmpReturnArg$5 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, tmpReturnArg$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpCallCallee$5, tmpCalleeParam$5, tmpReturnArg$3) {
    const tmpBranchingA$1 = function (tmpCallCallee$7, tmpCalleeParam$7, tmpReturnArg$6) {
      const tmpReturnArg$9 = tmpBranchingC$1(tmpCallCallee$7, tmpCalleeParam$7, tmpReturnArg$6);
      return tmpReturnArg$9;
    };
    const tmpBranchingB$1 = function (tmpCallCallee$8, tmpCalleeParam$8, tmpReturnArg$7) {
      const tmpCallCallee$9 = $;
      const tmpCalleeParam$9 = $(2);
      tmpReturnArg$7 = tmpCallCallee$9(tmpCalleeParam$9);
      const tmpReturnArg$10 = tmpBranchingC$1(tmpCallCallee$8, tmpCalleeParam$8, tmpReturnArg$7);
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
  const tmpCalleeParam = $(0);
  const tmpReturnArg = $(tmpCalleeParam);
  const tmpBranchingC = function (tmpReturnArg$3) {
    if (tmpReturnArg$3) {
      return tmpReturnArg$3;
    } else {
      const tmpCalleeParam$9 = $(2);
      const SSA_tmpReturnArg$7 = $(tmpCalleeParam$9);
      return SSA_tmpReturnArg$7;
    }
  };
  if (tmpReturnArg) {
    const tmpReturnArg$13 = tmpBranchingC(tmpReturnArg);
    return tmpReturnArg$13;
  } else {
    const tmpCalleeParam$4 = $(1);
    const SSA_tmpReturnArg$2 = $(tmpCalleeParam$4);
    const tmpReturnArg$5 = tmpBranchingC(SSA_tmpReturnArg$2);
    return tmpReturnArg$5;
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
