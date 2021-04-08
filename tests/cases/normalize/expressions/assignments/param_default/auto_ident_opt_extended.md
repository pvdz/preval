# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
function f(p = (a = b?.x.y.z)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = b?.x.y.z) : tmpParamBare;
};
let b = { x: { y: { z: 100 } } };
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
      const tmpChainElementObject$11 = tmpChainRootProp$1.x;
      const tmpChainElementObject$13 = tmpChainElementObject$11.y;
      const tmpChainElementObject$15 = tmpChainElementObject$13.z;
      tmpNestedComplexRhs$1 = tmpChainElementObject$15;
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
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
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
  const tmpIfTest$3 = b != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$11 = b.x;
    const tmpChainElementObject$13 = tmpChainElementObject$11.y;
    const tmpChainElementObject$15 = tmpChainElementObject$13.z;
    tmpNestedComplexRhs$1 = tmpChainElementObject$15;
    a = tmpNestedComplexRhs$1;
    return undefined;
  } else {
    a = tmpNestedComplexRhs$1;
    return undefined;
  }
};
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = tmpBranchingA();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
