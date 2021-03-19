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
  const obj = { a: { b: { c: $() } } };
  return $(obj?.a?.b?.c);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal$2 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (
    tmpObjLitVal$3,
    tmpObjLitVal$4,
    tmpObjLitVal$5,
    obj$1,
    tmpCallCallee$1,
    tmpCalleeParam$1,
    tmpChainRootProp$1,
    tmpIfTest$3,
  ) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.a;
    const tmpIfTest$4 = tmpChainElementObject$3 != null;
    const tmpBranchingA$1 = function (
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
    ) {
      const tmpChainElementObject$7 = tmpChainElementObject$6.b;
      const tmpIfTest$10 = tmpChainElementObject$7 != null;
      const tmpBranchingA$2 = function (
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
      ) {
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
      const tmpBranchingB$2 = function (
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
      ) {
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
      const tmpBranchingC$2 = function (
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
        tmpChainElementObject$17,
        tmpIfTest$23,
      ) {
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
    const tmpBranchingB$1 = function (
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
    ) {
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
    const tmpBranchingC$1 = function (
      tmpObjLitVal$18,
      tmpObjLitVal$19,
      tmpObjLitVal$20,
      obj$6,
      tmpCallCallee$6,
      tmpCalleeParam$6,
      tmpChainRootProp$6,
      tmpIfTest$13,
      tmpChainElementObject$10,
      tmpIfTest$14,
    ) {
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
  const tmpBranchingB = function (
    tmpObjLitVal$6,
    tmpObjLitVal$7,
    tmpObjLitVal$8,
    obj$2,
    tmpCallCallee$2,
    tmpCalleeParam$2,
    tmpChainRootProp$2,
    tmpIfTest$6,
  ) {
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
  const tmpBranchingC = function (
    tmpObjLitVal$9,
    tmpObjLitVal$10,
    tmpObjLitVal$11,
    obj$3,
    tmpCallCallee$3,
    tmpCalleeParam$3,
    tmpChainRootProp$3,
    tmpIfTest$7,
  ) {
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
  const tmpObjLitVal$2 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpIfTest = obj != null;
  const tmpBranchingA = function (tmpCallCallee$1, tmpCalleeParam$1, tmpChainRootProp$1) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.a;
    const tmpIfTest$4 = tmpChainElementObject$3 != null;
    const tmpBranchingA$1 = function (tmpCallCallee$4, tmpCalleeParam$4, tmpChainElementObject$6) {
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
