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
let b = { $ };
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
    let tmpChainElementCall$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootCall$4 = $$0;
      let tmpChainElementCall$6 = $$1;
      let tmpIfTest$6 = $$2;
      let tmpChainRootComputed$2 = $$3;
      let tmpChainElementObject$2 = $$4;
      let tmpIfTest$7 = $$5;
      debugger;
      const tmpCallObj$2 = tmpChainElementObject$2;
      const tmpCallVal$2 = tmpCallObj$2.call;
      const tmpCalleeParam$4 = tmpChainElementCall$6;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$7 = tmpCallVal$2.call(tmpCallObj$2, tmpCalleeParam$4, tmpCalleeParam$5);
      a = tmpChainElementCall$7;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpChainRootCall$4,
        tmpChainElementCall$6,
        tmpIfTest$6,
        tmpChainRootComputed$2,
        tmpChainElementObject$2,
        tmpIfTest$7,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootCall$5 = $$0;
      let tmpChainElementCall$8 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpChainRootComputed$3 = $$3;
      let tmpChainElementObject$3 = $$4;
      let tmpIfTest$9 = $$5;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpChainRootCall$5,
        tmpChainElementCall$8,
        tmpIfTest$8,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$9,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootCall$6 = $$0;
      let tmpChainElementCall$9 = $$1;
      let tmpIfTest$10 = $$2;
      let tmpChainRootComputed$4 = $$3;
      let tmpChainElementObject$4 = $$4;
      let tmpIfTest$11 = $$5;
      debugger;
      const tmpReturnArg$4 = tmpBranchingC(tmpChainRootCall$6, tmpChainElementCall$9, tmpIfTest$10);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1(
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$2,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$3,
      );
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$2,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$3,
      );
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpChainRootCall$2 = $$0;
    let tmpChainElementCall$4 = $$1;
    let tmpIfTest$4 = $$2;
    debugger;
    const tmpReturnArg$7 = tmpBranchingC(tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$4);
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpChainRootCall$3 = $$0;
    let tmpChainElementCall$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$9;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$6 = f();
tmpCallCallee(tmpCalleeParam$6);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  a = undefined;
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
      a = tmpChainElementCall$7;
      const tmpReturnArg$2 = tmpBranchingC();
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$6 = tmpBranchingC();
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpChainElementCall);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  }
};
const b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
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
