# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = b?.x)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = b?.x) : tmpParamBare;
};
let b = { x: 1 };
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
    const tmpIfTest$3 = tmpChainRootProp$1 != null;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpChainElementObject$3 = tmpChainRootProp$1.x;
      tmpNestedComplexRhs$1 = tmpChainElementObject$3;
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
    if (tmpIfTest$3) {
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
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const b = { x: 1 };
let tmpNestedComplexRhs$1 = undefined;
const tmpIfTest$3 = b != null;
const tmpBranchingC$1 = function () {
  debugger;
  a = tmpNestedComplexRhs$1;
  return undefined;
};
if (tmpIfTest$3) {
  const tmpChainElementObject$3 = b.x;
  tmpNestedComplexRhs$1 = tmpChainElementObject$3;
  tmpBranchingC$1();
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
 - 1: undefined
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
