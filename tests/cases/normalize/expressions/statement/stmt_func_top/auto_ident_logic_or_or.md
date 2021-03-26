# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($(0)) || $($(1)) || $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  $($(0)) || $($(1)) || $($(2));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let a$1 = $$0;
    let tmpCallCallee$3 = $$1;
    let tmpCalleeParam$3 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$3, tmpCalleeParam$3, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let tmpCallCallee$5 = $$1;
    let tmpCalleeParam$5 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpCallCallee$7 = $;
    const tmpCalleeParam$7 = $(1);
    tmpIfTest$3 = tmpCallCallee$7(tmpCalleeParam$7);
    const tmpReturnArg$1 = tmpBranchingC(a$3, tmpCallCallee$5, tmpCalleeParam$5, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let a$5 = $$0;
    let tmpCallCallee$9 = $$1;
    let tmpCalleeParam$9 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let a$7 = $$0;
      let tmpCallCallee$13 = $$1;
      let tmpCalleeParam$13 = $$2;
      let tmpIfTest$7 = $$3;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(a$7, tmpCallCallee$13, tmpCalleeParam$13, tmpIfTest$7);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let a$9 = $$0;
      let tmpCallCallee$15 = $$1;
      let tmpCalleeParam$15 = $$2;
      let tmpIfTest$9 = $$3;
      debugger;
      const tmpCallCallee$17 = $;
      const tmpCalleeParam$17 = $(2);
      tmpCallCallee$17(tmpCalleeParam$17);
      const tmpReturnArg$5 = tmpBranchingC$1(a$9, tmpCallCallee$15, tmpCalleeParam$15, tmpIfTest$9);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let a$11 = $$0;
      let tmpCallCallee$19 = $$1;
      let tmpCalleeParam$19 = $$2;
      let tmpIfTest$11 = $$3;
      debugger;
      $(a$11);
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$7 = tmpBranchingA$1(a$5, tmpCallCallee$9, tmpCalleeParam$9, tmpIfTest$5);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(a$5, tmpCallCallee$9, tmpCalleeParam$9, tmpIfTest$5);
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$21 = $;
const tmpCalleeParam$21 = f();
tmpCallCallee$21(tmpCalleeParam$21);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  const tmpBranchingC = function ($$0, $$1) {
    const a$5 = $$0;
    const tmpIfTest$5 = $$1;
    debugger;
    if (tmpIfTest$5) {
      $(a$5);
      return undefined;
    } else {
      const tmpCalleeParam$17 = $(2);
      $(tmpCalleeParam$17);
      $(a$5);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingC(a, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpCalleeParam$7 = $(1);
    const SSA_tmpIfTest$3 = $(tmpCalleeParam$7);
    const tmpReturnArg$1 = tmpBranchingC(a, SSA_tmpIfTest$3);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$21 = f();
$(tmpCalleeParam$21);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
