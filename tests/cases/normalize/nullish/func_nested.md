# Preval test case

# func_nested.md

> Normalize > Nullish > Func nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj??a??b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const obj = { a: { b: $() } };
  return $(obj ?? a ?? b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCallCallee = $;
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  const tmpBranchingA = function (tmpObjLitVal$2, tmpObjLitVal$3, obj$1, tmpCallCallee$1, tmpCalleeParam$1, tmpIfTest$1) {
    tmpCalleeParam$1 = a;
    const tmpReturnArg$2 = tmpBranchingC(tmpObjLitVal$2, tmpObjLitVal$3, obj$1, tmpCallCallee$1, tmpCalleeParam$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpObjLitVal$4, tmpObjLitVal$5, obj$2, tmpCallCallee$2, tmpCalleeParam$2, tmpIfTest$2) {
    const tmpReturnArg$3 = tmpBranchingC(tmpObjLitVal$4, tmpObjLitVal$5, obj$2, tmpCallCallee$2, tmpCalleeParam$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function (tmpObjLitVal$6, tmpObjLitVal$7, obj$3, tmpCallCallee$3, tmpCalleeParam$3, tmpIfTest$3) {
    const tmpIfTest$4 = tmpCalleeParam$3 == null;
    const tmpBranchingA$1 = function (tmpObjLitVal$8, tmpObjLitVal$9, obj$4, tmpCallCallee$4, tmpCalleeParam$4, tmpIfTest$5, tmpIfTest$6) {
      tmpCalleeParam$4 = b;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpObjLitVal$8,
        tmpObjLitVal$9,
        obj$4,
        tmpCallCallee$4,
        tmpCalleeParam$4,
        tmpIfTest$5,
        tmpIfTest$6,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function (
      tmpObjLitVal$10,
      tmpObjLitVal$11,
      obj$5,
      tmpCallCallee$5,
      tmpCalleeParam$5,
      tmpIfTest$7,
      tmpIfTest$8,
    ) {
      const tmpReturnArg$6 = tmpBranchingC$1(
        tmpObjLitVal$10,
        tmpObjLitVal$11,
        obj$5,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpIfTest$7,
        tmpIfTest$8,
      );
      return tmpReturnArg$6;
    };
    const tmpBranchingC$1 = function (
      tmpObjLitVal$12,
      tmpObjLitVal$13,
      obj$6,
      tmpCallCallee$6,
      tmpCalleeParam$6,
      tmpIfTest$9,
      tmpIfTest$10,
    ) {
      const tmpReturnArg$4 = tmpCallCallee$6(tmpCalleeParam$6);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpObjLitVal$6,
        tmpObjLitVal$7,
        obj$3,
        tmpCallCallee$3,
        tmpCalleeParam$3,
        tmpIfTest$3,
        tmpIfTest$4,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(
        tmpObjLitVal$6,
        tmpObjLitVal$7,
        obj$3,
        tmpCallCallee$3,
        tmpCalleeParam$3,
        tmpIfTest$3,
        tmpIfTest$4,
      );
      return tmpReturnArg$8;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$9 = tmpBranchingA(tmpObjLitVal$1, tmpObjLitVal, obj, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$9;
  } else {
    const tmpReturnArg$10 = tmpBranchingB(tmpObjLitVal$1, tmpObjLitVal, obj, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$10;
  }
};
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpIfTest = obj == null;
  const tmpBranchingC = function (tmpCallCallee$3, tmpCalleeParam$3) {
    const tmpIfTest$4 = tmpCalleeParam$3 == null;
    if (tmpIfTest$4) {
      const SSA_tmpCalleeParam$4 = b;
      const tmpReturnArg$5 = tmpCallCallee$3(SSA_tmpCalleeParam$4);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$8 = tmpCallCallee$3(tmpCalleeParam$3);
      return tmpReturnArg$8;
    }
  };
  if (tmpIfTest) {
    const SSA_tmpCalleeParam$1 = a;
    const tmpReturnArg$2 = tmpBranchingC($, SSA_tmpCalleeParam$1);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$10 = tmpBranchingC($, obj);
    return tmpReturnArg$10;
  }
};
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
`````

## Globals

BAD@! Found 2 implicit global bindings:

b, a

## Result

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"undefined"}' }
 - 3: { a: '{"b":"undefined"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
