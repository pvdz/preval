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
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? $(b)?.[$('$')]?.($(1)) : tmpParamBare;
};
let b = { $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let p$1 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    p$1 = undefined;
    const tmpChainRootCall$1 = $;
    const tmpChainElementCall$3 = tmpChainRootCall$1(b);
    const tmpIfTest$7 = tmpChainElementCall$3 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$7 = $$0;
      let p$7 = $$1;
      let tmpIfTest$15 = $$2;
      let tmpChainRootCall$3 = $$3;
      let tmpChainElementCall$7 = $$4;
      let tmpIfTest$17 = $$5;
      debugger;
      const tmpChainRootComputed$3 = $('$');
      const tmpChainElementObject$3 = tmpChainElementCall$7[tmpChainRootComputed$3];
      const tmpIfTest$19 = tmpChainElementObject$3 != null;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpParamBare$13 = $$0;
        let p$13 = $$1;
        let tmpIfTest$29 = $$2;
        let tmpChainRootCall$9 = $$3;
        let tmpChainElementCall$15 = $$4;
        let tmpIfTest$31 = $$5;
        let tmpChainRootComputed$5 = $$6;
        let tmpChainElementObject$5 = $$7;
        let tmpIfTest$33 = $$8;
        debugger;
        const tmpCallObj$5 = tmpChainElementObject$5;
        const tmpCallVal$5 = tmpCallObj$5.call;
        const tmpCalleeParam$11 = tmpChainElementCall$15;
        const tmpCalleeParam$13 = $(1);
        const tmpChainElementCall$17 = tmpCallVal$5.call(tmpCallObj$5, tmpCalleeParam$11, tmpCalleeParam$13);
        p$13 = tmpChainElementCall$17;
        const tmpReturnArg = tmpBranchingC$3(
          tmpParamBare$13,
          p$13,
          tmpIfTest$29,
          tmpChainRootCall$9,
          tmpChainElementCall$15,
          tmpIfTest$31,
          tmpChainRootComputed$5,
          tmpChainElementObject$5,
          tmpIfTest$33,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpParamBare$15 = $$0;
        let p$15 = $$1;
        let tmpIfTest$35 = $$2;
        let tmpChainRootCall$11 = $$3;
        let tmpChainElementCall$19 = $$4;
        let tmpIfTest$37 = $$5;
        let tmpChainRootComputed$7 = $$6;
        let tmpChainElementObject$7 = $$7;
        let tmpIfTest$39 = $$8;
        debugger;
        const tmpReturnArg$1 = tmpBranchingC$3(
          tmpParamBare$15,
          p$15,
          tmpIfTest$35,
          tmpChainRootCall$11,
          tmpChainElementCall$19,
          tmpIfTest$37,
          tmpChainRootComputed$7,
          tmpChainElementObject$7,
          tmpIfTest$39,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpParamBare$17 = $$0;
        let p$17 = $$1;
        let tmpIfTest$41 = $$2;
        let tmpChainRootCall$13 = $$3;
        let tmpChainElementCall$21 = $$4;
        let tmpIfTest$43 = $$5;
        let tmpChainRootComputed$9 = $$6;
        let tmpChainElementObject$9 = $$7;
        let tmpIfTest$45 = $$8;
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$1(
          tmpParamBare$17,
          p$17,
          tmpIfTest$41,
          tmpChainRootCall$13,
          tmpChainElementCall$21,
          tmpIfTest$43,
        );
        return tmpReturnArg$3;
      };
      if (tmpIfTest$19) {
        const tmpReturnArg$5 = tmpBranchingA$3(
          tmpParamBare$7,
          p$7,
          tmpIfTest$15,
          tmpChainRootCall$3,
          tmpChainElementCall$7,
          tmpIfTest$17,
          tmpChainRootComputed$3,
          tmpChainElementObject$3,
          tmpIfTest$19,
        );
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$3(
          tmpParamBare$7,
          p$7,
          tmpIfTest$15,
          tmpChainRootCall$3,
          tmpChainElementCall$7,
          tmpIfTest$17,
          tmpChainRootComputed$3,
          tmpChainElementObject$3,
          tmpIfTest$19,
        );
        return tmpReturnArg$7;
      }
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$9 = $$0;
      let p$9 = $$1;
      let tmpIfTest$21 = $$2;
      let tmpChainRootCall$5 = $$3;
      let tmpChainElementCall$11 = $$4;
      let tmpIfTest$23 = $$5;
      debugger;
      const tmpReturnArg$9 = tmpBranchingC$1(tmpParamBare$9, p$9, tmpIfTest$21, tmpChainRootCall$5, tmpChainElementCall$11, tmpIfTest$23);
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$11 = $$0;
      let p$11 = $$1;
      let tmpIfTest$25 = $$2;
      let tmpChainRootCall$7 = $$3;
      let tmpChainElementCall$13 = $$4;
      let tmpIfTest$27 = $$5;
      debugger;
      const tmpReturnArg$11 = tmpBranchingC(tmpParamBare$11, p$11, tmpIfTest$25);
      return tmpReturnArg$11;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$13 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$5, tmpChainRootCall$1, tmpChainElementCall$3, tmpIfTest$7);
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$5, tmpChainRootCall$1, tmpChainElementCall$3, tmpIfTest$7);
      return tmpReturnArg$15;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$11 = $$2;
    debugger;
    p$3 = tmpParamBare$3;
    const tmpReturnArg$17 = tmpBranchingC(tmpParamBare$3, p$3, tmpIfTest$11);
    return tmpReturnArg$17;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let p$5 = $$1;
    let tmpIfTest$13 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$21;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$15 = f();
tmpCallCallee(tmpCalleeParam$15);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpChainElementCall$3 = $(b);
  const tmpIfTest$7 = tmpChainElementCall$3 != null;
  const tmpBranchingA$1 = function ($$0) {
    const tmpChainElementCall$7 = $$0;
    debugger;
    const tmpChainRootComputed$3 = $('$');
    const tmpChainElementObject$3 = tmpChainElementCall$7[tmpChainRootComputed$3];
    const tmpIfTest$19 = tmpChainElementObject$3 != null;
    if (tmpIfTest$19) {
      const tmpCallVal$5 = tmpChainElementObject$3.call;
      const tmpCalleeParam$13 = $(1);
      tmpCallVal$5.call(tmpChainElementObject$3, tmpChainElementCall$7, tmpCalleeParam$13);
      return undefined;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest$7) {
    const tmpReturnArg = tmpBranchingA$1(tmpChainElementCall$3);
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCalleeParam$15 = f();
$(tmpCalleeParam$15);
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
