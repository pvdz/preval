# Preval test case

# func_double_nested.md

> Normalize > Nullish > Func double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj??a??b??c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: { c: $() } } };
  return $(obj ?? a ?? b ?? c);
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
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$3 = $$0;
    let tmpObjLitVal$4 = $$1;
    let tmpObjLitVal$5 = $$2;
    let obj$1 = $$3;
    let tmpCallCallee$1 = $$4;
    let tmpCalleeParam$1 = $$5;
    let tmpIfTest$1 = $$6;
    debugger;
    tmpCalleeParam$1 = a;
    const tmpReturnArg$2 = tmpBranchingC(
      tmpObjLitVal$3,
      tmpObjLitVal$4,
      tmpObjLitVal$5,
      obj$1,
      tmpCallCallee$1,
      tmpCalleeParam$1,
      tmpIfTest$1,
    );
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$6 = $$0;
    let tmpObjLitVal$7 = $$1;
    let tmpObjLitVal$8 = $$2;
    let obj$2 = $$3;
    let tmpCallCallee$2 = $$4;
    let tmpCalleeParam$2 = $$5;
    let tmpIfTest$2 = $$6;
    debugger;
    const tmpReturnArg$3 = tmpBranchingC(
      tmpObjLitVal$6,
      tmpObjLitVal$7,
      tmpObjLitVal$8,
      obj$2,
      tmpCallCallee$2,
      tmpCalleeParam$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$9 = $$0;
    let tmpObjLitVal$10 = $$1;
    let tmpObjLitVal$11 = $$2;
    let obj$3 = $$3;
    let tmpCallCallee$3 = $$4;
    let tmpCalleeParam$3 = $$5;
    let tmpIfTest$3 = $$6;
    debugger;
    const tmpIfTest$4 = tmpCalleeParam$3 == null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$12 = $$0;
      let tmpObjLitVal$13 = $$1;
      let tmpObjLitVal$14 = $$2;
      let obj$4 = $$3;
      let tmpCallCallee$4 = $$4;
      let tmpCalleeParam$4 = $$5;
      let tmpIfTest$5 = $$6;
      let tmpIfTest$6 = $$7;
      debugger;
      tmpCalleeParam$4 = b;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpObjLitVal$12,
        tmpObjLitVal$13,
        tmpObjLitVal$14,
        obj$4,
        tmpCallCallee$4,
        tmpCalleeParam$4,
        tmpIfTest$5,
        tmpIfTest$6,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$15 = $$0;
      let tmpObjLitVal$16 = $$1;
      let tmpObjLitVal$17 = $$2;
      let obj$5 = $$3;
      let tmpCallCallee$5 = $$4;
      let tmpCalleeParam$5 = $$5;
      let tmpIfTest$7 = $$6;
      let tmpIfTest$8 = $$7;
      debugger;
      const tmpReturnArg$6 = tmpBranchingC$1(
        tmpObjLitVal$15,
        tmpObjLitVal$16,
        tmpObjLitVal$17,
        obj$5,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpIfTest$7,
        tmpIfTest$8,
      );
      return tmpReturnArg$6;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$18 = $$0;
      let tmpObjLitVal$19 = $$1;
      let tmpObjLitVal$20 = $$2;
      let obj$6 = $$3;
      let tmpCallCallee$6 = $$4;
      let tmpCalleeParam$6 = $$5;
      let tmpIfTest$9 = $$6;
      let tmpIfTest$10 = $$7;
      debugger;
      const tmpIfTest$11 = tmpCalleeParam$6 == null;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpObjLitVal$21 = $$0;
        let tmpObjLitVal$22 = $$1;
        let tmpObjLitVal$23 = $$2;
        let obj$7 = $$3;
        let tmpCallCallee$7 = $$4;
        let tmpCalleeParam$7 = $$5;
        let tmpIfTest$12 = $$6;
        let tmpIfTest$13 = $$7;
        let tmpIfTest$14 = $$8;
        debugger;
        tmpCalleeParam$7 = c;
        const tmpReturnArg$8 = tmpBranchingC$2(
          tmpObjLitVal$21,
          tmpObjLitVal$22,
          tmpObjLitVal$23,
          obj$7,
          tmpCallCallee$7,
          tmpCalleeParam$7,
          tmpIfTest$12,
          tmpIfTest$13,
          tmpIfTest$14,
        );
        return tmpReturnArg$8;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpObjLitVal$24 = $$0;
        let tmpObjLitVal$25 = $$1;
        let tmpObjLitVal$26 = $$2;
        let obj$8 = $$3;
        let tmpCallCallee$8 = $$4;
        let tmpCalleeParam$8 = $$5;
        let tmpIfTest$15 = $$6;
        let tmpIfTest$16 = $$7;
        let tmpIfTest$17 = $$8;
        debugger;
        const tmpReturnArg$9 = tmpBranchingC$2(
          tmpObjLitVal$24,
          tmpObjLitVal$25,
          tmpObjLitVal$26,
          obj$8,
          tmpCallCallee$8,
          tmpCalleeParam$8,
          tmpIfTest$15,
          tmpIfTest$16,
          tmpIfTest$17,
        );
        return tmpReturnArg$9;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpObjLitVal$27 = $$0;
        let tmpObjLitVal$28 = $$1;
        let tmpObjLitVal$29 = $$2;
        let obj$9 = $$3;
        let tmpCallCallee$9 = $$4;
        let tmpCalleeParam$9 = $$5;
        let tmpIfTest$18 = $$6;
        let tmpIfTest$19 = $$7;
        let tmpIfTest$20 = $$8;
        debugger;
        const tmpReturnArg$7 = tmpCallCallee$9(tmpCalleeParam$9);
        return tmpReturnArg$7;
      };
      if (tmpIfTest$11) {
        const tmpReturnArg$10 = tmpBranchingA$2(
          tmpObjLitVal$18,
          tmpObjLitVal$19,
          tmpObjLitVal$20,
          obj$6,
          tmpCallCallee$6,
          tmpCalleeParam$6,
          tmpIfTest$9,
          tmpIfTest$10,
          tmpIfTest$11,
        );
        return tmpReturnArg$10;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$2(
          tmpObjLitVal$18,
          tmpObjLitVal$19,
          tmpObjLitVal$20,
          obj$6,
          tmpCallCallee$6,
          tmpCalleeParam$6,
          tmpIfTest$9,
          tmpIfTest$10,
          tmpIfTest$11,
        );
        return tmpReturnArg$11;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$12 = tmpBranchingA$1(
        tmpObjLitVal$9,
        tmpObjLitVal$10,
        tmpObjLitVal$11,
        obj$3,
        tmpCallCallee$3,
        tmpCalleeParam$3,
        tmpIfTest$3,
        tmpIfTest$4,
      );
      return tmpReturnArg$12;
    } else {
      const tmpReturnArg$13 = tmpBranchingB$1(
        tmpObjLitVal$9,
        tmpObjLitVal$10,
        tmpObjLitVal$11,
        obj$3,
        tmpCallCallee$3,
        tmpCalleeParam$3,
        tmpIfTest$3,
        tmpIfTest$4,
      );
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$14 = tmpBranchingA(tmpObjLitVal$2, tmpObjLitVal$1, tmpObjLitVal, obj, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$14;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(tmpObjLitVal$2, tmpObjLitVal$1, tmpObjLitVal, obj, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$15;
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
  const tmpIfTest = obj == null;
  const tmpBranchingC = function ($$0, $$1) {
    const tmpCallCallee$3 = $$0;
    const tmpCalleeParam$3 = $$1;
    debugger;
    const tmpIfTest$4 = tmpCalleeParam$3 == null;
    const tmpBranchingC$1 = function ($$0, $$1) {
      const tmpCallCallee$6 = $$0;
      const tmpCalleeParam$6 = $$1;
      debugger;
      const tmpIfTest$11 = tmpCalleeParam$6 == null;
      if (tmpIfTest$11) {
        const SSA_tmpCalleeParam$7 = c;
        const tmpReturnArg$8 = tmpCallCallee$6(SSA_tmpCalleeParam$7);
        return tmpReturnArg$8;
      } else {
        const tmpReturnArg$11 = tmpCallCallee$6(tmpCalleeParam$6);
        return tmpReturnArg$11;
      }
    };
    if (tmpIfTest$4) {
      const SSA_tmpCalleeParam$4 = b;
      const tmpReturnArg$5 = tmpBranchingC$1(tmpCallCallee$3, SSA_tmpCalleeParam$4);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$13 = tmpBranchingC$1(tmpCallCallee$3, tmpCalleeParam$3);
      return tmpReturnArg$13;
    }
  };
  if (tmpIfTest) {
    const SSA_tmpCalleeParam$1 = a;
    const tmpReturnArg$2 = tmpBranchingC($, SSA_tmpCalleeParam$1);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$15 = tmpBranchingC($, obj);
    return tmpReturnArg$15;
  }
};
const tmpCalleeParam$10 = f();
$(tmpCalleeParam$10);
`````

## Globals

BAD@! Found 3 implicit global bindings:

c, b, a

## Result

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - 3: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
