# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Return > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b?.x.y.z);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = b?.x.y.z);
};
let b = { x: { y: { z: 100 } } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (tmpChainRootProp$1, tmpIfTest$1) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.x;
    const tmpChainElementObject$4 = tmpChainElementObject$3.y;
    const tmpChainElementObject$5 = tmpChainElementObject$4.z;
    a = tmpChainElementObject$5;
    const tmpReturnArg$2 = tmpBranchingC(tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpChainRootProp$2, tmpIfTest$2) {
    const tmpReturnArg$3 = tmpBranchingC(tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function (tmpChainRootProp$3, tmpIfTest$3) {
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$5;
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
const f = function () {
  a = undefined;
  const tmpIfTest = b != null;
  const tmpBranchingC = function () {
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpChainElementObject$3 = b.x;
    const tmpChainElementObject$4 = tmpChainElementObject$3.y;
    const tmpChainElementObject$5 = tmpChainElementObject$4.z;
    a = tmpChainElementObject$5;
    const tmpReturnArg$2 = tmpBranchingC();
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  }
};
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
