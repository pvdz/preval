# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  $(b)?.[$("$")]?.($(1));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { $ };
  let a = { a: 999, b: 1000 };
  $(b)?.[$('$')]?.($(1));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (b$1, a$1, tmpChainRootCall$1, tmpChainElementCall$2, tmpIfTest$2) {
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    const tmpBranchingA$1 = function (
      b$4,
      a$4,
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
    const tmpBranchingB$1 = function (
      b$5,
      a$5,
      tmpChainRootCall$5,
      tmpChainElementCall$8,
      tmpIfTest$8,
      tmpChainRootComputed$3,
      tmpChainElementObject$3,
      tmpIfTest$9,
    ) {
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
    const tmpBranchingC$1 = function (
      b$6,
      a$6,
      tmpChainRootCall$6,
      tmpChainElementCall$9,
      tmpIfTest$10,
      tmpChainRootComputed$4,
      tmpChainElementObject$4,
      tmpIfTest$11,
    ) {
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
  const tmpBranchingB = function (b$2, a$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$4) {
    const tmpReturnArg$5 = tmpBranchingC(b$2, a$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (b$3, a$3, tmpChainRootCall$3, tmpChainElementCall$5, tmpIfTest$5) {
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
  const b = { $: $ };
  const a = { a: 999, b: 1000 };
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (a$1, tmpChainElementCall$2) {
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    if (tmpIfTest$3) {
      const tmpCallVal$2 = tmpChainElementObject$1.call;
      const tmpCalleeParam$5 = $(1);
      tmpCallVal$2.call(tmpChainElementObject$1, tmpChainElementCall$2, tmpCalleeParam$5);
      $(a$1);
      return undefined;
    } else {
      $(a$1);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(a, tmpChainElementCall);
    return tmpReturnArg$6;
  } else {
    $(a);
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
 - 5: { a: '999', b: '1000' }
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
