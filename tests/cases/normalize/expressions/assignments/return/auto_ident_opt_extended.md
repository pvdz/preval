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
  debugger;
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
  debugger;
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1) {
    let tmpChainRootProp$1 = $$0;
    let tmpIfTest$1 = $$1;
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp$1.x;
    const tmpChainElementObject$7 = tmpChainElementObject$5.y;
    const tmpChainElementObject$9 = tmpChainElementObject$7.z;
    a = tmpChainElementObject$9;
    const tmpReturnArg$3 = tmpBranchingC(tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpChainRootProp$3 = $$0;
    let tmpIfTest$3 = $$1;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpChainRootProp$5 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$9;
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
  debugger;
  a = undefined;
  const tmpIfTest = b != null;
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpChainElementObject$5 = b.x;
    const tmpChainElementObject$7 = tmpChainElementObject$5.y;
    const tmpChainElementObject$9 = tmpChainElementObject$7.z;
    a = tmpChainElementObject$9;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
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
