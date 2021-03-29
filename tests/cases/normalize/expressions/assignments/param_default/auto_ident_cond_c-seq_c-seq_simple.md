# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))) : tmpParamBare;
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
    let tmpIfTest$3 = $$2;
    debugger;
    let tmpNestedComplexRhs$1 = undefined;
    const tmpIfTest$5 = $(30);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$7 = $$0;
      let p$7 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpNestedComplexRhs$3 = $$3;
      let tmpIfTest$13 = $$4;
      debugger;
      tmpNestedComplexRhs$3 = $(60);
      const tmpReturnArg = tmpBranchingC$1(tmpParamBare$7, p$7, tmpIfTest$11, tmpNestedComplexRhs$3, tmpIfTest$13);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$9 = $$0;
      let p$9 = $$1;
      let tmpIfTest$15 = $$2;
      let tmpNestedComplexRhs$5 = $$3;
      let tmpIfTest$17 = $$4;
      debugger;
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(100);
      tmpNestedComplexRhs$5 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamBare$9, p$9, tmpIfTest$15, tmpNestedComplexRhs$5, tmpIfTest$17);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$11 = $$0;
      let p$11 = $$1;
      let tmpIfTest$19 = $$2;
      let tmpNestedComplexRhs$7 = $$3;
      let tmpIfTest$21 = $$4;
      debugger;
      a = tmpNestedComplexRhs$7;
      p$11 = tmpNestedComplexRhs$7;
      const tmpReturnArg$3 = tmpBranchingC(tmpParamBare$11, p$11, tmpIfTest$19);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$3, tmpNestedComplexRhs$1, tmpIfTest$5);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$3, tmpNestedComplexRhs$1, tmpIfTest$5);
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
    p$3 = tmpParamBare$3;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamBare$3, p$3, tmpIfTest$7);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let p$5 = $$1;
    let tmpIfTest$9 = $$2;
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
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$5(tmpCalleeParam$5);
$(a);
`````

## Output

`````js filename=intro
const tmpBranchingA = function () {
  debugger;
  const tmpIfTest$5 = $(30);
  if (tmpIfTest$5) {
    const SSA_tmpNestedComplexRhs$3 = $(60);
    a = SSA_tmpNestedComplexRhs$3;
    return undefined;
  } else {
    const tmpCalleeParam$3 = $(100);
    const SSA_tmpNestedComplexRhs$5 = $(tmpCalleeParam$3);
    a = SSA_tmpNestedComplexRhs$5;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$5 = tmpBranchingA();
$(tmpCalleeParam$5);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: undefined
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
