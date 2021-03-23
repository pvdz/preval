# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($)?.(1))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = $($)?.(1)) : tmpParamBare;
};
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
    let tmpIfTest$2 = $$2;
    debugger;
    let tmpNestedComplexRhs$1 = undefined;
    const tmpChainRootCall$1 = $;
    const tmpChainElementCall$2 = tmpChainRootCall$1($);
    const tmpIfTest$3 = tmpChainElementCall$2 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$4 = $$0;
      let p$4 = $$1;
      let tmpIfTest$6 = $$2;
      let tmpNestedComplexRhs$2 = $$3;
      let tmpChainRootCall$2 = $$4;
      let tmpChainElementCall$4 = $$5;
      let tmpIfTest$7 = $$6;
      debugger;
      const tmpChainElementCall$5 = tmpChainElementCall$4.call(tmpChainRootCall$2, 1);
      tmpNestedComplexRhs$2 = tmpChainElementCall$5;
      const tmpReturnArg = tmpBranchingC$1(
        tmpParamBare$4,
        p$4,
        tmpIfTest$6,
        tmpNestedComplexRhs$2,
        tmpChainRootCall$2,
        tmpChainElementCall$4,
        tmpIfTest$7,
      );
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$5 = $$0;
      let p$5 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpNestedComplexRhs$3 = $$3;
      let tmpChainRootCall$3 = $$4;
      let tmpChainElementCall$6 = $$5;
      let tmpIfTest$9 = $$6;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(
        tmpParamBare$5,
        p$5,
        tmpIfTest$8,
        tmpNestedComplexRhs$3,
        tmpChainRootCall$3,
        tmpChainElementCall$6,
        tmpIfTest$9,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$6 = $$0;
      let p$6 = $$1;
      let tmpIfTest$10 = $$2;
      let tmpNestedComplexRhs$4 = $$3;
      let tmpChainRootCall$4 = $$4;
      let tmpChainElementCall$7 = $$5;
      let tmpIfTest$11 = $$6;
      debugger;
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$2 = tmpBranchingC(tmpParamBare$6, p$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(
        tmpParamBare$1,
        p$1,
        tmpIfTest$2,
        tmpNestedComplexRhs$1,
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(
        tmpParamBare$1,
        p$1,
        tmpIfTest$2,
        tmpNestedComplexRhs$1,
        tmpChainRootCall$1,
        tmpChainElementCall$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let p$2 = $$1;
    let tmpIfTest$4 = $$2;
    debugger;
    p$2 = tmpParamBare$2;
    const tmpReturnArg$5 = tmpBranchingC(tmpParamBare$2, p$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$7;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$3 = tmpChainElementCall$2 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall$5 = tmpChainElementCall$2.call($, 1);
      a = tmpChainElementCall$5;
      return undefined;
    } else {
      a = undefined;
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA();
    return tmpReturnArg$6;
  } else {
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: undefined
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
