# Preval test case

# ident_opt_call_complex_complex2.md

> Normalize > Expressions > Assignments > Param default > Ident opt call complex complex2
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$3 = tmpChainElementCall$2 != null;
    const tmpBranchingC$1 = function (tmpNestedComplexRhs$4) {
      a = tmpNestedComplexRhs$4;
    };
    if (tmpIfTest$3) {
      const tmpCallVal$2 = tmpChainElementCall$2.call;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$5 = tmpCallVal$2.call(tmpChainElementCall$2, $, tmpCalleeParam$5);
      const tmpReturnArg = (a = tmpChainElementCall$5);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$4 = (a = undefined);
      return tmpReturnArg$4;
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
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
$(a);
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let tmpParamDefault = $$0;
  debugger;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$3 = tmpChainElementCall$2 != null;
    const tmpBranchingC$1 = function ($$0) {
      let tmpNestedComplexRhs$4 = $$0;
      debugger;
      a = tmpNestedComplexRhs$4;
    };
    if (tmpIfTest$3) {
      const tmpCallVal$2 = tmpChainElementCall$2.call;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$5 = tmpCallVal$2.call(tmpChainElementCall$2, $, tmpCalleeParam$5);
      const tmpReturnArg = (a = tmpChainElementCall$5);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$4 = (a = undefined);
      return tmpReturnArg$4;
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
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
$(a);
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let tmpParamDefault = $$0;
  debugger;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$3 = tmpChainElementCall$2 != null;
    const tmpBranchingC$1 = function ($$0) {
      let tmpNestedComplexRhs$4 = $$0;
      debugger;
      a = tmpNestedComplexRhs$4;
    };
    if (tmpIfTest$3) {
      const tmpCallVal$2 = tmpChainElementCall$2.call;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$5 = tmpCallVal$2.call(tmpChainElementCall$2, $, tmpCalleeParam$5);
      a = tmpChainElementCall$5;
      let tmpReturnArg = a;
      return tmpReturnArg;
    } else {
      a = undefined;
      let tmpReturnArg$4 = a;
      return tmpReturnArg$4;
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
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpChainElementCall$2 = $($);
  const tmpIfTest$3 = tmpChainElementCall$2 != null;
  if (tmpIfTest$3) {
    const tmpCallVal$1 = tmpChainElementCall$2.call;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$3 = tmpCallVal$1.call(tmpChainElementCall$2, $, tmpCalleeParam$1);
    a = tmpChainElementCall$3;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  } else {
    a = undefined;
    const tmpReturnArg$2 = a;
    return tmpReturnArg$2;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same