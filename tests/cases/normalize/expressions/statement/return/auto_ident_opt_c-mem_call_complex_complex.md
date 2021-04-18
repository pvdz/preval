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
let b = { $: $ };
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
  const tmpBranchingA = function () {
    debugger;
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall[tmpChainRootComputed$1];
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallObj$3 = tmpChainElementObject$1;
      const tmpCallVal$3 = tmpCallObj$3.call;
      const tmpCalleeParam$7 = tmpChainElementCall;
      const tmpCalleeParam$9 = $(1);
      const tmpChainElementCall$5 = tmpCallVal$3.call(tmpCallObj$3, tmpCalleeParam$7, tmpCalleeParam$9);
      tmpReturnArg = tmpChainElementCall$5;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC();
      return tmpReturnArg$5;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$11 = tmpBranchingC();
    return tmpReturnArg$11;
  };
  const tmpBranchingC = function () {
    debugger;
    return tmpReturnArg;
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB();
    return tmpReturnArg$15;
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
const f = function () {
  debugger;
  let tmpReturnArg = undefined;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall[tmpChainRootComputed$1];
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    if (tmpIfTest$3) {
      const tmpCallVal$3 = tmpChainElementObject$1.call;
      const tmpCalleeParam$9 = $(1);
      const tmpChainElementCall$5 = tmpCallVal$3.call(tmpChainElementObject$1, tmpChainElementCall, tmpCalleeParam$9);
      tmpReturnArg = tmpChainElementCall$5;
      return tmpReturnArg;
    } else {
      return tmpReturnArg;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    return tmpReturnArg;
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
