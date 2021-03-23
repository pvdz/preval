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
  debugger;
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
  debugger;
  let tmpReturnArg = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpReturnArg$1 = $$0;
    let tmpChainRootProp$1 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    const tmpChainElementObject$3 = tmpChainRootProp$1.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpIfTest$3 = tmpChainElementObject$5 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$4 = $$0;
      let tmpChainRootProp$4 = $$1;
      let tmpIfTest$6 = $$2;
      let tmpChainElementObject$6 = $$3;
      let tmpChainElementObject$7 = $$4;
      let tmpChainElementObject$8 = $$5;
      let tmpIfTest$7 = $$6;
      debugger;
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
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$5 = $$0;
      let tmpChainRootProp$5 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpChainElementObject$9 = $$3;
      let tmpChainElementObject$10 = $$4;
      let tmpChainElementObject$11 = $$5;
      let tmpIfTest$9 = $$6;
      debugger;
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
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$6 = $$0;
      let tmpChainRootProp$6 = $$1;
      let tmpIfTest$10 = $$2;
      let tmpChainElementObject$12 = $$3;
      let tmpChainElementObject$13 = $$4;
      let tmpChainElementObject$14 = $$5;
      let tmpIfTest$11 = $$6;
      debugger;
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
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpReturnArg$2 = $$0;
    let tmpChainRootProp$2 = $$1;
    let tmpIfTest$4 = $$2;
    debugger;
    const tmpReturnArg$12 = tmpBranchingC(tmpReturnArg$2, tmpChainRootProp$2, tmpIfTest$4);
    return tmpReturnArg$12;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpReturnArg$3 = $$0;
    let tmpChainRootProp$3 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
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
  debugger;
  const tmpIfTest = b != null;
  const tmpBranchingA = function ($$0, $$1) {
    const tmpReturnArg$1 = $$0;
    const tmpChainRootProp$1 = $$1;
    debugger;
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
