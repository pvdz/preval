# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident opt simple opt simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b?.x?.y);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = b?.x?.y);
};
let b = { x: { y: 1 } };
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
    let tmpIfTest$3 = $$1;
    debugger;
    const tmpChainElementObject$3 = tmpChainRootProp$1.x;
    const tmpIfTest$5 = tmpChainElementObject$3 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3) {
      let tmpChainRootProp$7 = $$0;
      let tmpIfTest$11 = $$1;
      let tmpChainElementObject$7 = $$2;
      let tmpIfTest$13 = $$3;
      debugger;
      const tmpChainElementObject$9 = tmpChainElementObject$7.y;
      a = tmpChainElementObject$9;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpChainRootProp$7, tmpIfTest$11, tmpChainElementObject$7, tmpIfTest$13);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3) {
      let tmpChainRootProp$9 = $$0;
      let tmpIfTest$15 = $$1;
      let tmpChainElementObject$11 = $$2;
      let tmpIfTest$17 = $$3;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(tmpChainRootProp$9, tmpIfTest$15, tmpChainElementObject$11, tmpIfTest$17);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3) {
      let tmpChainRootProp$11 = $$0;
      let tmpIfTest$19 = $$1;
      let tmpChainElementObject$13 = $$2;
      let tmpIfTest$21 = $$3;
      debugger;
      const tmpReturnArg$7 = tmpBranchingC(tmpChainRootProp$11, tmpIfTest$19);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$9 = tmpBranchingA$1(tmpChainRootProp$1, tmpIfTest$3, tmpChainElementObject$3, tmpIfTest$5);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(tmpChainRootProp$1, tmpIfTest$3, tmpChainElementObject$3, tmpIfTest$5);
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpChainRootProp$3 = $$0;
    let tmpIfTest$7 = $$1;
    debugger;
    const tmpReturnArg$13 = tmpBranchingC(tmpChainRootProp$3, tmpIfTest$7);
    return tmpReturnArg$13;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpChainRootProp$5 = $$0;
    let tmpIfTest$9 = $$1;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingB(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$17;
  }
};
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpBranchingA = function ($$0) {
  const tmpChainRootProp$1 = $$0;
  debugger;
  const tmpChainElementObject$3 = tmpChainRootProp$1.x;
  const tmpIfTest$5 = tmpChainElementObject$3 != null;
  if (tmpIfTest$5) {
    const tmpChainElementObject$9 = tmpChainElementObject$3.y;
    a = tmpChainElementObject$9;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$11 = tmpBranchingC();
    return tmpReturnArg$11;
  }
};
const tmpBranchingC = function () {
  debugger;
  const tmpReturnArg$1 = a;
  return tmpReturnArg$1;
};
const f = function () {
  debugger;
  a = undefined;
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA(b);
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingC();
    return tmpReturnArg$17;
  }
};
const tmpObjLitVal = { y: 1 };
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
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
