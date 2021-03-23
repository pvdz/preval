# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    a = $(b)?.[$("$")]?.($(1));
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
    let b = { $ };
    let a = { a: 999, b: 1000 };
    a = $(b)?.[$('$')]?.($(1));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4) {
    let b$1 = $$0;
    let a$1 = $$1;
    let tmpChainRootCall$1 = $$2;
    let tmpChainElementCall$2 = $$3;
    let tmpIfTest$2 = $$4;
    debugger;
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let b$4 = $$0;
      let a$4 = $$1;
      let tmpChainRootCall$4 = $$2;
      let tmpChainElementCall$6 = $$3;
      let tmpIfTest$6 = $$4;
      let tmpChainRootComputed$2 = $$5;
      let tmpChainElementObject$2 = $$6;
      let tmpIfTest$7 = $$7;
      debugger;
      const tmpCallObj$2 = tmpChainElementObject$2;
      const tmpCallVal$2 = tmpCallObj$2.call;
      const tmpCalleeParam$4 = tmpChainElementCall$6;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$7 = tmpCallVal$2.call(tmpCallObj$2, tmpCalleeParam$4, tmpCalleeParam$5);
      a$4 = tmpChainElementCall$7;
      const tmpReturnArg = tmpBranchingC$1(
        b$4,
        a$4,
        tmpChainRootCall$4,
        tmpChainElementCall$6,
        tmpIfTest$6,
        tmpChainRootComputed$2,
        tmpChainElementObject$2,
        tmpIfTest$7,
      );
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let b$5 = $$0;
      let a$5 = $$1;
      let tmpChainRootCall$5 = $$2;
      let tmpChainElementCall$8 = $$3;
      let tmpIfTest$8 = $$4;
      let tmpChainRootComputed$3 = $$5;
      let tmpChainElementObject$3 = $$6;
      let tmpIfTest$9 = $$7;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(
        b$5,
        a$5,
        tmpChainRootCall$5,
        tmpChainElementCall$8,
        tmpIfTest$8,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$9,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let b$6 = $$0;
      let a$6 = $$1;
      let tmpChainRootCall$6 = $$2;
      let tmpChainElementCall$9 = $$3;
      let tmpIfTest$10 = $$4;
      let tmpChainRootComputed$4 = $$5;
      let tmpChainElementObject$4 = $$6;
      let tmpIfTest$11 = $$7;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC(b$6, a$6, tmpChainRootCall$6, tmpChainElementCall$9, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(
        b$1,
        a$1,
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$2,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$3,
      );
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(
        b$1,
        a$1,
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$2,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$3,
      );
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let b$2 = $$0;
    let a$2 = $$1;
    let tmpChainRootCall$2 = $$2;
    let tmpChainElementCall$4 = $$3;
    let tmpIfTest$4 = $$4;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(b$2, a$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let b$3 = $$0;
    let a$3 = $$1;
    let tmpChainRootCall$3 = $$2;
    let tmpChainElementCall$5 = $$3;
    let tmpIfTest$5 = $$4;
    debugger;
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam$6 = f();
tmpCallCallee(tmpCalleeParam$6);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const b = { $: $ };
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0) {
    const tmpChainElementCall$2 = $$0;
    debugger;
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    if (tmpIfTest$3) {
      const tmpCallVal$2 = tmpChainElementObject$1.call;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$7 = tmpCallVal$2.call(tmpChainElementObject$1, tmpChainElementCall$2, tmpCalleeParam$5);
      $(tmpChainElementCall$7);
      return undefined;
    } else {
      $(undefined);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpChainElementCall);
    return tmpReturnArg$6;
  } else {
    $(undefined);
    return undefined;
  }
};
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
