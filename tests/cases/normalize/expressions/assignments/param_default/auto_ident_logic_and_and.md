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
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    let tmpNestedComplexRhs$1 = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$7 = $$0;
      let p$7 = $$1;
      let tmpIfTest$7 = $$2;
      let tmpCallCallee$11 = $$3;
      let tmpCalleeParam$11 = $$4;
      let tmpNestedComplexRhs$3 = $$5;
      debugger;
      const tmpCallCallee$13 = $;
      const tmpCalleeParam$13 = $(1);
      tmpNestedComplexRhs$3 = tmpCallCallee$13(tmpCalleeParam$13);
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$13 = $$0;
        let p$13 = $$1;
        let tmpIfTest$13 = $$2;
        let tmpCallCallee$21 = $$3;
        let tmpCalleeParam$21 = $$4;
        let tmpNestedComplexRhs$9 = $$5;
        let tmpCallCallee$23 = $$6;
        let tmpCalleeParam$23 = $$7;
        debugger;
        const tmpCallCallee$25 = $;
        const tmpCalleeParam$25 = $(2);
        tmpNestedComplexRhs$9 = tmpCallCallee$25(tmpCalleeParam$25);
        const tmpReturnArg = tmpBranchingC$3(
          tmpParamBare$13,
          p$13,
          tmpIfTest$13,
          tmpCallCallee$21,
          tmpCalleeParam$21,
          tmpNestedComplexRhs$9,
          tmpCallCallee$23,
          tmpCalleeParam$23,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$15 = $$0;
        let p$15 = $$1;
        let tmpIfTest$15 = $$2;
        let tmpCallCallee$27 = $$3;
        let tmpCalleeParam$27 = $$4;
        let tmpNestedComplexRhs$11 = $$5;
        let tmpCallCallee$29 = $$6;
        let tmpCalleeParam$29 = $$7;
        debugger;
        const tmpReturnArg$1 = tmpBranchingC$3(
          tmpParamBare$15,
          p$15,
          tmpIfTest$15,
          tmpCallCallee$27,
          tmpCalleeParam$27,
          tmpNestedComplexRhs$11,
          tmpCallCallee$29,
          tmpCalleeParam$29,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
        let tmpParamBare$17 = $$0;
        let p$17 = $$1;
        let tmpIfTest$17 = $$2;
        let tmpCallCallee$31 = $$3;
        let tmpCalleeParam$31 = $$4;
        let tmpNestedComplexRhs$13 = $$5;
        let tmpCallCallee$33 = $$6;
        let tmpCalleeParam$33 = $$7;
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$1(
          tmpParamBare$17,
          p$17,
          tmpIfTest$17,
          tmpCallCallee$31,
          tmpCalleeParam$31,
          tmpNestedComplexRhs$13,
        );
        return tmpReturnArg$3;
      };
      if (tmpNestedComplexRhs$3) {
        const tmpReturnArg$5 = tmpBranchingA$3(
          tmpParamBare$7,
          p$7,
          tmpIfTest$7,
          tmpCallCallee$11,
          tmpCalleeParam$11,
          tmpNestedComplexRhs$3,
          tmpCallCallee$13,
          tmpCalleeParam$13,
        );
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$3(
          tmpParamBare$7,
          p$7,
          tmpIfTest$7,
          tmpCallCallee$11,
          tmpCalleeParam$11,
          tmpNestedComplexRhs$3,
          tmpCallCallee$13,
          tmpCalleeParam$13,
        );
        return tmpReturnArg$7;
      }
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$9 = $$0;
      let p$9 = $$1;
      let tmpIfTest$9 = $$2;
      let tmpCallCallee$17 = $$3;
      let tmpCalleeParam$17 = $$4;
      let tmpNestedComplexRhs$5 = $$5;
      debugger;
      const tmpReturnArg$9 = tmpBranchingC$1(tmpParamBare$9, p$9, tmpIfTest$9, tmpCallCallee$17, tmpCalleeParam$17, tmpNestedComplexRhs$5);
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$11 = $$0;
      let p$11 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpCallCallee$19 = $$3;
      let tmpCalleeParam$19 = $$4;
      let tmpNestedComplexRhs$7 = $$5;
      debugger;
      a = tmpNestedComplexRhs$7;
      p$11 = tmpNestedComplexRhs$7;
      const tmpReturnArg$11 = tmpBranchingC(tmpParamBare$11, p$11, tmpIfTest$11);
      return tmpReturnArg$11;
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$13 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$1, tmpCallCallee$5, tmpCalleeParam$5, tmpNestedComplexRhs$1);
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$1, tmpCallCallee$5, tmpCalleeParam$5, tmpNestedComplexRhs$1);
      return tmpReturnArg$15;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    p$3 = tmpParamBare$3;
    const tmpReturnArg$17 = tmpBranchingC(tmpParamBare$3, p$3, tmpIfTest$3);
    return tmpReturnArg$17;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let p$5 = $$1;
    let tmpIfTest$5 = $$2;
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
let a = { a: 999, b: 1000 };
const tmpCallCallee$35 = $;
const tmpCalleeParam$35 = f();
tmpCallCallee$35(tmpCalleeParam$35);
$(a);
`````

## Output

`````js filename=intro
const tmpBranchingA$1 = function () {
  debugger;
  const tmpCalleeParam$13 = $(1);
  const tmpSSA_tmpNestedComplexRhs$3 = $(tmpCalleeParam$13);
  if (tmpSSA_tmpNestedComplexRhs$3) {
    const tmpCalleeParam$25 = $(2);
    const tmpSSA_tmpNestedComplexRhs$9 = $(tmpCalleeParam$25);
    a = tmpSSA_tmpNestedComplexRhs$9;
    return undefined;
  } else {
    a = tmpSSA_tmpNestedComplexRhs$3;
    return undefined;
  }
};
const tmpBranchingA = function () {
  debugger;
  const tmpCalleeParam$5 = $(1);
  const tmpNestedComplexRhs$1 = $(tmpCalleeParam$5);
  if (tmpNestedComplexRhs$1) {
    const tmpReturnArg$13 = tmpBranchingA$1();
    return tmpReturnArg$13;
  } else {
    a = tmpNestedComplexRhs$1;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$35 = tmpBranchingA();
$(tmpCalleeParam$35);
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
