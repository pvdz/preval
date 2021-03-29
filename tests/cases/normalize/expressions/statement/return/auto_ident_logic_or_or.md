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
  debugger;
  return $($(0)) || $($(1)) || $($(2));
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
    const tmpReturnArg$7 = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, tmpReturnArg$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
    let tmpReturnArg$3 = $$2;
    debugger;
    const tmpCallCallee$7 = $;
    const tmpCalleeParam$7 = $(1);
    tmpReturnArg$3 = tmpCallCallee$7(tmpCalleeParam$7);
    const tmpReturnArg$9 = tmpBranchingC(tmpCallCallee$5, tmpCalleeParam$5, tmpReturnArg$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$9 = $$0;
    let tmpCalleeParam$9 = $$1;
    let tmpReturnArg$5 = $$2;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let tmpCallCallee$13 = $$0;
      let tmpCalleeParam$13 = $$1;
      let tmpReturnArg$11 = $$2;
      debugger;
      const tmpReturnArg$17 = tmpBranchingC$1(tmpCallCallee$13, tmpCalleeParam$13, tmpReturnArg$11);
      return tmpReturnArg$17;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let tmpCallCallee$15 = $$0;
      let tmpCalleeParam$15 = $$1;
      let tmpReturnArg$13 = $$2;
      debugger;
      const tmpCallCallee$17 = $;
      const tmpCalleeParam$17 = $(2);
      tmpReturnArg$13 = tmpCallCallee$17(tmpCalleeParam$17);
      const tmpReturnArg$19 = tmpBranchingC$1(tmpCallCallee$15, tmpCalleeParam$15, tmpReturnArg$13);
      return tmpReturnArg$19;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let tmpCallCallee$19 = $$0;
      let tmpCalleeParam$19 = $$1;
      let tmpReturnArg$15 = $$2;
      debugger;
      return tmpReturnArg$15;
    };
    if (tmpReturnArg$5) {
      const tmpReturnArg$21 = tmpBranchingA$1(tmpCallCallee$9, tmpCalleeParam$9, tmpReturnArg$5);
      return tmpReturnArg$21;
    } else {
      const tmpReturnArg$23 = tmpBranchingB$1(tmpCallCallee$9, tmpCalleeParam$9, tmpReturnArg$5);
      return tmpReturnArg$23;
    }
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
const tmpCallCallee$21 = $;
const tmpCalleeParam$21 = f();
tmpCallCallee$21(tmpCalleeParam$21);
$(a);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const tmpReturnArg$5 = $$0;
  debugger;
  if (tmpReturnArg$5) {
    return tmpReturnArg$5;
  } else {
    const tmpCalleeParam$17 = $(2);
    const SSA_tmpReturnArg$13 = $(tmpCalleeParam$17);
    return SSA_tmpReturnArg$13;
  }
};
const f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  const tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    const tmpReturnArg$25 = tmpBranchingC(tmpReturnArg);
    return tmpReturnArg$25;
  } else {
    const tmpCalleeParam$7 = $(1);
    const SSA_tmpReturnArg$3 = $(tmpCalleeParam$7);
    const tmpReturnArg$9 = tmpBranchingC(SSA_tmpReturnArg$3);
    return tmpReturnArg$9;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$21 = f();
$(tmpCalleeParam$21);
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
