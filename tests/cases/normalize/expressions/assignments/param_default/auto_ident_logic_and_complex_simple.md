# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(1)) && 2)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = $($(1)) && 2) : tmpParamBare;
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
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    let tmpNestedComplexRhs$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$7 = $$0;
      let p$7 = $$1;
      let tmpIfTest$7 = $$2;
      let tmpCallCallee$3 = $$3;
      let tmpCalleeParam$3 = $$4;
      let tmpNestedComplexRhs$3 = $$5;
      debugger;
      tmpNestedComplexRhs$3 = 2;
      const tmpReturnArg = tmpBranchingC$1(tmpParamBare$7, p$7, tmpIfTest$7, tmpCallCallee$3, tmpCalleeParam$3, tmpNestedComplexRhs$3);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$9 = $$0;
      let p$9 = $$1;
      let tmpIfTest$9 = $$2;
      let tmpCallCallee$5 = $$3;
      let tmpCalleeParam$5 = $$4;
      let tmpNestedComplexRhs$5 = $$5;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamBare$9, p$9, tmpIfTest$9, tmpCallCallee$5, tmpCalleeParam$5, tmpNestedComplexRhs$5);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$11 = $$0;
      let p$11 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpCallCallee$7 = $$3;
      let tmpCalleeParam$7 = $$4;
      let tmpNestedComplexRhs$7 = $$5;
      debugger;
      a = tmpNestedComplexRhs$7;
      p$11 = tmpNestedComplexRhs$7;
      const tmpReturnArg$3 = tmpBranchingC(tmpParamBare$11, p$11, tmpIfTest$11);
      return tmpReturnArg$3;
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$1, tmpCallCallee$1, tmpCalleeParam$1, tmpNestedComplexRhs$1);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$1, tmpCallCallee$1, tmpCalleeParam$1, tmpNestedComplexRhs$1);
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    p$3 = tmpParamBare$3;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamBare$3, p$3, tmpIfTest$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let p$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$13;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$9 = $;
const tmpCalleeParam$9 = f();
tmpCallCallee$9(tmpCalleeParam$9);
$(a);
`````

## Output

`````js filename=intro
const tmpBranchingA = function () {
  debugger;
  const tmpCalleeParam$1 = $(1);
  const tmpNestedComplexRhs$1 = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs$1) {
    a = 2;
    return undefined;
  } else {
    a = tmpNestedComplexRhs$1;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$9 = tmpBranchingA();
$(tmpCalleeParam$9);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
