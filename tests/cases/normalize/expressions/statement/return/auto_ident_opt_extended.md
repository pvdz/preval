# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Statement > Return > Auto ident opt extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
function f() {
  return b?.x.y.z;
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return b?.x.y.z;
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
  let tmpReturnArg = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpReturnArg$1 = $$0;
    let tmpChainRootProp$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp$1.x;
    const tmpChainElementObject$7 = tmpChainElementObject$5.y;
    const tmpChainElementObject$9 = tmpChainElementObject$7.z;
    tmpReturnArg$1 = tmpChainElementObject$9;
    const tmpReturnArg$7 = tmpBranchingC(tmpReturnArg$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpReturnArg$3 = $$0;
    let tmpChainRootProp$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$9 = tmpBranchingC(tmpReturnArg$3, tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpReturnArg$5 = $$0;
    let tmpChainRootProp$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    return tmpReturnArg$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpReturnArg, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpReturnArg, tmpChainRootProp, tmpIfTest);
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
const f = function () {
  debugger;
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject$5 = b.x;
    const tmpChainElementObject$7 = tmpChainElementObject$5.y;
    const tmpChainElementObject$9 = tmpChainElementObject$7.z;
    return tmpChainElementObject$9;
  } else {
    return undefined;
  }
};
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
