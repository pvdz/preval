# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(1)) && $($(1)) && $($(2)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = $($(1)) && $($(1)) && $($(2))) : tmpParamBare;
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
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    let tmpNestedComplexRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$4 = $$0;
      let p$4 = $$1;
      let tmpIfTest$4 = $$2;
      let tmpCallCallee$6 = $$3;
      let tmpCalleeParam$6 = $$4;
      let tmpNestedComplexRhs$2 = $$5;
      debugger;
      const tmpCallCallee$7 = $;
      const tmpCalleeParam$7 = $(1);
      tmpNestedComplexRhs$2 = tmpCallCallee$7(tmpCalleeParam$7);
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$7 = $$0;
        let p$7 = $$1;
        let tmpIfTest$7 = $$2;
        let tmpCallCallee$11 = $$3;
        let tmpCalleeParam$11 = $$4;
        let tmpNestedComplexRhs$5 = $$5;
        let tmpCallCallee$12 = $$6;
        let tmpCalleeParam$12 = $$7;
        debugger;
        const tmpCallCallee$13 = $;
        const tmpCalleeParam$13 = $(2);
        tmpNestedComplexRhs$5 = tmpCallCallee$13(tmpCalleeParam$13);
        const tmpReturnArg = tmpBranchingC$2(
          tmpParamBare$7,
          p$7,
          tmpIfTest$7,
          tmpCallCallee$11,
          tmpCalleeParam$11,
          tmpNestedComplexRhs$5,
          tmpCallCallee$12,
          tmpCalleeParam$12,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$8 = $$0;
        let p$8 = $$1;
        let tmpIfTest$8 = $$2;
        let tmpCallCallee$14 = $$3;
        let tmpCalleeParam$14 = $$4;
        let tmpNestedComplexRhs$6 = $$5;
        let tmpCallCallee$15 = $$6;
        let tmpCalleeParam$15 = $$7;
        debugger;
        const tmpReturnArg$1 = tmpBranchingC$2(
          tmpParamBare$8,
          p$8,
          tmpIfTest$8,
          tmpCallCallee$14,
          tmpCalleeParam$14,
          tmpNestedComplexRhs$6,
          tmpCallCallee$15,
          tmpCalleeParam$15,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$9 = $$0;
        let p$9 = $$1;
        let tmpIfTest$9 = $$2;
        let tmpCallCallee$16 = $$3;
        let tmpCalleeParam$16 = $$4;
        let tmpNestedComplexRhs$7 = $$5;
        let tmpCallCallee$17 = $$6;
        let tmpCalleeParam$17 = $$7;
        debugger;
        const tmpReturnArg$2 = tmpBranchingC$1(
          tmpParamBare$9,
          p$9,
          tmpIfTest$9,
          tmpCallCallee$16,
          tmpCalleeParam$16,
          tmpNestedComplexRhs$7,
        );
        return tmpReturnArg$2;
      };
      if (tmpNestedComplexRhs$2) {
        const tmpReturnArg$3 = tmpBranchingA$2(
          tmpParamBare$4,
          p$4,
          tmpIfTest$4,
          tmpCallCallee$6,
          tmpCalleeParam$6,
          tmpNestedComplexRhs$2,
          tmpCallCallee$7,
          tmpCalleeParam$7,
        );
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$4 = tmpBranchingB$2(
          tmpParamBare$4,
          p$4,
          tmpIfTest$4,
          tmpCallCallee$6,
          tmpCalleeParam$6,
          tmpNestedComplexRhs$2,
          tmpCallCallee$7,
          tmpCalleeParam$7,
        );
        return tmpReturnArg$4;
      }
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$5 = $$0;
      let p$5 = $$1;
      let tmpIfTest$5 = $$2;
      let tmpCallCallee$9 = $$3;
      let tmpCalleeParam$9 = $$4;
      let tmpNestedComplexRhs$3 = $$5;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamBare$5, p$5, tmpIfTest$5, tmpCallCallee$9, tmpCalleeParam$9, tmpNestedComplexRhs$3);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$6 = $$0;
      let p$6 = $$1;
      let tmpIfTest$6 = $$2;
      let tmpCallCallee$10 = $$3;
      let tmpCalleeParam$10 = $$4;
      let tmpNestedComplexRhs$4 = $$5;
      debugger;
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$6 = tmpBranchingC(tmpParamBare$6, p$6, tmpIfTest$6);
      return tmpReturnArg$6;
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$1, tmpCallCallee$3, tmpCalleeParam$3, tmpNestedComplexRhs$1);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$1, tmpCallCallee$3, tmpCalleeParam$3, tmpNestedComplexRhs$1);
      return tmpReturnArg$8;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let p$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    p$2 = tmpParamBare$2;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamBare$2, p$2, tmpIfTest$2);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$3 = $$2;
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
let a = { a: 999, b: 1000 };
const tmpCallCallee$18 = $;
const tmpCalleeParam$18 = f();
tmpCallCallee$18(tmpCalleeParam$18);
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
    const tmpCalleeParam$3 = $(1);
    const tmpNestedComplexRhs$1 = $(tmpCalleeParam$3);
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCalleeParam$7 = $(1);
      const SSA_tmpNestedComplexRhs$2 = $(tmpCalleeParam$7);
      if (SSA_tmpNestedComplexRhs$2) {
        const tmpCalleeParam$13 = $(2);
        const SSA_tmpNestedComplexRhs$5 = $(tmpCalleeParam$13);
        a = SSA_tmpNestedComplexRhs$5;
        return undefined;
      } else {
        a = SSA_tmpNestedComplexRhs$2;
        return undefined;
      }
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      a = tmpNestedComplexRhs$1;
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
let a = { a: 999, b: 1000 };
const tmpCalleeParam$18 = f();
$(tmpCalleeParam$18);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: undefined
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
