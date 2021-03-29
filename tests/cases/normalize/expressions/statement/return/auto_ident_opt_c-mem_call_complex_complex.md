# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Return > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return $(b)?.[$("$")]?.($(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $(b)?.[$('$')]?.($(1));
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
  let tmpReturnArg = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpReturnArg$1 = $$0;
    let tmpChainRootCall$1 = $$1;
    let tmpChainElementCall$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
    const tmpIfTest$5 = tmpChainElementObject$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$7 = $$0;
      let tmpChainRootCall$7 = $$1;
      let tmpChainElementCall$11 = $$2;
      let tmpIfTest$11 = $$3;
      let tmpChainRootComputed$3 = $$4;
      let tmpChainElementObject$3 = $$5;
      let tmpIfTest$13 = $$6;
      debugger;
      const tmpCallObj$3 = tmpChainElementObject$3;
      const tmpCallVal$3 = tmpCallObj$3.call;
      const tmpCalleeParam$7 = tmpChainElementCall$11;
      const tmpCalleeParam$9 = $(1);
      const tmpChainElementCall$13 = tmpCallVal$3.call(tmpCallObj$3, tmpCalleeParam$7, tmpCalleeParam$9);
      tmpReturnArg$7 = tmpChainElementCall$13;
      const tmpReturnArg$13 = tmpBranchingC$1(
        tmpReturnArg$7,
        tmpChainRootCall$7,
        tmpChainElementCall$11,
        tmpIfTest$11,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$13,
      );
      return tmpReturnArg$13;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$9 = $$0;
      let tmpChainRootCall$9 = $$1;
      let tmpChainElementCall$15 = $$2;
      let tmpIfTest$15 = $$3;
      let tmpChainRootComputed$5 = $$4;
      let tmpChainElementObject$5 = $$5;
      let tmpIfTest$17 = $$6;
      debugger;
      const tmpReturnArg$15 = tmpBranchingC$1(
        tmpReturnArg$9,
        tmpChainRootCall$9,
        tmpChainElementCall$15,
        tmpIfTest$15,
        tmpChainRootComputed$5,
        tmpChainElementObject$5,
        tmpIfTest$17,
      );
      return tmpReturnArg$15;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$11 = $$0;
      let tmpChainRootCall$11 = $$1;
      let tmpChainElementCall$17 = $$2;
      let tmpIfTest$19 = $$3;
      let tmpChainRootComputed$7 = $$4;
      let tmpChainElementObject$7 = $$5;
      let tmpIfTest$21 = $$6;
      debugger;
      const tmpReturnArg$17 = tmpBranchingC(tmpReturnArg$11, tmpChainRootCall$11, tmpChainElementCall$17, tmpIfTest$19);
      return tmpReturnArg$17;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$19 = tmpBranchingA$1(
        tmpReturnArg$1,
        tmpChainRootCall$1,
        tmpChainElementCall$3,
        tmpIfTest$3,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$5,
      );
      return tmpReturnArg$19;
    } else {
      const tmpReturnArg$21 = tmpBranchingB$1(
        tmpReturnArg$1,
        tmpChainRootCall$1,
        tmpChainElementCall$3,
        tmpIfTest$3,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$5,
      );
      return tmpReturnArg$21;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpReturnArg$3 = $$0;
    let tmpChainRootCall$3 = $$1;
    let tmpChainElementCall$7 = $$2;
    let tmpIfTest$7 = $$3;
    debugger;
    const tmpReturnArg$23 = tmpBranchingC(tmpReturnArg$3, tmpChainRootCall$3, tmpChainElementCall$7, tmpIfTest$7);
    return tmpReturnArg$23;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpReturnArg$5 = $$0;
    let tmpChainRootCall$5 = $$1;
    let tmpChainElementCall$9 = $$2;
    let tmpIfTest$9 = $$3;
    debugger;
    return tmpReturnArg$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$25 = tmpBranchingA(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$25;
  } else {
    const tmpReturnArg$27 = tmpBranchingB(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$27;
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
    return tmpChainElementCall$13;
  } else {
    return undefined;
  }
};
const f = function () {
  debugger;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpReturnArg$25 = tmpBranchingA(tmpChainElementCall);
    return tmpReturnArg$25;
  } else {
    return undefined;
  }
};
const b = { $: $ };
const a = { a: 999, b: 1000 };
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
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
