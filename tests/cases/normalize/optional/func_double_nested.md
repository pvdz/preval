# Preval test case

# func_double_nested.md

> Normalize > Optional > Func double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj?.a?.b?.c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: { c: $() } } };
  return $(obj?.a?.b?.c);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$2 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpObjLitVal$3 = $$0;
    let tmpObjLitVal$4 = $$1;
    let tmpObjLitVal$5 = $$2;
    let obj$1 = $$3;
    let tmpCallCallee$1 = $$4;
    let tmpCalleeParam$1 = $$5;
    let tmpChainRootProp$1 = $$6;
    let tmpIfTest$3 = $$7;
    debugger;
    const tmpChainElementObject$3 = tmpChainRootProp$1.a;
    const tmpIfTest$4 = tmpChainElementObject$3 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$12 = $$0;
      let tmpObjLitVal$13 = $$1;
      let tmpObjLitVal$14 = $$2;
      let obj$4 = $$3;
      let tmpCallCallee$4 = $$4;
      let tmpCalleeParam$4 = $$5;
      let tmpChainRootProp$4 = $$6;
      let tmpIfTest$8 = $$7;
      let tmpChainElementObject$6 = $$8;
      let tmpIfTest$9 = $$9;
      debugger;
      const tmpChainElementObject$7 = tmpChainElementObject$6.b;
      const tmpIfTest$10 = tmpChainElementObject$7 != null;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11) {
        let tmpObjLitVal$21 = $$0;
        let tmpObjLitVal$22 = $$1;
        let tmpObjLitVal$23 = $$2;
        let obj$7 = $$3;
        let tmpCallCallee$7 = $$4;
        let tmpCalleeParam$7 = $$5;
        let tmpChainRootProp$7 = $$6;
        let tmpIfTest$15 = $$7;
        let tmpChainElementObject$11 = $$8;
        let tmpIfTest$16 = $$9;
        let tmpChainElementObject$12 = $$10;
        let tmpIfTest$17 = $$11;
        debugger;
        const tmpChainElementObject$13 = tmpChainElementObject$12.c;
        tmpCalleeParam$7 = tmpChainElementObject$13;
        const tmpReturnArg$2 = tmpBranchingC$2(
          tmpObjLitVal$21,
          tmpObjLitVal$22,
          tmpObjLitVal$23,
          obj$7,
          tmpCallCallee$7,
          tmpCalleeParam$7,
          tmpChainRootProp$7,
          tmpIfTest$15,
          tmpChainElementObject$11,
          tmpIfTest$16,
          tmpChainElementObject$12,
          tmpIfTest$17,
        );
        return tmpReturnArg$2;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11) {
        let tmpObjLitVal$24 = $$0;
        let tmpObjLitVal$25 = $$1;
        let tmpObjLitVal$26 = $$2;
        let obj$8 = $$3;
        let tmpCallCallee$8 = $$4;
        let tmpCalleeParam$8 = $$5;
        let tmpChainRootProp$8 = $$6;
        let tmpIfTest$18 = $$7;
        let tmpChainElementObject$14 = $$8;
        let tmpIfTest$19 = $$9;
        let tmpChainElementObject$15 = $$10;
        let tmpIfTest$20 = $$11;
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$2(
          tmpObjLitVal$24,
          tmpObjLitVal$25,
          tmpObjLitVal$26,
          obj$8,
          tmpCallCallee$8,
          tmpCalleeParam$8,
          tmpChainRootProp$8,
          tmpIfTest$18,
          tmpChainElementObject$14,
          tmpIfTest$19,
          tmpChainElementObject$15,
          tmpIfTest$20,
        );
        return tmpReturnArg$3;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11) {
        let tmpObjLitVal$27 = $$0;
        let tmpObjLitVal$28 = $$1;
        let tmpObjLitVal$29 = $$2;
        let obj$9 = $$3;
        let tmpCallCallee$9 = $$4;
        let tmpCalleeParam$9 = $$5;
        let tmpChainRootProp$9 = $$6;
        let tmpIfTest$21 = $$7;
        let tmpChainElementObject$16 = $$8;
        let tmpIfTest$22 = $$9;
        let tmpChainElementObject$17 = $$10;
        let tmpIfTest$23 = $$11;
        debugger;
        const tmpReturnArg$4 = tmpBranchingC$1(
          tmpObjLitVal$27,
          tmpObjLitVal$28,
          tmpObjLitVal$29,
          obj$9,
          tmpCallCallee$9,
          tmpCalleeParam$9,
          tmpChainRootProp$9,
          tmpIfTest$21,
          tmpChainElementObject$16,
          tmpIfTest$22,
        );
        return tmpReturnArg$4;
      };
      if (tmpIfTest$10) {
        const tmpReturnArg$5 = tmpBranchingA$2(
          tmpObjLitVal$12,
          tmpObjLitVal$13,
          tmpObjLitVal$14,
          obj$4,
          tmpCallCallee$4,
          tmpCalleeParam$4,
          tmpChainRootProp$4,
          tmpIfTest$8,
          tmpChainElementObject$6,
          tmpIfTest$9,
          tmpChainElementObject$7,
          tmpIfTest$10,
        );
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$6 = tmpBranchingB$2(
          tmpObjLitVal$12,
          tmpObjLitVal$13,
          tmpObjLitVal$14,
          obj$4,
          tmpCallCallee$4,
          tmpCalleeParam$4,
          tmpChainRootProp$4,
          tmpIfTest$8,
          tmpChainElementObject$6,
          tmpIfTest$9,
          tmpChainElementObject$7,
          tmpIfTest$10,
        );
        return tmpReturnArg$6;
      }
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$15 = $$0;
      let tmpObjLitVal$16 = $$1;
      let tmpObjLitVal$17 = $$2;
      let obj$5 = $$3;
      let tmpCallCallee$5 = $$4;
      let tmpCalleeParam$5 = $$5;
      let tmpChainRootProp$5 = $$6;
      let tmpIfTest$11 = $$7;
      let tmpChainElementObject$9 = $$8;
      let tmpIfTest$12 = $$9;
      debugger;
      const tmpReturnArg$7 = tmpBranchingC$1(
        tmpObjLitVal$15,
        tmpObjLitVal$16,
        tmpObjLitVal$17,
        obj$5,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpChainRootProp$5,
        tmpIfTest$11,
        tmpChainElementObject$9,
        tmpIfTest$12,
      );
      return tmpReturnArg$7;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$18 = $$0;
      let tmpObjLitVal$19 = $$1;
      let tmpObjLitVal$20 = $$2;
      let obj$6 = $$3;
      let tmpCallCallee$6 = $$4;
      let tmpCalleeParam$6 = $$5;
      let tmpChainRootProp$6 = $$6;
      let tmpIfTest$13 = $$7;
      let tmpChainElementObject$10 = $$8;
      let tmpIfTest$14 = $$9;
      debugger;
      const tmpReturnArg$8 = tmpBranchingC(
        tmpObjLitVal$18,
        tmpObjLitVal$19,
        tmpObjLitVal$20,
        obj$6,
        tmpCallCallee$6,
        tmpCalleeParam$6,
        tmpChainRootProp$6,
        tmpIfTest$13,
      );
      return tmpReturnArg$8;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$9 = tmpBranchingA$1(
        tmpObjLitVal$3,
        tmpObjLitVal$4,
        tmpObjLitVal$5,
        obj$1,
        tmpCallCallee$1,
        tmpCalleeParam$1,
        tmpChainRootProp$1,
        tmpIfTest$3,
        tmpChainElementObject$3,
        tmpIfTest$4,
      );
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$10 = tmpBranchingB$1(
        tmpObjLitVal$3,
        tmpObjLitVal$4,
        tmpObjLitVal$5,
        obj$1,
        tmpCallCallee$1,
        tmpCalleeParam$1,
        tmpChainRootProp$1,
        tmpIfTest$3,
        tmpChainElementObject$3,
        tmpIfTest$4,
      );
      return tmpReturnArg$10;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpObjLitVal$6 = $$0;
    let tmpObjLitVal$7 = $$1;
    let tmpObjLitVal$8 = $$2;
    let obj$2 = $$3;
    let tmpCallCallee$2 = $$4;
    let tmpCalleeParam$2 = $$5;
    let tmpChainRootProp$2 = $$6;
    let tmpIfTest$6 = $$7;
    debugger;
    const tmpReturnArg$11 = tmpBranchingC(
      tmpObjLitVal$6,
      tmpObjLitVal$7,
      tmpObjLitVal$8,
      obj$2,
      tmpCallCallee$2,
      tmpCalleeParam$2,
      tmpChainRootProp$2,
      tmpIfTest$6,
    );
    return tmpReturnArg$11;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpObjLitVal$9 = $$0;
    let tmpObjLitVal$10 = $$1;
    let tmpObjLitVal$11 = $$2;
    let obj$3 = $$3;
    let tmpCallCallee$3 = $$4;
    let tmpCalleeParam$3 = $$5;
    let tmpChainRootProp$3 = $$6;
    let tmpIfTest$7 = $$7;
    debugger;
    const tmpReturnArg$1 = tmpCallCallee$3(tmpCalleeParam$3);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$12 = tmpBranchingA(
      tmpObjLitVal$2,
      tmpObjLitVal$1,
      tmpObjLitVal,
      obj,
      tmpCallCallee,
      tmpCalleeParam,
      tmpChainRootProp,
      tmpIfTest,
    );
    return tmpReturnArg$12;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(
      tmpObjLitVal$2,
      tmpObjLitVal$1,
      tmpObjLitVal,
      obj,
      tmpCallCallee,
      tmpCalleeParam,
      tmpChainRootProp,
      tmpIfTest,
    );
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$10 = $;
const tmpCalleeParam$10 = f();
tmpCallCallee$10(tmpCalleeParam$10);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpObjLitVal$2 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpIfTest = obj != null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    const tmpCallCallee$1 = $$0;
    const tmpCalleeParam$1 = $$1;
    const tmpChainRootProp$1 = $$2;
    debugger;
    const tmpChainElementObject$3 = tmpChainRootProp$1.a;
    const tmpIfTest$4 = tmpChainElementObject$3 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      const tmpCallCallee$4 = $$0;
      const tmpCalleeParam$4 = $$1;
      const tmpChainElementObject$6 = $$2;
      debugger;
      const tmpChainElementObject$7 = tmpChainElementObject$6.b;
      const tmpIfTest$10 = tmpChainElementObject$7 != null;
      if (tmpIfTest$10) {
        const tmpChainElementObject$13 = tmpChainElementObject$7.c;
        const tmpReturnArg$2 = tmpCallCallee$4(tmpChainElementObject$13);
        return tmpReturnArg$2;
      } else {
        const tmpReturnArg$6 = tmpCallCallee$4(tmpCalleeParam$4);
        return tmpReturnArg$6;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$9 = tmpBranchingA$1(tmpCallCallee$1, tmpCalleeParam$1, tmpChainElementObject$3);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$10 = tmpCallCallee$1(tmpCalleeParam$1);
      return tmpReturnArg$10;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$12 = tmpBranchingA($, undefined, obj);
    return tmpReturnArg$12;
  } else {
    const tmpReturnArg$13 = $(undefined);
    return tmpReturnArg$13;
  }
};
const tmpCalleeParam$10 = f();
$(tmpCalleeParam$10);
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
