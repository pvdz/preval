# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Return > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f() {
  return b?.c.d.e?.(1);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return b?.c.d.e?.(1);
};
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (tmpReturnArg$1, tmpChainRootProp$1, tmpIfTest$2) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpIfTest$3 = tmpChainElementObject$5 != null;
    const tmpBranchingA$1 = function (
      tmpReturnArg$4,
      tmpChainRootProp$4,
      tmpIfTest$6,
      tmpChainElementObject$6,
      tmpChainElementObject$7,
      tmpChainElementObject$8,
      tmpIfTest$7,
    ) {
      const tmpChainElementCall$2 = tmpChainElementObject$8.call(tmpChainElementObject$7, 1);
      tmpReturnArg$4 = tmpChainElementCall$2;
      const tmpReturnArg$7 = tmpBranchingC$1(
        tmpReturnArg$4,
        tmpChainRootProp$4,
        tmpIfTest$6,
        tmpChainElementObject$6,
        tmpChainElementObject$7,
        tmpChainElementObject$8,
        tmpIfTest$7,
      );
      return tmpReturnArg$7;
    };
    const tmpBranchingB$1 = function (
      tmpReturnArg$5,
      tmpChainRootProp$5,
      tmpIfTest$8,
      tmpChainElementObject$9,
      tmpChainElementObject$10,
      tmpChainElementObject$11,
      tmpIfTest$9,
    ) {
      const tmpReturnArg$8 = tmpBranchingC$1(
        tmpReturnArg$5,
        tmpChainRootProp$5,
        tmpIfTest$8,
        tmpChainElementObject$9,
        tmpChainElementObject$10,
        tmpChainElementObject$11,
        tmpIfTest$9,
      );
      return tmpReturnArg$8;
    };
    const tmpBranchingC$1 = function (
      tmpReturnArg$6,
      tmpChainRootProp$6,
      tmpIfTest$10,
      tmpChainElementObject$12,
      tmpChainElementObject$13,
      tmpChainElementObject$14,
      tmpIfTest$11,
    ) {
      const tmpReturnArg$9 = tmpBranchingC(tmpReturnArg$6, tmpChainRootProp$6, tmpIfTest$10);
      return tmpReturnArg$9;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$10 = tmpBranchingA$1(
        tmpReturnArg$1,
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$3,
        tmpChainElementObject$4,
        tmpChainElementObject$5,
        tmpIfTest$3,
      );
      return tmpReturnArg$10;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(
        tmpReturnArg$1,
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$3,
        tmpChainElementObject$4,
        tmpChainElementObject$5,
        tmpIfTest$3,
      );
      return tmpReturnArg$11;
    }
  };
  const tmpBranchingB = function (tmpReturnArg$2, tmpChainRootProp$2, tmpIfTest$4) {
    const tmpReturnArg$12 = tmpBranchingC(tmpReturnArg$2, tmpChainRootProp$2, tmpIfTest$4);
    return tmpReturnArg$12;
  };
  const tmpBranchingC = function (tmpReturnArg$3, tmpChainRootProp$3, tmpIfTest$5) {
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(tmpReturnArg, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$14 = tmpBranchingB(tmpReturnArg, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$14;
  }
};
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = b != null;
  const tmpBranchingA = function (tmpReturnArg$1, tmpChainRootProp$1) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpIfTest$3 = tmpChainElementObject$5 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall$2 = tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
      return tmpChainElementCall$2;
    } else {
      return tmpReturnArg$1;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(undefined, b);
    return tmpReturnArg$13;
  } else {
    return undefined;
  }
};
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
const a = { a: 999, b: 1000 };
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
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
