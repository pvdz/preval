# Preval test case

# func_nested.md

> Normalize > Optional > Func nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj?.a?.b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: $() } };
  return $(obj?.a?.b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$3 = $$0;
    let tmpObjLitVal$5 = $$1;
    let obj$1 = $$2;
    let tmpCallCallee$1 = $$3;
    let tmpCalleeParam$1 = $$4;
    let tmpChainRootProp$1 = $$5;
    let tmpIfTest$3 = $$6;
    debugger;
    const tmpChainElementObject$3 = tmpChainRootProp$1.a;
    const tmpIfTest$5 = tmpChainElementObject$3 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$15 = $$0;
      let tmpObjLitVal$17 = $$1;
      let obj$7 = $$2;
      let tmpCallCallee$7 = $$3;
      let tmpCalleeParam$7 = $$4;
      let tmpChainRootProp$7 = $$5;
      let tmpIfTest$11 = $$6;
      let tmpChainElementObject$7 = $$7;
      let tmpIfTest$13 = $$8;
      debugger;
      const tmpChainElementObject$9 = tmpChainElementObject$7.b;
      tmpCalleeParam$7 = tmpChainElementObject$9;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpObjLitVal$15,
        tmpObjLitVal$17,
        obj$7,
        tmpCallCallee$7,
        tmpCalleeParam$7,
        tmpChainRootProp$7,
        tmpIfTest$11,
        tmpChainElementObject$7,
        tmpIfTest$13,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$19 = $$0;
      let tmpObjLitVal$21 = $$1;
      let obj$9 = $$2;
      let tmpCallCallee$9 = $$3;
      let tmpCalleeParam$9 = $$4;
      let tmpChainRootProp$9 = $$5;
      let tmpIfTest$15 = $$6;
      let tmpChainElementObject$11 = $$7;
      let tmpIfTest$17 = $$8;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpObjLitVal$19,
        tmpObjLitVal$21,
        obj$9,
        tmpCallCallee$9,
        tmpCalleeParam$9,
        tmpChainRootProp$9,
        tmpIfTest$15,
        tmpChainElementObject$11,
        tmpIfTest$17,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$23 = $$0;
      let tmpObjLitVal$25 = $$1;
      let obj$11 = $$2;
      let tmpCallCallee$11 = $$3;
      let tmpCalleeParam$11 = $$4;
      let tmpChainRootProp$11 = $$5;
      let tmpIfTest$19 = $$6;
      let tmpChainElementObject$13 = $$7;
      let tmpIfTest$21 = $$8;
      debugger;
      const tmpReturnArg$7 = tmpBranchingC(
        tmpObjLitVal$23,
        tmpObjLitVal$25,
        obj$11,
        tmpCallCallee$11,
        tmpCalleeParam$11,
        tmpChainRootProp$11,
        tmpIfTest$19,
      );
      return tmpReturnArg$7;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$9 = tmpBranchingA$1(
        tmpObjLitVal$3,
        tmpObjLitVal$5,
        obj$1,
        tmpCallCallee$1,
        tmpCalleeParam$1,
        tmpChainRootProp$1,
        tmpIfTest$3,
        tmpChainElementObject$3,
        tmpIfTest$5,
      );
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(
        tmpObjLitVal$3,
        tmpObjLitVal$5,
        obj$1,
        tmpCallCallee$1,
        tmpCalleeParam$1,
        tmpChainRootProp$1,
        tmpIfTest$3,
        tmpChainElementObject$3,
        tmpIfTest$5,
      );
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$7 = $$0;
    let tmpObjLitVal$9 = $$1;
    let obj$3 = $$2;
    let tmpCallCallee$3 = $$3;
    let tmpCalleeParam$3 = $$4;
    let tmpChainRootProp$3 = $$5;
    let tmpIfTest$7 = $$6;
    debugger;
    const tmpReturnArg$13 = tmpBranchingC(
      tmpObjLitVal$7,
      tmpObjLitVal$9,
      obj$3,
      tmpCallCallee$3,
      tmpCalleeParam$3,
      tmpChainRootProp$3,
      tmpIfTest$7,
    );
    return tmpReturnArg$13;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$11 = $$0;
    let tmpObjLitVal$13 = $$1;
    let obj$5 = $$2;
    let tmpCallCallee$5 = $$3;
    let tmpCalleeParam$5 = $$4;
    let tmpChainRootProp$5 = $$5;
    let tmpIfTest$9 = $$6;
    debugger;
    const tmpReturnArg$1 = tmpCallCallee$5(tmpCalleeParam$5);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA(tmpObjLitVal$1, tmpObjLitVal, obj, tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = tmpBranchingB(tmpObjLitVal$1, tmpObjLitVal, obj, tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$17;
  }
};
const tmpCallCallee$13 = $;
const tmpCalleeParam$13 = f();
tmpCallCallee$13(tmpCalleeParam$13);
`````

## Output

`````js filename=intro
const tmpBranchingA = function ($$0, $$1) {
  const tmpCallCallee$1 = $$0;
  const tmpChainRootProp$1 = $$1;
  debugger;
  const tmpChainElementObject$3 = tmpChainRootProp$1.a;
  const tmpIfTest$5 = tmpChainElementObject$3 != null;
  if (tmpIfTest$5) {
    const tmpChainElementObject$9 = tmpChainElementObject$3.b;
    const tmpReturnArg$3 = tmpCallCallee$1(tmpChainElementObject$9);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$11 = tmpCallCallee$1(undefined);
    return tmpReturnArg$11;
  }
};
const f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpIfTest = obj != null;
  if (tmpIfTest) {
    const tmpReturnArg$15 = tmpBranchingA($, obj);
    return tmpReturnArg$15;
  } else {
    const tmpReturnArg$17 = $(undefined);
    return tmpReturnArg$17;
  }
};
const tmpCalleeParam$13 = f();
$(tmpCalleeParam$13);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
