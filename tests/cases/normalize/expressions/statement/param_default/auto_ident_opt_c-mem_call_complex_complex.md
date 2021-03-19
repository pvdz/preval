# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = $(b)?.[$("$")]?.($(1))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? $(b)?.[$('$')]?.($(1)) : tmpParamDefault;
};
let b = { $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, p$1, tmpIfTest$3) {
    p$1 = undefined;
    const tmpChainRootCall$1 = $;
    const tmpChainElementCall$2 = tmpChainRootCall$1(b);
    const tmpIfTest$4 = tmpChainElementCall$2 != null;
    const tmpBranchingA$1 = function (tmpParamDefault$4, p$4, tmpIfTest$8, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$9) {
      const tmpChainRootComputed$2 = $('$');
      const tmpChainElementObject$2 = tmpChainElementCall$4[tmpChainRootComputed$2];
      const tmpIfTest$10 = tmpChainElementObject$2 != null;
      const tmpBranchingA$2 = function (
        tmpParamDefault$7,
        p$7,
        tmpIfTest$15,
        tmpChainRootCall$5,
        tmpChainElementCall$8,
        tmpIfTest$16,
        tmpChainRootComputed$3,
        tmpChainElementObject$3,
        tmpIfTest$17,
      ) {
        const tmpCallObj$3 = tmpChainElementObject$3;
        const tmpCallVal$3 = tmpCallObj$3.call;
        const tmpCalleeParam$6 = tmpChainElementCall$8;
        const tmpCalleeParam$7 = $(1);
        const tmpChainElementCall$9 = tmpCallVal$3.call(tmpCallObj$3, tmpCalleeParam$6, tmpCalleeParam$7);
        p$7 = tmpChainElementCall$9;
        const tmpReturnArg = tmpBranchingC$2(
          tmpParamDefault$7,
          p$7,
          tmpIfTest$15,
          tmpChainRootCall$5,
          tmpChainElementCall$8,
          tmpIfTest$16,
          tmpChainRootComputed$3,
          tmpChainElementObject$3,
          tmpIfTest$17,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$2 = function (
        tmpParamDefault$8,
        p$8,
        tmpIfTest$18,
        tmpChainRootCall$6,
        tmpChainElementCall$10,
        tmpIfTest$19,
        tmpChainRootComputed$4,
        tmpChainElementObject$4,
        tmpIfTest$20,
      ) {
        const tmpReturnArg$1 = tmpBranchingC$2(
          tmpParamDefault$8,
          p$8,
          tmpIfTest$18,
          tmpChainRootCall$6,
          tmpChainElementCall$10,
          tmpIfTest$19,
          tmpChainRootComputed$4,
          tmpChainElementObject$4,
          tmpIfTest$20,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$2 = function (
        tmpParamDefault$9,
        p$9,
        tmpIfTest$21,
        tmpChainRootCall$7,
        tmpChainElementCall$11,
        tmpIfTest$22,
        tmpChainRootComputed$5,
        tmpChainElementObject$5,
        tmpIfTest$23,
      ) {
        const tmpReturnArg$2 = tmpBranchingC$1(
          tmpParamDefault$9,
          p$9,
          tmpIfTest$21,
          tmpChainRootCall$7,
          tmpChainElementCall$11,
          tmpIfTest$22,
        );
        return tmpReturnArg$2;
      };
      if (tmpIfTest$10) {
        const tmpReturnArg$3 = tmpBranchingA$2(
          tmpParamDefault$4,
          p$4,
          tmpIfTest$8,
          tmpChainRootCall$2,
          tmpChainElementCall$4,
          tmpIfTest$9,
          tmpChainRootComputed$2,
          tmpChainElementObject$2,
          tmpIfTest$10,
        );
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$4 = tmpBranchingB$2(
          tmpParamDefault$4,
          p$4,
          tmpIfTest$8,
          tmpChainRootCall$2,
          tmpChainElementCall$4,
          tmpIfTest$9,
          tmpChainRootComputed$2,
          tmpChainElementObject$2,
          tmpIfTest$10,
        );
        return tmpReturnArg$4;
      }
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$11, tmpChainRootCall$3, tmpChainElementCall$6, tmpIfTest$12) {
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamDefault$5, p$5, tmpIfTest$11, tmpChainRootCall$3, tmpChainElementCall$6, tmpIfTest$12);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$13, tmpChainRootCall$4, tmpChainElementCall$7, tmpIfTest$14) {
      const tmpReturnArg$6 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$13);
      return tmpReturnArg$6;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpParamDefault$1, p$1, tmpIfTest$3, tmpChainRootCall$1, tmpChainElementCall$2, tmpIfTest$4);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(tmpParamDefault$1, p$1, tmpIfTest$3, tmpChainRootCall$1, tmpChainElementCall$2, tmpIfTest$4);
      return tmpReturnArg$8;
    }
  };
  const tmpBranchingB = function (tmpParamDefault$2, p$2, tmpIfTest$6) {
    p$2 = tmpParamDefault$2;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamDefault$2, p$2, tmpIfTest$6);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function (tmpParamDefault$3, p$3, tmpIfTest$7) {};
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$11;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$8 = f();
tmpCallCallee(tmpCalleeParam$8);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpChainElementCall$2 = $(b);
    const tmpIfTest$4 = tmpChainElementCall$2 != null;
    const tmpBranchingA$1 = function (tmpChainElementCall$4) {
      const tmpChainRootComputed$2 = $('$');
      const tmpChainElementObject$2 = tmpChainElementCall$4[tmpChainRootComputed$2];
      const tmpIfTest$10 = tmpChainElementObject$2 != null;
      if (tmpIfTest$10) {
        const tmpCallVal$3 = tmpChainElementObject$2.call;
        const tmpCalleeParam$7 = $(1);
        tmpCallVal$3.call(tmpChainElementObject$2, tmpChainElementCall$4, tmpCalleeParam$7);
        return undefined;
      } else {
        return undefined;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpChainElementCall$2);
      return tmpReturnArg$7;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA();
    return tmpReturnArg$10;
  } else {
    return undefined;
  }
};
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCalleeParam$8 = f();
$(tmpCalleeParam$8);
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
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
