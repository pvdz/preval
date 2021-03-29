# Preval test case

# func_double_nested.md

> Normalize > Nullish > Func double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const a = $(1), b = $(2), c = $(3);
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
const a = $(1),
  b = $(2),
  c = $(3);
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
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$5 = $$0;
    let tmpObjLitVal$7 = $$1;
    let tmpObjLitVal$9 = $$2;
    let obj$1 = $$3;
    let tmpCallCallee$1 = $$4;
    let tmpCalleeParam$1 = $$5;
    let tmpIfTest$1 = $$6;
    debugger;
    tmpCalleeParam$1 = a;
    const tmpReturnArg$3 = tmpBranchingC(
      tmpObjLitVal$5,
      tmpObjLitVal$7,
      tmpObjLitVal$9,
      obj$1,
      tmpCallCallee$1,
      tmpCalleeParam$1,
      tmpIfTest$1,
    );
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$11 = $$0;
    let tmpObjLitVal$13 = $$1;
    let tmpObjLitVal$15 = $$2;
    let obj$3 = $$3;
    let tmpCallCallee$3 = $$4;
    let tmpCalleeParam$3 = $$5;
    let tmpIfTest$3 = $$6;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(
      tmpObjLitVal$11,
      tmpObjLitVal$13,
      tmpObjLitVal$15,
      obj$3,
      tmpCallCallee$3,
      tmpCalleeParam$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$17 = $$0;
    let tmpObjLitVal$19 = $$1;
    let tmpObjLitVal$21 = $$2;
    let obj$5 = $$3;
    let tmpCallCallee$5 = $$4;
    let tmpCalleeParam$5 = $$5;
    let tmpIfTest$5 = $$6;
    debugger;
    const tmpIfTest$7 = tmpCalleeParam$5 == null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$23 = $$0;
      let tmpObjLitVal$25 = $$1;
      let tmpObjLitVal$27 = $$2;
      let obj$7 = $$3;
      let tmpCallCallee$7 = $$4;
      let tmpCalleeParam$7 = $$5;
      let tmpIfTest$9 = $$6;
      let tmpIfTest$11 = $$7;
      debugger;
      tmpCalleeParam$7 = b;
      const tmpReturnArg$9 = tmpBranchingC$1(
        tmpObjLitVal$23,
        tmpObjLitVal$25,
        tmpObjLitVal$27,
        obj$7,
        tmpCallCallee$7,
        tmpCalleeParam$7,
        tmpIfTest$9,
        tmpIfTest$11,
      );
      return tmpReturnArg$9;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$29 = $$0;
      let tmpObjLitVal$31 = $$1;
      let tmpObjLitVal$33 = $$2;
      let obj$9 = $$3;
      let tmpCallCallee$9 = $$4;
      let tmpCalleeParam$9 = $$5;
      let tmpIfTest$13 = $$6;
      let tmpIfTest$15 = $$7;
      debugger;
      const tmpReturnArg$11 = tmpBranchingC$1(
        tmpObjLitVal$29,
        tmpObjLitVal$31,
        tmpObjLitVal$33,
        obj$9,
        tmpCallCallee$9,
        tmpCalleeParam$9,
        tmpIfTest$13,
        tmpIfTest$15,
      );
      return tmpReturnArg$11;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$35 = $$0;
      let tmpObjLitVal$37 = $$1;
      let tmpObjLitVal$39 = $$2;
      let obj$11 = $$3;
      let tmpCallCallee$11 = $$4;
      let tmpCalleeParam$11 = $$5;
      let tmpIfTest$17 = $$6;
      let tmpIfTest$19 = $$7;
      debugger;
      const tmpIfTest$21 = tmpCalleeParam$11 == null;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpObjLitVal$41 = $$0;
        let tmpObjLitVal$43 = $$1;
        let tmpObjLitVal$45 = $$2;
        let obj$13 = $$3;
        let tmpCallCallee$13 = $$4;
        let tmpCalleeParam$13 = $$5;
        let tmpIfTest$23 = $$6;
        let tmpIfTest$25 = $$7;
        let tmpIfTest$27 = $$8;
        debugger;
        tmpCalleeParam$13 = c;
        const tmpReturnArg$15 = tmpBranchingC$3(
          tmpObjLitVal$41,
          tmpObjLitVal$43,
          tmpObjLitVal$45,
          obj$13,
          tmpCallCallee$13,
          tmpCalleeParam$13,
          tmpIfTest$23,
          tmpIfTest$25,
          tmpIfTest$27,
        );
        return tmpReturnArg$15;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpObjLitVal$47 = $$0;
        let tmpObjLitVal$49 = $$1;
        let tmpObjLitVal$51 = $$2;
        let obj$15 = $$3;
        let tmpCallCallee$15 = $$4;
        let tmpCalleeParam$15 = $$5;
        let tmpIfTest$29 = $$6;
        let tmpIfTest$31 = $$7;
        let tmpIfTest$33 = $$8;
        debugger;
        const tmpReturnArg$17 = tmpBranchingC$3(
          tmpObjLitVal$47,
          tmpObjLitVal$49,
          tmpObjLitVal$51,
          obj$15,
          tmpCallCallee$15,
          tmpCalleeParam$15,
          tmpIfTest$29,
          tmpIfTest$31,
          tmpIfTest$33,
        );
        return tmpReturnArg$17;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpObjLitVal$53 = $$0;
        let tmpObjLitVal$55 = $$1;
        let tmpObjLitVal$57 = $$2;
        let obj$17 = $$3;
        let tmpCallCallee$17 = $$4;
        let tmpCalleeParam$17 = $$5;
        let tmpIfTest$35 = $$6;
        let tmpIfTest$37 = $$7;
        let tmpIfTest$39 = $$8;
        debugger;
        const tmpReturnArg$13 = tmpCallCallee$17(tmpCalleeParam$17);
        return tmpReturnArg$13;
      };
      if (tmpIfTest$21) {
        const tmpReturnArg$19 = tmpBranchingA$3(
          tmpObjLitVal$35,
          tmpObjLitVal$37,
          tmpObjLitVal$39,
          obj$11,
          tmpCallCallee$11,
          tmpCalleeParam$11,
          tmpIfTest$17,
          tmpIfTest$19,
          tmpIfTest$21,
        );
        return tmpReturnArg$19;
      } else {
        const tmpReturnArg$21 = tmpBranchingB$3(
          tmpObjLitVal$35,
          tmpObjLitVal$37,
          tmpObjLitVal$39,
          obj$11,
          tmpCallCallee$11,
          tmpCalleeParam$11,
          tmpIfTest$17,
          tmpIfTest$19,
          tmpIfTest$21,
        );
        return tmpReturnArg$21;
      }
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$23 = tmpBranchingA$1(
        tmpObjLitVal$17,
        tmpObjLitVal$19,
        tmpObjLitVal$21,
        obj$5,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpIfTest$5,
        tmpIfTest$7,
      );
      return tmpReturnArg$23;
    } else {
      const tmpReturnArg$25 = tmpBranchingB$1(
        tmpObjLitVal$17,
        tmpObjLitVal$19,
        tmpObjLitVal$21,
        obj$5,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpIfTest$5,
        tmpIfTest$7,
      );
      return tmpReturnArg$25;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$27 = tmpBranchingA(tmpObjLitVal$3, tmpObjLitVal$1, tmpObjLitVal, obj, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$29 = tmpBranchingB(tmpObjLitVal$3, tmpObjLitVal$1, tmpObjLitVal, obj, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$29;
  }
};
const a = $(1);
const b = $(2);
const c = $(3);
const tmpCallCallee$19 = $;
const tmpCalleeParam$19 = f();
tmpCallCallee$19(tmpCalleeParam$19);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0, $$1) {
  const tmpCallCallee$5 = $$0;
  const tmpCalleeParam$5 = $$1;
  debugger;
  const tmpIfTest$7 = tmpCalleeParam$5 == null;
  if (tmpIfTest$7) {
    const tmpReturnArg$23 = tmpBranchingC$1(tmpCallCallee$5, b);
    return tmpReturnArg$23;
  } else {
    const tmpReturnArg$25 = tmpBranchingC$1(tmpCallCallee$5, tmpCalleeParam$5);
    return tmpReturnArg$25;
  }
};
const tmpBranchingC$1 = function ($$0, $$1) {
  const tmpCallCallee$11 = $$0;
  const tmpCalleeParam$11 = $$1;
  debugger;
  const tmpIfTest$21 = tmpCalleeParam$11 == null;
  if (tmpIfTest$21) {
    const tmpReturnArg$19 = tmpCallCallee$11(c);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpCallCallee$11(tmpCalleeParam$11);
    return tmpReturnArg$21;
  }
};
const f = function () {
  debugger;
  const tmpObjLitVal$3 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpIfTest = obj == null;
  if (tmpIfTest) {
    const tmpReturnArg$27 = tmpBranchingC($, a);
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$29 = tmpBranchingC($, obj);
    return tmpReturnArg$29;
  }
};
const a = $(1);
const b = $(2);
const c = $(3);
const tmpCalleeParam$19 = f();
$(tmpCalleeParam$19);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 
 - 5: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - 6: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
