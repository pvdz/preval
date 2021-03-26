# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($(1)) && $($(1)) && $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  $($(1)) && $($(1)) && $($(2));
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
  const tmpCalleeParam = $(1);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let a$1 = $$0;
    let tmpCallCallee$3 = $$1;
    let tmpCalleeParam$3 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    tmpIfTest$1 = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$3, tmpCalleeParam$3, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let tmpCallCallee$7 = $$1;
    let tmpCalleeParam$7 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$3, tmpCallCallee$7, tmpCalleeParam$7, tmpIfTest$3);
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
      const tmpCallCallee$15 = $;
      const tmpCalleeParam$15 = $(2);
      tmpCallCallee$15(tmpCalleeParam$15);
      const tmpReturnArg$3 = tmpBranchingC$1(a$7, tmpCallCallee$13, tmpCalleeParam$13, tmpIfTest$7);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let a$9 = $$0;
      let tmpCallCallee$17 = $$1;
      let tmpCalleeParam$17 = $$2;
      let tmpIfTest$9 = $$3;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(a$9, tmpCallCallee$17, tmpCalleeParam$17, tmpIfTest$9);
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
  const tmpCalleeParam = $(1);
  const tmpIfTest = $(tmpCalleeParam);
  const tmpBranchingC = function ($$0, $$1) {
    const a$5 = $$0;
    const tmpIfTest$5 = $$1;
    debugger;
    if (tmpIfTest$5) {
      const tmpCalleeParam$15 = $(2);
      $(tmpCalleeParam$15);
      $(a$5);
      return undefined;
    } else {
      $(a$5);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpCalleeParam$5 = $(1);
    const SSA_tmpIfTest$1 = $(tmpCalleeParam$5);
    const tmpReturnArg = tmpBranchingC(a, SSA_tmpIfTest$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$13 = tmpBranchingC(a, tmpIfTest);
    return tmpReturnArg$13;
  }
};
const tmpCalleeParam$21 = f();
$(tmpCalleeParam$21);
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
 - 7: { a: '999', b: '1000' }
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
