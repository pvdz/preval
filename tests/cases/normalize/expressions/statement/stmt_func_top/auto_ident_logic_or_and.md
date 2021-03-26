# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($(0)) || ($($(1)) && $($(2)));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  $($(0)) || ($($(1)) && $($(2)));
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
  const tmpIfTest = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let a$1 = $$0;
    let tmpCallCallee$5 = $$1;
    let tmpCalleeParam$5 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$5, tmpCalleeParam$5, tmpIfTest$3);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let tmpCallCallee$7 = $$1;
    let tmpCalleeParam$7 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    const tmpCallCallee$9 = $;
    const tmpCalleeParam$9 = $(1);
    const tmpIfTest$7 = tmpCallCallee$9(tmpCalleeParam$9);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let a$7 = $$0;
      let tmpCallCallee$15 = $$1;
      let tmpCalleeParam$15 = $$2;
      let tmpIfTest$11 = $$3;
      let tmpCallCallee$17 = $$4;
      let tmpCalleeParam$17 = $$5;
      let tmpIfTest$13 = $$6;
      debugger;
      const tmpCallCallee$19 = $;
      const tmpCalleeParam$19 = $(2);
      tmpCallCallee$19(tmpCalleeParam$19);
      const tmpReturnArg$1 = tmpBranchingC$1(
        a$7,
        tmpCallCallee$15,
        tmpCalleeParam$15,
        tmpIfTest$11,
        tmpCallCallee$17,
        tmpCalleeParam$17,
        tmpIfTest$13,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let a$9 = $$0;
      let tmpCallCallee$21 = $$1;
      let tmpCalleeParam$21 = $$2;
      let tmpIfTest$15 = $$3;
      let tmpCallCallee$23 = $$4;
      let tmpCalleeParam$23 = $$5;
      let tmpIfTest$17 = $$6;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        a$9,
        tmpCallCallee$21,
        tmpCalleeParam$21,
        tmpIfTest$15,
        tmpCallCallee$23,
        tmpCalleeParam$23,
        tmpIfTest$17,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let a$11 = $$0;
      let tmpCallCallee$25 = $$1;
      let tmpCalleeParam$25 = $$2;
      let tmpIfTest$19 = $$3;
      let tmpCallCallee$27 = $$4;
      let tmpCalleeParam$27 = $$5;
      let tmpIfTest$21 = $$6;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC(a$11, tmpCallCallee$25, tmpCalleeParam$25, tmpIfTest$19);
      return tmpReturnArg$5;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        a$3,
        tmpCallCallee$7,
        tmpCalleeParam$7,
        tmpIfTest$5,
        tmpCallCallee$9,
        tmpCalleeParam$9,
        tmpIfTest$7,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        a$3,
        tmpCallCallee$7,
        tmpCalleeParam$7,
        tmpIfTest$5,
        tmpCallCallee$9,
        tmpCalleeParam$9,
        tmpIfTest$7,
      );
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let a$5 = $$0;
    let tmpCallCallee$13 = $$1;
    let tmpCalleeParam$13 = $$2;
    let tmpIfTest$9 = $$3;
    debugger;
    $(a$5);
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$29 = $;
const tmpCalleeParam$29 = f();
tmpCallCallee$29(tmpCalleeParam$29);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  const tmpBranchingB = function ($$0) {
    const a$3 = $$0;
    debugger;
    const tmpCalleeParam$9 = $(1);
    const tmpIfTest$7 = $(tmpCalleeParam$9);
    if (tmpIfTest$7) {
      const tmpCalleeParam$19 = $(2);
      $(tmpCalleeParam$19);
      $(a$3);
      return undefined;
    } else {
      $(a$3);
      return undefined;
    }
  };
  if (tmpIfTest) {
    $(a);
    return undefined;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(a);
    return tmpReturnArg$13;
  }
};
const tmpCalleeParam$29 = f();
$(tmpCalleeParam$29);
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
 - 7: { a: '999', b: '1000' }
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
