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
    let tmpObjLitVal$2 = $$0;
    let tmpObjLitVal$3 = $$1;
    let obj$1 = $$2;
    let tmpCallCallee$1 = $$3;
    let tmpCalleeParam$1 = $$4;
    let tmpChainRootProp$1 = $$5;
    let tmpIfTest$2 = $$6;
    debugger;
    const tmpChainElementObject$2 = tmpChainRootProp$1.a;
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$8 = $$0;
      let tmpObjLitVal$9 = $$1;
      let obj$4 = $$2;
      let tmpCallCallee$4 = $$3;
      let tmpCalleeParam$4 = $$4;
      let tmpChainRootProp$4 = $$5;
      let tmpIfTest$6 = $$6;
      let tmpChainElementObject$4 = $$7;
      let tmpIfTest$7 = $$8;
      debugger;
      const tmpChainElementObject$5 = tmpChainElementObject$4.b;
      tmpCalleeParam$4 = tmpChainElementObject$5;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpObjLitVal$8,
        tmpObjLitVal$9,
        obj$4,
        tmpCallCallee$4,
        tmpCalleeParam$4,
        tmpChainRootProp$4,
        tmpIfTest$6,
        tmpChainElementObject$4,
        tmpIfTest$7,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$10 = $$0;
      let tmpObjLitVal$11 = $$1;
      let obj$5 = $$2;
      let tmpCallCallee$5 = $$3;
      let tmpCalleeParam$5 = $$4;
      let tmpChainRootProp$5 = $$5;
      let tmpIfTest$8 = $$6;
      let tmpChainElementObject$6 = $$7;
      let tmpIfTest$9 = $$8;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpObjLitVal$10,
        tmpObjLitVal$11,
        obj$5,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpChainRootProp$5,
        tmpIfTest$8,
        tmpChainElementObject$6,
        tmpIfTest$9,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
      let tmpObjLitVal$12 = $$0;
      let tmpObjLitVal$13 = $$1;
      let obj$6 = $$2;
      let tmpCallCallee$6 = $$3;
      let tmpCalleeParam$6 = $$4;
      let tmpChainRootProp$6 = $$5;
      let tmpIfTest$10 = $$6;
      let tmpChainElementObject$7 = $$7;
      let tmpIfTest$11 = $$8;
      debugger;
      const tmpReturnArg$4 = tmpBranchingC(
        tmpObjLitVal$12,
        tmpObjLitVal$13,
        obj$6,
        tmpCallCallee$6,
        tmpCalleeParam$6,
        tmpChainRootProp$6,
        tmpIfTest$10,
      );
      return tmpReturnArg$4;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1(
        tmpObjLitVal$2,
        tmpObjLitVal$3,
        obj$1,
        tmpCallCallee$1,
        tmpCalleeParam$1,
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(
        tmpObjLitVal$2,
        tmpObjLitVal$3,
        obj$1,
        tmpCallCallee$1,
        tmpCalleeParam$1,
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$4 = $$0;
    let tmpObjLitVal$5 = $$1;
    let obj$2 = $$2;
    let tmpCallCallee$2 = $$3;
    let tmpCalleeParam$2 = $$4;
    let tmpChainRootProp$2 = $$5;
    let tmpIfTest$4 = $$6;
    debugger;
    const tmpReturnArg$7 = tmpBranchingC(
      tmpObjLitVal$4,
      tmpObjLitVal$5,
      obj$2,
      tmpCallCallee$2,
      tmpCalleeParam$2,
      tmpChainRootProp$2,
      tmpIfTest$4,
    );
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$6 = $$0;
    let tmpObjLitVal$7 = $$1;
    let obj$3 = $$2;
    let tmpCallCallee$3 = $$3;
    let tmpCalleeParam$3 = $$4;
    let tmpChainRootProp$3 = $$5;
    let tmpIfTest$5 = $$6;
    debugger;
    const tmpReturnArg$1 = tmpCallCallee$3(tmpCalleeParam$3);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpObjLitVal$1, tmpObjLitVal, obj, tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpObjLitVal$1, tmpObjLitVal, obj, tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$9;
  }
};
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpIfTest = obj != null;
  const tmpBranchingA = function ($$0, $$1) {
    const tmpCallCallee$1 = $$0;
    const tmpChainRootProp$1 = $$1;
    debugger;
    const tmpChainElementObject$2 = tmpChainRootProp$1.a;
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$5 = tmpChainElementObject$2.b;
      const tmpReturnArg$2 = tmpCallCallee$1(tmpChainElementObject$5);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$6 = tmpCallCallee$1(undefined);
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA($, obj);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = $(undefined);
    return tmpReturnArg$9;
  }
};
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
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
