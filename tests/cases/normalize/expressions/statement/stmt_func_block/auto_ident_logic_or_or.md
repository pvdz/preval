# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    $($(0)) || $($(1)) || $($(2));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let a = { a: 999, b: 1000 };
    $($(0)) || $($(1)) || $($(2));
    $(a);
  }
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
    let tmpCallCallee$2 = $$1;
    let tmpCalleeParam$2 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$2, tmpCalleeParam$2, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$2 = $$0;
    let tmpCallCallee$3 = $$1;
    let tmpCalleeParam$3 = $$2;
    let tmpIfTest$2 = $$3;
    debugger;
    const tmpCallCallee$4 = $;
    const tmpCalleeParam$4 = $(1);
    tmpIfTest$2 = tmpCallCallee$4(tmpCalleeParam$4);
    const tmpReturnArg$1 = tmpBranchingC(a$2, tmpCallCallee$3, tmpCalleeParam$3, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let tmpCallCallee$5 = $$1;
    let tmpCalleeParam$5 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let a$4 = $$0;
      let tmpCallCallee$7 = $$1;
      let tmpCalleeParam$7 = $$2;
      let tmpIfTest$4 = $$3;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC$1(a$4, tmpCallCallee$7, tmpCalleeParam$7, tmpIfTest$4);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let a$5 = $$0;
      let tmpCallCallee$8 = $$1;
      let tmpCalleeParam$8 = $$2;
      let tmpIfTest$5 = $$3;
      debugger;
      const tmpCallCallee$9 = $;
      const tmpCalleeParam$9 = $(2);
      tmpCallCallee$9(tmpCalleeParam$9);
      const tmpReturnArg$3 = tmpBranchingC$1(a$5, tmpCallCallee$8, tmpCalleeParam$8, tmpIfTest$5);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let a$6 = $$0;
      let tmpCallCallee$10 = $$1;
      let tmpCalleeParam$10 = $$2;
      let tmpIfTest$6 = $$3;
      debugger;
      $(a$6);
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(a$3, tmpCallCallee$5, tmpCalleeParam$5, tmpIfTest$3);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(a$3, tmpCallCallee$5, tmpCalleeParam$5, tmpIfTest$3);
      return tmpReturnArg$5;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$11 = $;
const tmpCalleeParam$11 = f();
tmpCallCallee$11(tmpCalleeParam$11);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  const tmpBranchingC = function ($$0, $$1) {
    const a$3 = $$0;
    const tmpIfTest$3 = $$1;
    debugger;
    if (tmpIfTest$3) {
      $(a$3);
      return undefined;
    } else {
      const tmpCalleeParam$9 = $(2);
      $(tmpCalleeParam$9);
      $(a$3);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingC(a, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpCalleeParam$4 = $(1);
    const SSA_tmpIfTest$2 = $(tmpCalleeParam$4);
    const tmpReturnArg$1 = tmpBranchingC(a, SSA_tmpIfTest$2);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$11 = f();
$(tmpCalleeParam$11);
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
