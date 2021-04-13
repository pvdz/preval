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
  const tmpBranchingA = function () {
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    let tmpNestedComplexRhs$1 = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallCallee$11 = $;
      const tmpCalleeParam$11 = $(1);
      tmpNestedComplexRhs$1 = tmpCallCallee$11(tmpCalleeParam$11);
      const tmpReturnArg = tmpBranchingC$1();
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpBranchingA$3 = function () {
        debugger;
        const tmpCallCallee$15 = $;
        const tmpCalleeParam$15 = $(2);
        tmpNestedComplexRhs$1 = tmpCallCallee$15(tmpCalleeParam$15);
        const tmpReturnArg$3 = tmpBranchingC$3();
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$3();
        return tmpReturnArg$5;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        a = tmpNestedComplexRhs$1;
        p = tmpNestedComplexRhs$1;
        const tmpReturnArg$7 = tmpBranchingC();
        return tmpReturnArg$7;
      };
      if (tmpNestedComplexRhs$1) {
        const tmpReturnArg$9 = tmpBranchingA$3();
        return tmpReturnArg$9;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$3();
        return tmpReturnArg$11;
      }
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$13 = tmpBranchingA$1();
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1();
      return tmpReturnArg$15;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    p = tmpParamBare;
    const tmpReturnArg$17 = tmpBranchingC();
    return tmpReturnArg$17;
  };
  const tmpBranchingC = function () {
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA();
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB();
    return tmpReturnArg$21;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$17 = $;
const tmpCalleeParam$17 = f();
tmpCallCallee$17(tmpCalleeParam$17);
$(a);
`````

## Output

`````js filename=intro
const tmpBranchingA = function () {
  debugger;
  const tmpCalleeParam$5 = $(1);
  let tmpNestedComplexRhs$1 = $(tmpCalleeParam$5);
  const tmpBranchingC$1 = function () {
    debugger;
    if (tmpNestedComplexRhs$1) {
      const tmpCalleeParam$15 = $(2);
      tmpNestedComplexRhs$1 = $(tmpCalleeParam$15);
      a = tmpNestedComplexRhs$1;
      return undefined;
    } else {
      a = tmpNestedComplexRhs$1;
      return undefined;
    }
  };
  if (tmpNestedComplexRhs$1) {
    const tmpCalleeParam$11 = $(1);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$11);
    const tmpReturnArg = tmpBranchingC$1();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$15 = tmpBranchingC$1();
    return tmpReturnArg$15;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$17 = tmpBranchingA();
$(tmpCalleeParam$17);
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
