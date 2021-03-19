# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident opt method opt call extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: { d: { e: $ } } };

  let a = b?.c.d.e?.(1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { c: { d: { e: $ } } };
  let a = b?.c.d.e?.(1);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  let b = { c: tmpObjLitVal };
  let a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (tmpObjLitVal$2, tmpObjLitVal$3, b$1, a$1, tmpChainRootProp$1, tmpIfTest$2) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpIfTest$3 = tmpChainElementObject$5 != null;
    const tmpBranchingA$1 = function (
      tmpObjLitVal$8,
      tmpObjLitVal$9,
      b$4,
      a$4,
      tmpChainRootProp$4,
      tmpIfTest$6,
      tmpChainElementObject$6,
      tmpChainElementObject$7,
      tmpChainElementObject$8,
      tmpIfTest$7,
    ) {
      const tmpChainElementCall$2 = tmpChainElementObject$8.call(tmpChainElementObject$7, 1);
      a$4 = tmpChainElementCall$2;
      const tmpReturnArg = tmpBranchingC$1(
        tmpObjLitVal$8,
        tmpObjLitVal$9,
        b$4,
        a$4,
        tmpChainRootProp$4,
        tmpIfTest$6,
        tmpChainElementObject$6,
        tmpChainElementObject$7,
        tmpChainElementObject$8,
        tmpIfTest$7,
      );
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (
      tmpObjLitVal$10,
      tmpObjLitVal$11,
      b$5,
      a$5,
      tmpChainRootProp$5,
      tmpIfTest$8,
      tmpChainElementObject$9,
      tmpChainElementObject$10,
      tmpChainElementObject$11,
      tmpIfTest$9,
    ) {
      const tmpReturnArg$1 = tmpBranchingC$1(
        tmpObjLitVal$10,
        tmpObjLitVal$11,
        b$5,
        a$5,
        tmpChainRootProp$5,
        tmpIfTest$8,
        tmpChainElementObject$9,
        tmpChainElementObject$10,
        tmpChainElementObject$11,
        tmpIfTest$9,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (
      tmpObjLitVal$12,
      tmpObjLitVal$13,
      b$6,
      a$6,
      tmpChainRootProp$6,
      tmpIfTest$10,
      tmpChainElementObject$12,
      tmpChainElementObject$13,
      tmpChainElementObject$14,
      tmpIfTest$11,
    ) {
      const tmpReturnArg$2 = tmpBranchingC(tmpObjLitVal$12, tmpObjLitVal$13, b$6, a$6, tmpChainRootProp$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(
        tmpObjLitVal$2,
        tmpObjLitVal$3,
        b$1,
        a$1,
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$3,
        tmpChainElementObject$4,
        tmpChainElementObject$5,
        tmpIfTest$3,
      );
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(
        tmpObjLitVal$2,
        tmpObjLitVal$3,
        b$1,
        a$1,
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$3,
        tmpChainElementObject$4,
        tmpChainElementObject$5,
        tmpIfTest$3,
      );
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function (tmpObjLitVal$4, tmpObjLitVal$5, b$2, a$2, tmpChainRootProp$2, tmpIfTest$4) {
    const tmpReturnArg$5 = tmpBranchingC(tmpObjLitVal$4, tmpObjLitVal$5, b$2, a$2, tmpChainRootProp$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpObjLitVal$6, tmpObjLitVal$7, b$3, a$3, tmpChainRootProp$3, tmpIfTest$5) {
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpObjLitVal$1, tmpObjLitVal, b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpObjLitVal$1, tmpObjLitVal, b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  const b = { c: tmpObjLitVal };
  const tmpIfTest = b != null;
  const tmpBranchingA = function (a$1, tmpChainRootProp$1) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpIfTest$3 = tmpChainElementObject$5 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall$2 = tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
      $(tmpChainElementCall$2);
      return undefined;
    } else {
      $(a$1);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(undefined, b);
    return tmpReturnArg$6;
  } else {
    $(undefined);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
