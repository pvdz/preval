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
  let tmpReturnArg = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (tmpReturnArg$1, tmpChainRootCall$1, tmpChainElementCall$2, tmpIfTest$2) {
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    const tmpBranchingA$1 = function (
      tmpReturnArg$4,
      tmpChainRootCall$4,
      tmpChainElementCall$6,
      tmpIfTest$6,
      tmpChainRootComputed$2,
      tmpChainElementObject$2,
      tmpIfTest$7,
    ) {
      const tmpCallObj$2 = tmpChainElementObject$2;
      const tmpCallVal$2 = tmpCallObj$2.call;
      const tmpCalleeParam$4 = tmpChainElementCall$6;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$7 = tmpCallVal$2.call(tmpCallObj$2, tmpCalleeParam$4, tmpCalleeParam$5);
      tmpReturnArg$4 = tmpChainElementCall$7;
      const tmpReturnArg$7 = tmpBranchingC$1(
        tmpReturnArg$4,
        tmpChainRootCall$4,
        tmpChainElementCall$6,
        tmpIfTest$6,
        tmpChainRootComputed$2,
        tmpChainElementObject$2,
        tmpIfTest$7,
      );
      return tmpReturnArg$7;
    };
    const tmpBranchingB$1 = function (
      tmpReturnArg$5,
      tmpChainRootCall$5,
      tmpChainElementCall$8,
      tmpIfTest$8,
      tmpChainRootComputed$3,
      tmpChainElementObject$3,
      tmpIfTest$9,
    ) {
      const tmpReturnArg$8 = tmpBranchingC$1(
        tmpReturnArg$5,
        tmpChainRootCall$5,
        tmpChainElementCall$8,
        tmpIfTest$8,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$9,
      );
      return tmpReturnArg$8;
    };
    const tmpBranchingC$1 = function (
      tmpReturnArg$6,
      tmpChainRootCall$6,
      tmpChainElementCall$9,
      tmpIfTest$10,
      tmpChainRootComputed$4,
      tmpChainElementObject$4,
      tmpIfTest$11,
    ) {
      const tmpReturnArg$9 = tmpBranchingC(tmpReturnArg$6, tmpChainRootCall$6, tmpChainElementCall$9, tmpIfTest$10);
      return tmpReturnArg$9;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$10 = tmpBranchingA$1(
        tmpReturnArg$1,
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$2,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$3,
      );
      return tmpReturnArg$10;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(
        tmpReturnArg$1,
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$2,
        tmpChainRootComputed$1,
        tmpChainElementObject$1,
        tmpIfTest$3,
      );
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingB = function (tmpReturnArg$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$4) {
    const tmpReturnArg$12 = tmpBranchingC(tmpReturnArg$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$4);
    return tmpReturnArg$12;
  };
  const tmpBranchingC = function (tmpReturnArg$3, tmpChainRootCall$3, tmpChainElementCall$5, tmpIfTest$5) {
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$14 = tmpBranchingB(tmpReturnArg, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$14;
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
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (tmpReturnArg$1, tmpChainElementCall$2) {
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    if (tmpIfTest$3) {
      const tmpCallVal$2 = tmpChainElementObject$1.call;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$7 = tmpCallVal$2.call(tmpChainElementObject$1, tmpChainElementCall$2, tmpCalleeParam$5);
      return tmpChainElementCall$7;
    } else {
      return tmpReturnArg$1;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(undefined, tmpChainElementCall);
    return tmpReturnArg$13;
  } else {
    return undefined;
  }
};
const b = { $: $ };
const a = { a: 999, b: 1000 };
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
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
