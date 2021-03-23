# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = (a = $(b)?.[$("$")]?.($(1)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = $(b)?.[$('$')]?.($(1))) : tmpParamBare;
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
    let tmpIfTest$3 = $$2;
    debugger;
    let tmpNestedComplexRhs$1 = undefined;
    const tmpChainRootCall$1 = $;
    const tmpChainElementCall$2 = tmpChainRootCall$1(b);
    const tmpIfTest$4 = tmpChainElementCall$2 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$4 = $$0;
      let p$4 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpNestedComplexRhs$2 = $$3;
      let tmpChainRootCall$2 = $$4;
      let tmpChainElementCall$4 = $$5;
      let tmpIfTest$9 = $$6;
      debugger;
      const tmpChainRootComputed$2 = $('$');
      const tmpChainElementObject$2 = tmpChainElementCall$4[tmpChainRootComputed$2];
      const tmpIfTest$10 = tmpChainElementObject$2 != null;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$7 = $$0;
        let p$7 = $$1;
        let tmpIfTest$15 = $$2;
        let tmpNestedComplexRhs$5 = $$3;
        let tmpChainRootCall$5 = $$4;
        let tmpChainElementCall$8 = $$5;
        let tmpIfTest$16 = $$6;
        let tmpChainRootComputed$3 = $$7;
        let tmpChainElementObject$3 = $$8;
        let tmpIfTest$17 = $$9;
        debugger;
        const tmpCallObj$3 = tmpChainElementObject$3;
        const tmpCallVal$3 = tmpCallObj$3.call;
        const tmpCalleeParam$6 = tmpChainElementCall$8;
        const tmpCalleeParam$7 = $(1);
        const tmpChainElementCall$9 = tmpCallVal$3.call(tmpCallObj$3, tmpCalleeParam$6, tmpCalleeParam$7);
        tmpNestedComplexRhs$5 = tmpChainElementCall$9;
        const tmpReturnArg = tmpBranchingC$2(
          tmpParamBare$7,
          p$7,
          tmpIfTest$15,
          tmpNestedComplexRhs$5,
          tmpChainRootCall$5,
          tmpChainElementCall$8,
          tmpIfTest$16,
          tmpChainRootComputed$3,
          tmpChainElementObject$3,
          tmpIfTest$17,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$8 = $$0;
        let p$8 = $$1;
        let tmpIfTest$18 = $$2;
        let tmpNestedComplexRhs$6 = $$3;
        let tmpChainRootCall$6 = $$4;
        let tmpChainElementCall$10 = $$5;
        let tmpIfTest$19 = $$6;
        let tmpChainRootComputed$4 = $$7;
        let tmpChainElementObject$4 = $$8;
        let tmpIfTest$20 = $$9;
        debugger;
        const tmpReturnArg$1 = tmpBranchingC$2(
          tmpParamBare$8,
          p$8,
          tmpIfTest$18,
          tmpNestedComplexRhs$6,
          tmpChainRootCall$6,
          tmpChainElementCall$10,
          tmpIfTest$19,
          tmpChainRootComputed$4,
          tmpChainElementObject$4,
          tmpIfTest$20,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$9 = $$0;
        let p$9 = $$1;
        let tmpIfTest$21 = $$2;
        let tmpNestedComplexRhs$7 = $$3;
        let tmpChainRootCall$7 = $$4;
        let tmpChainElementCall$11 = $$5;
        let tmpIfTest$22 = $$6;
        let tmpChainRootComputed$5 = $$7;
        let tmpChainElementObject$5 = $$8;
        let tmpIfTest$23 = $$9;
        debugger;
        const tmpReturnArg$2 = tmpBranchingC$1(
          tmpParamBare$9,
          p$9,
          tmpIfTest$21,
          tmpNestedComplexRhs$7,
          tmpChainRootCall$7,
          tmpChainElementCall$11,
          tmpIfTest$22,
        );
        return tmpReturnArg$2;
      };
      if (tmpIfTest$10) {
        const tmpReturnArg$3 = tmpBranchingA$2(
          tmpParamBare$4,
          p$4,
          tmpIfTest$8,
          tmpNestedComplexRhs$2,
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
          tmpParamBare$4,
          p$4,
          tmpIfTest$8,
          tmpNestedComplexRhs$2,
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
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$5 = $$0;
      let p$5 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpNestedComplexRhs$3 = $$3;
      let tmpChainRootCall$3 = $$4;
      let tmpChainElementCall$6 = $$5;
      let tmpIfTest$12 = $$6;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$5,
        p$5,
        tmpIfTest$11,
        tmpNestedComplexRhs$3,
        tmpChainRootCall$3,
        tmpChainElementCall$6,
        tmpIfTest$12,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$6 = $$0;
      let p$6 = $$1;
      let tmpIfTest$13 = $$2;
      let tmpNestedComplexRhs$4 = $$3;
      let tmpChainRootCall$4 = $$4;
      let tmpChainElementCall$7 = $$5;
      let tmpIfTest$14 = $$6;
      debugger;
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$6 = tmpBranchingC(tmpParamBare$6, p$6, tmpIfTest$13);
      return tmpReturnArg$6;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$1,
        p$1,
        tmpIfTest$3,
        tmpNestedComplexRhs$1,
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$4,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(
        tmpParamBare$1,
        p$1,
        tmpIfTest$3,
        tmpNestedComplexRhs$1,
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$4,
      );
      return tmpReturnArg$8;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let p$2 = $$1;
    let tmpIfTest$6 = $$2;
    debugger;
    p$2 = tmpParamBare$2;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamBare$2, p$2, tmpIfTest$6);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
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
const f = function () {
  debugger;
  const tmpChainElementCall$2 = $(b);
  const tmpIfTest$4 = tmpChainElementCall$2 != null;
  const tmpBranchingA$1 = function ($$0) {
    const tmpChainElementCall$4 = $$0;
    debugger;
    const tmpChainRootComputed$2 = $('$');
    const tmpChainElementObject$2 = tmpChainElementCall$4[tmpChainRootComputed$2];
    const tmpIfTest$10 = tmpChainElementObject$2 != null;
    if (tmpIfTest$10) {
      const tmpCallVal$3 = tmpChainElementObject$2.call;
      const tmpCalleeParam$7 = $(1);
      const tmpChainElementCall$9 = tmpCallVal$3.call(tmpChainElementObject$2, tmpChainElementCall$4, tmpCalleeParam$7);
      a = tmpChainElementCall$9;
      return undefined;
    } else {
      a = undefined;
      return undefined;
    }
  };
  if (tmpIfTest$4) {
    const tmpReturnArg = tmpBranchingA$1(tmpChainElementCall$2);
    return tmpReturnArg;
  } else {
    a = undefined;
    return undefined;
  }
};
const b = { $: $ };
let a = { a: 999, b: 1000 };
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
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
