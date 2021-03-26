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
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
    let tmpReturnArg$1 = $$2;
    debugger;
    const tmpReturnArg$7 = tmpBranchingC(tmpCallCallee$5, tmpCalleeParam$5, tmpReturnArg$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$7 = $$0;
    let tmpCalleeParam$7 = $$1;
    let tmpReturnArg$3 = $$2;
    debugger;
    const tmpCallCallee$9 = $;
    const tmpCalleeParam$9 = $(1);
    tmpReturnArg$3 = tmpCallCallee$9(tmpCalleeParam$9);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpCallCallee$15 = $$0;
      let tmpCalleeParam$15 = $$1;
      let tmpReturnArg$9 = $$2;
      let tmpCallCallee$17 = $$3;
      let tmpCalleeParam$17 = $$4;
      debugger;
      const tmpCallCallee$19 = $;
      const tmpCalleeParam$19 = $(2);
      tmpReturnArg$9 = tmpCallCallee$19(tmpCalleeParam$19);
      const tmpReturnArg$15 = tmpBranchingC$1(tmpCallCallee$15, tmpCalleeParam$15, tmpReturnArg$9, tmpCallCallee$17, tmpCalleeParam$17);
      return tmpReturnArg$15;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpCallCallee$21 = $$0;
      let tmpCalleeParam$21 = $$1;
      let tmpReturnArg$11 = $$2;
      let tmpCallCallee$23 = $$3;
      let tmpCalleeParam$23 = $$4;
      debugger;
      const tmpReturnArg$17 = tmpBranchingC$1(tmpCallCallee$21, tmpCalleeParam$21, tmpReturnArg$11, tmpCallCallee$23, tmpCalleeParam$23);
      return tmpReturnArg$17;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpCallCallee$25 = $$0;
      let tmpCalleeParam$25 = $$1;
      let tmpReturnArg$13 = $$2;
      let tmpCallCallee$27 = $$3;
      let tmpCalleeParam$27 = $$4;
      debugger;
      const tmpReturnArg$19 = tmpBranchingC(tmpCallCallee$25, tmpCalleeParam$25, tmpReturnArg$13);
      return tmpReturnArg$19;
    };
    if (tmpReturnArg$3) {
      const tmpReturnArg$21 = tmpBranchingA$1(tmpCallCallee$7, tmpCalleeParam$7, tmpReturnArg$3, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$21;
    } else {
      const tmpReturnArg$23 = tmpBranchingB$1(tmpCallCallee$7, tmpCalleeParam$7, tmpReturnArg$3, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$23;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$13 = $$0;
    let tmpCalleeParam$13 = $$1;
    let tmpReturnArg$5 = $$2;
    debugger;
    return tmpReturnArg$5;
  };
  if (tmpReturnArg) {
    const tmpReturnArg$25 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, tmpReturnArg);
    return tmpReturnArg$25;
  } else {
    const tmpReturnArg$27 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, tmpReturnArg);
    return tmpReturnArg$27;
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
  const tmpReturnArg = $(tmpCalleeParam);
  const tmpBranchingB = function () {
    debugger;
    const tmpCalleeParam$9 = $(1);
    const SSA_tmpReturnArg$3 = $(tmpCalleeParam$9);
    if (SSA_tmpReturnArg$3) {
      const tmpCalleeParam$19 = $(2);
      const SSA_tmpReturnArg$9 = $(tmpCalleeParam$19);
      return SSA_tmpReturnArg$9;
    } else {
      return SSA_tmpReturnArg$3;
    }
  };
  if (tmpReturnArg) {
    return tmpReturnArg;
  } else {
    const tmpReturnArg$27 = tmpBranchingB();
    return tmpReturnArg$27;
  }
};
const a = { a: 999, b: 1000 };
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
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
