# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: { d: { e: $ } } };

    let a = { a: 999, b: 1000 };
    b?.c.d.e?.(1);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { c: { d: { e: $ } } };
    let a = { a: 999, b: 1000 };
    b?.c.d.e?.(1);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  let b = { c: tmpObjLitVal };
  let a = { a: 999, b: 1000 };
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$2 = $$0;
    let tmpObjLitVal$3 = $$1;
    let b$1 = $$2;
    let a$1 = $$3;
    let tmpChainRootProp$1 = $$4;
    let tmpIfTest$2 = $$5;
    debugger;
    const tmpChainElementObject$3 = tmpChainRootProp$1.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpIfTest$3 = tmpChainElementObject$5 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$8 = $$0;
      let tmpObjLitVal$9 = $$1;
      let b$4 = $$2;
      let a$4 = $$3;
      let tmpChainRootProp$4 = $$4;
      let tmpIfTest$6 = $$5;
      let tmpChainElementObject$6 = $$6;
      let tmpChainElementObject$7 = $$7;
      let tmpChainElementObject$8 = $$8;
      let tmpIfTest$7 = $$9;
      debugger;
      const tmpChainElementCall$2 = tmpChainElementObject$8.call(tmpChainElementObject$7, 1);
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
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$10 = $$0;
      let tmpObjLitVal$11 = $$1;
      let b$5 = $$2;
      let a$5 = $$3;
      let tmpChainRootProp$5 = $$4;
      let tmpIfTest$8 = $$5;
      let tmpChainElementObject$9 = $$6;
      let tmpChainElementObject$10 = $$7;
      let tmpChainElementObject$11 = $$8;
      let tmpIfTest$9 = $$9;
      debugger;
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
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$12 = $$0;
      let tmpObjLitVal$13 = $$1;
      let b$6 = $$2;
      let a$6 = $$3;
      let tmpChainRootProp$6 = $$4;
      let tmpIfTest$10 = $$5;
      let tmpChainElementObject$12 = $$6;
      let tmpChainElementObject$13 = $$7;
      let tmpChainElementObject$14 = $$8;
      let tmpIfTest$11 = $$9;
      debugger;
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
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$4 = $$0;
    let tmpObjLitVal$5 = $$1;
    let b$2 = $$2;
    let a$2 = $$3;
    let tmpChainRootProp$2 = $$4;
    let tmpIfTest$4 = $$5;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpObjLitVal$4, tmpObjLitVal$5, b$2, a$2, tmpChainRootProp$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$6 = $$0;
    let tmpObjLitVal$7 = $$1;
    let b$3 = $$2;
    let a$3 = $$3;
    let tmpChainRootProp$3 = $$4;
    let tmpIfTest$5 = $$5;
    debugger;
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
  debugger;
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  const b = { c: tmpObjLitVal };
  const a = { a: 999, b: 1000 };
  const tmpIfTest = b != null;
  const tmpBranchingA = function ($$0, $$1) {
    const a$1 = $$0;
    const tmpChainRootProp$1 = $$1;
    debugger;
    const tmpChainElementObject$3 = tmpChainRootProp$1.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpIfTest$3 = tmpChainElementObject$5 != null;
    if (tmpIfTest$3) {
      tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
      $(a$1);
      return undefined;
    } else {
      $(a$1);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(a, b);
    return tmpReturnArg$6;
  } else {
    $(a);
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
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
