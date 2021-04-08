# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(1)) && $($(2)))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = $($(1)) && $($(2))) : tmpParamBare;
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
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    let tmpNestedComplexRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpCallCallee$7 = $;
      const tmpCalleeParam$7 = $(2);
      tmpNestedComplexRhs$1 = tmpCallCallee$7(tmpCalleeParam$7);
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
      a = tmpNestedComplexRhs$1;
      p = tmpNestedComplexRhs$1;
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    };
    if (tmpNestedComplexRhs$1) {
      const tmpReturnArg$5 = tmpBranchingA$1();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1();
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    p = tmpParamBare;
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function () {
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
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
  const tmpCalleeParam$3 = $(1);
  let tmpNestedComplexRhs$1 = $(tmpCalleeParam$3);
  if (tmpNestedComplexRhs$1) {
    const tmpCalleeParam$7 = $(2);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$7);
    a = tmpNestedComplexRhs$1;
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
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
