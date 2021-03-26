# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident opt c-mem call complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = $(b)?.[$("$")]?.($(1));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { $ };
  let a = $(b)?.[$('$')]?.($(1));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4) {
    let b$1 = $$0;
    let a$1 = $$1;
    let tmpChainRootCall$1 = $$2;
    let tmpChainElementCall$3 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
    const tmpIfTest$5 = tmpChainElementObject$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let b$7 = $$0;
      let a$7 = $$1;
      let tmpChainRootCall$7 = $$2;
      let tmpChainElementCall$11 = $$3;
      let tmpIfTest$11 = $$4;
      let tmpChainRootComputed$3 = $$5;
      let tmpChainElementObject$3 = $$6;
      let tmpIfTest$13 = $$7;
      debugger;
      const tmpCallObj$3 = tmpChainElementObject$3;
      const tmpCallVal$3 = tmpCallObj$3.call;
      const tmpCalleeParam$7 = tmpChainElementCall$11;
      const tmpCalleeParam$9 = $(1);
      const tmpChainElementCall$13 = tmpCallVal$3.call(tmpCallObj$3, tmpCalleeParam$7, tmpCalleeParam$9);
      a$7 = tmpChainElementCall$13;
      const tmpReturnArg = tmpBranchingC$1(
        b$7,
        a$7,
        tmpChainRootCall$7,
        tmpChainElementCall$11,
        tmpIfTest$11,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$13,
      );
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let b$9 = $$0;
      let a$9 = $$1;
      let tmpChainRootCall$9 = $$2;
      let tmpChainElementCall$15 = $$3;
      let tmpIfTest$15 = $$4;
      let tmpChainRootComputed$5 = $$5;
      let tmpChainElementObject$5 = $$6;
      let tmpIfTest$17 = $$7;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(
        b$9,
        a$9,
        tmpChainRootCall$9,
        tmpChainElementCall$15,
        tmpIfTest$15,
        tmpChainRootComputed$5,
        tmpChainElementObject$5,
        tmpIfTest$17,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let b$11 = $$0;
      let a$11 = $$1;
      let tmpChainRootCall$11 = $$2;
      let tmpChainElementCall$17 = $$3;
      let tmpIfTest$19 = $$4;
      let tmpChainRootComputed$7 = $$5;
      let tmpChainElementObject$7 = $$6;
      let tmpIfTest$21 = $$7;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(b$11, a$11, tmpChainRootCall$11, tmpChainElementCall$17, tmpIfTest$19);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$5 = tmpBranchingA$1(
        b$1,
        a$1,
        tmpChainRootCall$1,
        tmpChainElementCall$3,
        tmpIfTest$3,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$5,
      );
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(
        b$1,
        a$1,
        tmpChainRootCall$1,
        tmpChainElementCall$3,
        tmpIfTest$3,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$5,
      );
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let b$3 = $$0;
    let a$3 = $$1;
    let tmpChainRootCall$3 = $$2;
    let tmpChainElementCall$7 = $$3;
    let tmpIfTest$7 = $$4;
    debugger;
    const tmpReturnArg$9 = tmpBranchingC(b$3, a$3, tmpChainRootCall$3, tmpChainElementCall$7, tmpIfTest$7);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let b$5 = $$0;
    let a$5 = $$1;
    let tmpChainRootCall$5 = $$2;
    let tmpChainElementCall$9 = $$3;
    let tmpIfTest$9 = $$4;
    debugger;
    $(a$5);
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam$11 = f();
tmpCallCallee(tmpCalleeParam$11);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const b = { $: $ };
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0) {
    const tmpChainElementCall$3 = $$0;
    debugger;
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
    const tmpIfTest$5 = tmpChainElementObject$1 != null;
    if (tmpIfTest$5) {
      const tmpCallVal$3 = tmpChainElementObject$1.call;
      const tmpCalleeParam$9 = $(1);
      const tmpChainElementCall$13 = tmpCallVal$3.call(tmpChainElementObject$1, tmpChainElementCall$3, tmpCalleeParam$9);
      $(tmpChainElementCall$13);
      return undefined;
    } else {
      $(undefined);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpChainElementCall);
    return tmpReturnArg$11;
  } else {
    $(undefined);
    return undefined;
  }
};
const tmpCalleeParam$11 = f();
$(tmpCalleeParam$11);
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
