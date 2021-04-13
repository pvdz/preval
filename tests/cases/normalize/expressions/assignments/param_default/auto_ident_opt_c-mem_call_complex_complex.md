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
let b = { $: $ };
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
    let tmpNestedComplexRhs$1 = undefined;
    const tmpChainRootCall$1 = $;
    const tmpChainElementCall$3 = tmpChainRootCall$1(b);
    const tmpIfTest$5 = tmpChainElementCall$3 != null;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpChainRootComputed$3 = $('$');
      const tmpChainElementObject$3 = tmpChainElementCall$3[tmpChainRootComputed$3];
      const tmpIfTest$9 = tmpChainElementObject$3 != null;
      const tmpBranchingA$3 = function () {
        debugger;
        const tmpCallObj$5 = tmpChainElementObject$3;
        const tmpCallVal$5 = tmpCallObj$5.call;
        const tmpCalleeParam$11 = tmpChainElementCall$3;
        const tmpCalleeParam$13 = $(1);
        const tmpChainElementCall$9 = tmpCallVal$5.call(tmpCallObj$5, tmpCalleeParam$11, tmpCalleeParam$13);
        tmpNestedComplexRhs$1 = tmpChainElementCall$9;
        const tmpReturnArg = tmpBranchingC$3();
        return tmpReturnArg;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$1 = tmpBranchingC$3();
        return tmpReturnArg$1;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$1();
        return tmpReturnArg$3;
      };
      if (tmpIfTest$9) {
        const tmpReturnArg$5 = tmpBranchingA$3();
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$3();
        return tmpReturnArg$7;
      }
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$9 = tmpBranchingC$1();
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      a = tmpNestedComplexRhs$1;
      p = tmpNestedComplexRhs$1;
      const tmpReturnArg$11 = tmpBranchingC();
      return tmpReturnArg$11;
    };
    if (tmpIfTest$5) {
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
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA();
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB();
    return tmpReturnArg$21;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$15 = f();
tmpCallCallee(tmpCalleeParam$15);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpNestedComplexRhs$1 = undefined;
const tmpChainElementCall$3 = $(b);
const tmpIfTest$5 = tmpChainElementCall$3 != null;
const tmpBranchingA$1 = function () {
  debugger;
  const tmpChainRootComputed$3 = $('$');
  const tmpChainElementObject$3 = tmpChainElementCall$3[tmpChainRootComputed$3];
  const tmpIfTest$9 = tmpChainElementObject$3 != null;
  if (tmpIfTest$9) {
    const tmpCallVal$5 = tmpChainElementObject$3.call;
    const tmpCalleeParam$13 = $(1);
    const tmpChainElementCall$9 = tmpCallVal$5.call(tmpChainElementObject$3, tmpChainElementCall$3, tmpCalleeParam$13);
    tmpNestedComplexRhs$1 = tmpChainElementCall$9;
    tmpBranchingC$1();
    return undefined;
  } else {
    tmpBranchingC$1();
    return undefined;
  }
};
const tmpBranchingC$1 = function () {
  debugger;
  a = tmpNestedComplexRhs$1;
  return undefined;
};
if (tmpIfTest$5) {
  tmpBranchingA$1();
} else {
  tmpBranchingC$1();
}
$(undefined);
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
