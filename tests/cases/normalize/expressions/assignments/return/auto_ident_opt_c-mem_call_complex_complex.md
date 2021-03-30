# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = $(b)?.[$("$")]?.($(1)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $(b)?.[$('$')]?.($(1)));
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpChainRootCall$1 = $$0;
    let tmpChainElementCall$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
    const tmpIfTest$5 = tmpChainElementObject$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootCall$7 = $$0;
      let tmpChainElementCall$11 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpChainRootComputed$3 = $$3;
      let tmpChainElementObject$3 = $$4;
      let tmpIfTest$13 = $$5;
      debugger;
      const tmpCallObj$3 = tmpChainElementObject$3;
      const tmpCallVal$3 = tmpCallObj$3.call;
      const tmpCalleeParam$7 = tmpChainElementCall$11;
      const tmpCalleeParam$9 = $(1);
      const tmpChainElementCall$13 = tmpCallVal$3.call(tmpCallObj$3, tmpCalleeParam$7, tmpCalleeParam$9);
      a = tmpChainElementCall$13;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpChainRootCall$7,
        tmpChainElementCall$11,
        tmpIfTest$11,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$13,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootCall$9 = $$0;
      let tmpChainElementCall$15 = $$1;
      let tmpIfTest$15 = $$2;
      let tmpChainRootComputed$5 = $$3;
      let tmpChainElementObject$5 = $$4;
      let tmpIfTest$17 = $$5;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpChainRootCall$9,
        tmpChainElementCall$15,
        tmpIfTest$15,
        tmpChainRootComputed$5,
        tmpChainElementObject$5,
        tmpIfTest$17,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootCall$11 = $$0;
      let tmpChainElementCall$17 = $$1;
      let tmpIfTest$19 = $$2;
      let tmpChainRootComputed$7 = $$3;
      let tmpChainElementObject$7 = $$4;
      let tmpIfTest$21 = $$5;
      debugger;
      const tmpReturnArg$7 = tmpBranchingC(tmpChainRootCall$11, tmpChainElementCall$17, tmpIfTest$19);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$9 = tmpBranchingA$1(
        tmpChainRootCall$1,
        tmpChainElementCall$3,
        tmpIfTest$3,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$5,
      );
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(
        tmpChainRootCall$1,
        tmpChainElementCall$3,
        tmpIfTest$3,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$5,
      );
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpChainRootCall$3 = $$0;
    let tmpChainElementCall$7 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
    const tmpReturnArg$13 = tmpBranchingC(tmpChainRootCall$3, tmpChainElementCall$7, tmpIfTest$7);
    return tmpReturnArg$13;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpChainRootCall$5 = $$0;
    let tmpChainElementCall$9 = $$1;
    let tmpIfTest$9 = $$2;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA(tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingB(tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$17;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$11 = f();
tmpCallCallee(tmpCalleeParam$11);
$(a);
`````

## Output

`````js filename=intro
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
    a = tmpChainElementCall$13;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$11 = tmpBranchingC();
    return tmpReturnArg$11;
  }
};
const tmpBranchingC = function () {
  debugger;
  const tmpReturnArg$1 = a;
  return tmpReturnArg$1;
};
const f = function () {
  debugger;
  a = undefined;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA(tmpChainElementCall);
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingC();
    return tmpReturnArg$17;
  }
};
const b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$11 = f();
$(tmpCalleeParam$11);
$(a);
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
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
