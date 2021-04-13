# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f(p = (a = b?.c.d.e?.(1))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = b?.c.d.e?.(1)) : tmpParamBare;
};
let b = { c: { d: { e: $ } } };
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
    const tmpChainRootProp$1 = b;
    const tmpIfTest$5 = tmpChainRootProp$1 != null;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpChainElementObject$11 = tmpChainRootProp$1.c;
      const tmpChainElementObject$13 = tmpChainElementObject$11.d;
      const tmpChainElementObject$15 = tmpChainElementObject$13.e;
      const tmpIfTest$9 = tmpChainElementObject$15 != null;
      const tmpBranchingA$3 = function () {
        debugger;
        const tmpChainElementCall$5 = tmpChainElementObject$15.call(tmpChainElementObject$13, 1);
        tmpNestedComplexRhs$1 = tmpChainElementCall$5;
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
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpBranchingA = function () {
  debugger;
  let tmpNestedComplexRhs$1 = undefined;
  const tmpIfTest$5 = b != null;
  const tmpBranchingA$1 = function () {
    debugger;
    const tmpChainElementObject$11 = b.c;
    const tmpChainElementObject$13 = tmpChainElementObject$11.d;
    const tmpChainElementObject$15 = tmpChainElementObject$13.e;
    const tmpIfTest$9 = tmpChainElementObject$15 != null;
    if (tmpIfTest$9) {
      const tmpChainElementCall$5 = tmpChainElementObject$15.call(tmpChainElementObject$13, 1);
      tmpNestedComplexRhs$1 = tmpChainElementCall$5;
      const tmpReturnArg = tmpBranchingC$1();
      return tmpReturnArg;
    } else {
      const tmpReturnArg$7 = tmpBranchingC$1();
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingC$1 = function () {
    debugger;
    a = tmpNestedComplexRhs$1;
    return undefined;
  };
  if (tmpIfTest$5) {
    const tmpReturnArg$13 = tmpBranchingA$1();
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingC$1();
    return tmpReturnArg$15;
  }
};
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = tmpBranchingA();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
