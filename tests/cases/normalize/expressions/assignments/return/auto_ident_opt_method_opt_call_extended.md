# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Return > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b?.c.d.e?.(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = b?.c.d.e?.(1));
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
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1) {
    let tmpChainRootProp$1 = $$0;
    let tmpIfTest$2 = $$1;
    debugger;
    const tmpChainElementObject$3 = tmpChainRootProp$1.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpIfTest$3 = tmpChainElementObject$5 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootProp$4 = $$0;
      let tmpIfTest$6 = $$1;
      let tmpChainElementObject$6 = $$2;
      let tmpChainElementObject$7 = $$3;
      let tmpChainElementObject$8 = $$4;
      let tmpIfTest$7 = $$5;
      debugger;
      const tmpChainElementCall$2 = tmpChainElementObject$8.call(tmpChainElementObject$7, 1);
      a = tmpChainElementCall$2;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpChainRootProp$4,
        tmpIfTest$6,
        tmpChainElementObject$6,
        tmpChainElementObject$7,
        tmpChainElementObject$8,
        tmpIfTest$7,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootProp$5 = $$0;
      let tmpIfTest$8 = $$1;
      let tmpChainElementObject$9 = $$2;
      let tmpChainElementObject$10 = $$3;
      let tmpChainElementObject$11 = $$4;
      let tmpIfTest$9 = $$5;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpChainRootProp$5,
        tmpIfTest$8,
        tmpChainElementObject$9,
        tmpChainElementObject$10,
        tmpChainElementObject$11,
        tmpIfTest$9,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpChainRootProp$6 = $$0;
      let tmpIfTest$10 = $$1;
      let tmpChainElementObject$12 = $$2;
      let tmpChainElementObject$13 = $$3;
      let tmpChainElementObject$14 = $$4;
      let tmpIfTest$11 = $$5;
      debugger;
      const tmpReturnArg$4 = tmpBranchingC(tmpChainRootProp$6, tmpIfTest$10);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1(
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$3,
        tmpChainElementObject$4,
        tmpChainElementObject$5,
        tmpIfTest$3,
      );
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$3,
        tmpChainElementObject$4,
        tmpChainElementObject$5,
        tmpIfTest$3,
      );
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpChainRootProp$2 = $$0;
    let tmpIfTest$4 = $$1;
    debugger;
    const tmpReturnArg$7 = tmpBranchingC(tmpChainRootProp$2, tmpIfTest$4);
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpChainRootProp$3 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$9;
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
  a = undefined;
  const tmpIfTest = b != null;
  const tmpBranchingA = function ($$0) {
    const tmpChainRootProp$1 = $$0;
    debugger;
    const tmpChainElementObject$3 = tmpChainRootProp$1.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpIfTest$3 = tmpChainElementObject$5 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall$2 = tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
      a = tmpChainElementCall$2;
      const tmpReturnArg$2 = tmpBranchingC();
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$6 = tmpBranchingC();
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(b);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  }
};
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
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
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
