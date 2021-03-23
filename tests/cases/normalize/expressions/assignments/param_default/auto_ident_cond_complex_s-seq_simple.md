# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $(1) ? (40, 50, 60) : $($(100)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = $(1) ? (40, 50, 60) : $($(100))) : tmpParamBare;
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
    const tmpIfTest$3 = $(1);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$4 = $$0;
      let p$4 = $$1;
      let tmpIfTest$6 = $$2;
      let tmpNestedComplexRhs$2 = $$3;
      let tmpIfTest$7 = $$4;
      debugger;
      tmpNestedComplexRhs$2 = 60;
      const tmpReturnArg = tmpBranchingC$1(tmpParamBare$4, p$4, tmpIfTest$6, tmpNestedComplexRhs$2, tmpIfTest$7);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$5 = $$0;
      let p$5 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpNestedComplexRhs$3 = $$3;
      let tmpIfTest$9 = $$4;
      debugger;
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(100);
      tmpNestedComplexRhs$3 = tmpCallCallee$2(tmpCalleeParam$2);
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamBare$5, p$5, tmpIfTest$8, tmpNestedComplexRhs$3, tmpIfTest$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$6 = $$0;
      let p$6 = $$1;
      let tmpIfTest$10 = $$2;
      let tmpNestedComplexRhs$4 = $$3;
      let tmpIfTest$11 = $$4;
      debugger;
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$2 = tmpBranchingC(tmpParamBare$6, p$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$2, tmpNestedComplexRhs$1, tmpIfTest$3);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$2, tmpNestedComplexRhs$1, tmpIfTest$3);
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
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest$3 = $(1);
  if (tmpIfTest$3) {
    a = 60;
    return undefined;
  } else {
    const tmpCalleeParam$1 = $(100);
    const SSA_tmpNestedComplexRhs$1 = $(tmpCalleeParam$1);
    a = SSA_tmpNestedComplexRhs$1;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
