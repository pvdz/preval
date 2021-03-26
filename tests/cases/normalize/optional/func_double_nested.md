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
  const tmpObjLitVal$3 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpObjLitVal$5 = $$0;
    let tmpObjLitVal$7 = $$1;
    let tmpObjLitVal$9 = $$2;
    let obj$1 = $$3;
    let tmpCallCallee$1 = $$4;
    let tmpCalleeParam$1 = $$5;
    let tmpChainRootProp$1 = $$6;
    let tmpIfTest$5 = $$7;
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp$1.a;
    const tmpIfTest$7 = tmpChainElementObject$5 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$23 = $$0;
      let tmpObjLitVal$25 = $$1;
      let tmpObjLitVal$27 = $$2;
      let obj$7 = $$3;
      let tmpCallCallee$7 = $$4;
      let tmpCalleeParam$7 = $$5;
      let tmpChainRootProp$7 = $$6;
      let tmpIfTest$15 = $$7;
      let tmpChainElementObject$11 = $$8;
      let tmpIfTest$17 = $$9;
      debugger;
      const tmpChainElementObject$13 = tmpChainElementObject$11.b;
      const tmpIfTest$19 = tmpChainElementObject$13 != null;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11) {
        let tmpObjLitVal$41 = $$0;
        let tmpObjLitVal$43 = $$1;
        let tmpObjLitVal$45 = $$2;
        let obj$13 = $$3;
        let tmpCallCallee$13 = $$4;
        let tmpCalleeParam$13 = $$5;
        let tmpChainRootProp$13 = $$6;
        let tmpIfTest$29 = $$7;
        let tmpChainElementObject$21 = $$8;
        let tmpIfTest$31 = $$9;
        let tmpChainElementObject$23 = $$10;
        let tmpIfTest$33 = $$11;
        debugger;
        const tmpChainElementObject$25 = tmpChainElementObject$23.c;
        tmpCalleeParam$13 = tmpChainElementObject$25;
        const tmpReturnArg$3 = tmpBranchingC$3(
          tmpObjLitVal$41,
          tmpObjLitVal$43,
          tmpObjLitVal$45,
          obj$13,
          tmpCallCallee$13,
          tmpCalleeParam$13,
          tmpChainRootProp$13,
          tmpIfTest$29,
          tmpChainElementObject$21,
          tmpIfTest$31,
          tmpChainElementObject$23,
          tmpIfTest$33,
        );
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11) {
        let tmpObjLitVal$47 = $$0;
        let tmpObjLitVal$49 = $$1;
        let tmpObjLitVal$51 = $$2;
        let obj$15 = $$3;
        let tmpCallCallee$15 = $$4;
        let tmpCalleeParam$15 = $$5;
        let tmpChainRootProp$15 = $$6;
        let tmpIfTest$35 = $$7;
        let tmpChainElementObject$27 = $$8;
        let tmpIfTest$37 = $$9;
        let tmpChainElementObject$29 = $$10;
        let tmpIfTest$39 = $$11;
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$3(
          tmpObjLitVal$47,
          tmpObjLitVal$49,
          tmpObjLitVal$51,
          obj$15,
          tmpCallCallee$15,
          tmpCalleeParam$15,
          tmpChainRootProp$15,
          tmpIfTest$35,
          tmpChainElementObject$27,
          tmpIfTest$37,
          tmpChainElementObject$29,
          tmpIfTest$39,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10, $$11) {
        let tmpObjLitVal$53 = $$0;
        let tmpObjLitVal$55 = $$1;
        let tmpObjLitVal$57 = $$2;
        let obj$17 = $$3;
        let tmpCallCallee$17 = $$4;
        let tmpCalleeParam$17 = $$5;
        let tmpChainRootProp$17 = $$6;
        let tmpIfTest$41 = $$7;
        let tmpChainElementObject$31 = $$8;
        let tmpIfTest$43 = $$9;
        let tmpChainElementObject$33 = $$10;
        let tmpIfTest$45 = $$11;
        debugger;
        const tmpReturnArg$7 = tmpBranchingC$1(
          tmpObjLitVal$53,
          tmpObjLitVal$55,
          tmpObjLitVal$57,
          obj$17,
          tmpCallCallee$17,
          tmpCalleeParam$17,
          tmpChainRootProp$17,
          tmpIfTest$41,
          tmpChainElementObject$31,
          tmpIfTest$43,
        );
        return tmpReturnArg$7;
      };
      if (tmpIfTest$19) {
        const tmpReturnArg$9 = tmpBranchingA$3(
          tmpObjLitVal$23,
          tmpObjLitVal$25,
          tmpObjLitVal$27,
          obj$7,
          tmpCallCallee$7,
          tmpCalleeParam$7,
          tmpChainRootProp$7,
          tmpIfTest$15,
          tmpChainElementObject$11,
          tmpIfTest$17,
          tmpChainElementObject$13,
          tmpIfTest$19,
        );
        return tmpReturnArg$9;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$3(
          tmpObjLitVal$23,
          tmpObjLitVal$25,
          tmpObjLitVal$27,
          obj$7,
          tmpCallCallee$7,
          tmpCalleeParam$7,
          tmpChainRootProp$7,
          tmpIfTest$15,
          tmpChainElementObject$11,
          tmpIfTest$17,
          tmpChainElementObject$13,
          tmpIfTest$19,
        );
        return tmpReturnArg$11;
      }
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$29 = $$0;
      let tmpObjLitVal$31 = $$1;
      let tmpObjLitVal$33 = $$2;
      let obj$9 = $$3;
      let tmpCallCallee$9 = $$4;
      let tmpCalleeParam$9 = $$5;
      let tmpChainRootProp$9 = $$6;
      let tmpIfTest$21 = $$7;
      let tmpChainElementObject$17 = $$8;
      let tmpIfTest$23 = $$9;
      debugger;
      const tmpReturnArg$13 = tmpBranchingC$1(
        tmpObjLitVal$29,
        tmpObjLitVal$31,
        tmpObjLitVal$33,
        obj$9,
        tmpCallCallee$9,
        tmpCalleeParam$9,
        tmpChainRootProp$9,
        tmpIfTest$21,
        tmpChainElementObject$17,
        tmpIfTest$23,
      );
      return tmpReturnArg$13;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$35 = $$0;
      let tmpObjLitVal$37 = $$1;
      let tmpObjLitVal$39 = $$2;
      let obj$11 = $$3;
      let tmpCallCallee$11 = $$4;
      let tmpCalleeParam$11 = $$5;
      let tmpChainRootProp$11 = $$6;
      let tmpIfTest$25 = $$7;
      let tmpChainElementObject$19 = $$8;
      let tmpIfTest$27 = $$9;
      debugger;
      const tmpReturnArg$15 = tmpBranchingC(
        tmpObjLitVal$35,
        tmpObjLitVal$37,
        tmpObjLitVal$39,
        obj$11,
        tmpCallCallee$11,
        tmpCalleeParam$11,
        tmpChainRootProp$11,
        tmpIfTest$25,
      );
      return tmpReturnArg$15;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$17 = tmpBranchingA$1(
        tmpObjLitVal$5,
        tmpObjLitVal$7,
        tmpObjLitVal$9,
        obj$1,
        tmpCallCallee$1,
        tmpCalleeParam$1,
        tmpChainRootProp$1,
        tmpIfTest$5,
        tmpChainElementObject$5,
        tmpIfTest$7,
      );
      return tmpReturnArg$17;
    } else {
      const tmpReturnArg$19 = tmpBranchingB$1(
        tmpObjLitVal$5,
        tmpObjLitVal$7,
        tmpObjLitVal$9,
        obj$1,
        tmpCallCallee$1,
        tmpCalleeParam$1,
        tmpChainRootProp$1,
        tmpIfTest$5,
        tmpChainElementObject$5,
        tmpIfTest$7,
      );
      return tmpReturnArg$19;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpObjLitVal$11 = $$0;
    let tmpObjLitVal$13 = $$1;
    let tmpObjLitVal$15 = $$2;
    let obj$3 = $$3;
    let tmpCallCallee$3 = $$4;
    let tmpCalleeParam$3 = $$5;
    let tmpChainRootProp$3 = $$6;
    let tmpIfTest$11 = $$7;
    debugger;
    const tmpReturnArg$21 = tmpBranchingC(
      tmpObjLitVal$11,
      tmpObjLitVal$13,
      tmpObjLitVal$15,
      obj$3,
      tmpCallCallee$3,
      tmpCalleeParam$3,
      tmpChainRootProp$3,
      tmpIfTest$11,
    );
    return tmpReturnArg$21;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
    let tmpObjLitVal$17 = $$0;
    let tmpObjLitVal$19 = $$1;
    let tmpObjLitVal$21 = $$2;
    let obj$5 = $$3;
    let tmpCallCallee$5 = $$4;
    let tmpCalleeParam$5 = $$5;
    let tmpChainRootProp$5 = $$6;
    let tmpIfTest$13 = $$7;
    debugger;
    const tmpReturnArg$1 = tmpCallCallee$5(tmpCalleeParam$5);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$23 = tmpBranchingA(
      tmpObjLitVal$3,
      tmpObjLitVal$1,
      tmpObjLitVal,
      obj,
      tmpCallCallee,
      tmpCalleeParam,
      tmpChainRootProp,
      tmpIfTest,
    );
    return tmpReturnArg$23;
  } else {
    const tmpReturnArg$25 = tmpBranchingB(
      tmpObjLitVal$3,
      tmpObjLitVal$1,
      tmpObjLitVal,
      obj,
      tmpCallCallee,
      tmpCalleeParam,
      tmpChainRootProp,
      tmpIfTest,
    );
    return tmpReturnArg$25;
  }
};
const tmpCallCallee$19 = $;
const tmpCalleeParam$19 = f();
tmpCallCallee$19(tmpCalleeParam$19);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpObjLitVal$3 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpIfTest = obj != null;
  const tmpBranchingA = function ($$0, $$1) {
    const tmpCallCallee$1 = $$0;
    const tmpChainRootProp$1 = $$1;
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp$1.a;
    const tmpIfTest$7 = tmpChainElementObject$5 != null;
    const tmpBranchingA$1 = function ($$0, $$1) {
      const tmpCallCallee$7 = $$0;
      const tmpChainElementObject$11 = $$1;
      debugger;
      const tmpChainElementObject$13 = tmpChainElementObject$11.b;
      const tmpIfTest$19 = tmpChainElementObject$13 != null;
      if (tmpIfTest$19) {
        const tmpChainElementObject$25 = tmpChainElementObject$13.c;
        const tmpReturnArg$3 = tmpCallCallee$7(tmpChainElementObject$25);
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$11 = tmpCallCallee$7(undefined);
        return tmpReturnArg$11;
      }
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$17 = tmpBranchingA$1(tmpCallCallee$1, tmpChainElementObject$5);
      return tmpReturnArg$17;
    } else {
      const tmpReturnArg$19 = tmpCallCallee$1(undefined);
      return tmpReturnArg$19;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$23 = tmpBranchingA($, obj);
    return tmpReturnArg$23;
  } else {
    const tmpReturnArg$25 = $(undefined);
    return tmpReturnArg$25;
  }
};
const tmpCalleeParam$19 = f();
$(tmpCalleeParam$19);
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
