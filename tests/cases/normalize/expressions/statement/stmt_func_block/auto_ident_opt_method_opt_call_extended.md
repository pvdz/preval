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
    let tmpObjLitVal$3 = $$0;
    let tmpObjLitVal$5 = $$1;
    let b$1 = $$2;
    let a$1 = $$3;
    let tmpChainRootProp$1 = $$4;
    let tmpIfTest$3 = $$5;
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp$1.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpIfTest$5 = tmpChainElementObject$9 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$15 = $$0;
      let tmpObjLitVal$17 = $$1;
      let b$7 = $$2;
      let a$7 = $$3;
      let tmpChainRootProp$7 = $$4;
      let tmpIfTest$11 = $$5;
      let tmpChainElementObject$11 = $$6;
      let tmpChainElementObject$13 = $$7;
      let tmpChainElementObject$15 = $$8;
      let tmpIfTest$13 = $$9;
      debugger;
      const tmpChainElementCall$3 = tmpChainElementObject$15.call(tmpChainElementObject$13, 1);
      const tmpReturnArg = tmpBranchingC$1(
        tmpObjLitVal$15,
        tmpObjLitVal$17,
        b$7,
        a$7,
        tmpChainRootProp$7,
        tmpIfTest$11,
        tmpChainElementObject$11,
        tmpChainElementObject$13,
        tmpChainElementObject$15,
        tmpIfTest$13,
      );
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$19 = $$0;
      let tmpObjLitVal$21 = $$1;
      let b$9 = $$2;
      let a$9 = $$3;
      let tmpChainRootProp$9 = $$4;
      let tmpIfTest$15 = $$5;
      let tmpChainElementObject$17 = $$6;
      let tmpChainElementObject$19 = $$7;
      let tmpChainElementObject$21 = $$8;
      let tmpIfTest$17 = $$9;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(
        tmpObjLitVal$19,
        tmpObjLitVal$21,
        b$9,
        a$9,
        tmpChainRootProp$9,
        tmpIfTest$15,
        tmpChainElementObject$17,
        tmpChainElementObject$19,
        tmpChainElementObject$21,
        tmpIfTest$17,
      );
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
      let tmpObjLitVal$23 = $$0;
      let tmpObjLitVal$25 = $$1;
      let b$11 = $$2;
      let a$11 = $$3;
      let tmpChainRootProp$11 = $$4;
      let tmpIfTest$19 = $$5;
      let tmpChainElementObject$23 = $$6;
      let tmpChainElementObject$25 = $$7;
      let tmpChainElementObject$27 = $$8;
      let tmpIfTest$21 = $$9;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(tmpObjLitVal$23, tmpObjLitVal$25, b$11, a$11, tmpChainRootProp$11, tmpIfTest$19);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$5 = tmpBranchingA$1(
        tmpObjLitVal$3,
        tmpObjLitVal$5,
        b$1,
        a$1,
        tmpChainRootProp$1,
        tmpIfTest$3,
        tmpChainElementObject$5,
        tmpChainElementObject$7,
        tmpChainElementObject$9,
        tmpIfTest$5,
      );
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(
        tmpObjLitVal$3,
        tmpObjLitVal$5,
        b$1,
        a$1,
        tmpChainRootProp$1,
        tmpIfTest$3,
        tmpChainElementObject$5,
        tmpChainElementObject$7,
        tmpChainElementObject$9,
        tmpIfTest$5,
      );
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$7 = $$0;
    let tmpObjLitVal$9 = $$1;
    let b$3 = $$2;
    let a$3 = $$3;
    let tmpChainRootProp$3 = $$4;
    let tmpIfTest$7 = $$5;
    debugger;
    const tmpReturnArg$9 = tmpBranchingC(tmpObjLitVal$7, tmpObjLitVal$9, b$3, a$3, tmpChainRootProp$3, tmpIfTest$7);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$11 = $$0;
    let tmpObjLitVal$13 = $$1;
    let b$5 = $$2;
    let a$5 = $$3;
    let tmpChainRootProp$5 = $$4;
    let tmpIfTest$9 = $$5;
    debugger;
    $(a$5);
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpObjLitVal$1, tmpObjLitVal, b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpObjLitVal$1, tmpObjLitVal, b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingA = function ($$0, $$1) {
  const a$1 = $$0;
  const tmpChainRootProp$1 = $$1;
  debugger;
  const tmpChainElementObject$5 = tmpChainRootProp$1.c;
  const tmpChainElementObject$7 = tmpChainElementObject$5.d;
  const tmpChainElementObject$9 = tmpChainElementObject$7.e;
  const tmpIfTest$5 = tmpChainElementObject$9 != null;
  if (tmpIfTest$5) {
    tmpChainElementObject$9.call(tmpChainElementObject$7, 1);
    $(a$1);
    return undefined;
  } else {
    $(a$1);
    return undefined;
  }
};
const f = function () {
  debugger;
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  const b = { c: tmpObjLitVal };
  const a = { a: 999, b: 1000 };
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(a, b);
    return tmpReturnArg$11;
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
