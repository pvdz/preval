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
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp$1.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpIfTest$5 = tmpChainElementObject$9 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$7 = $$0;
      let tmpChainRootProp$7 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpChainElementObject$11 = $$3;
      let tmpChainElementObject$13 = $$4;
      let tmpChainElementObject$15 = $$5;
      let tmpIfTest$13 = $$6;
      debugger;
      const tmpChainElementCall$3 = tmpChainElementObject$15.call(tmpChainElementObject$13, 1);
      tmpReturnArg$7 = tmpChainElementCall$3;
      const tmpReturnArg$13 = tmpBranchingC$1(
        tmpReturnArg$7,
        tmpChainRootProp$7,
        tmpIfTest$11,
        tmpChainElementObject$11,
        tmpChainElementObject$13,
        tmpChainElementObject$15,
        tmpIfTest$13,
      );
      return tmpReturnArg$13;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$9 = $$0;
      let tmpChainRootProp$9 = $$1;
      let tmpIfTest$15 = $$2;
      let tmpChainElementObject$17 = $$3;
      let tmpChainElementObject$19 = $$4;
      let tmpChainElementObject$21 = $$5;
      let tmpIfTest$17 = $$6;
      debugger;
      const tmpReturnArg$15 = tmpBranchingC$1(
        tmpReturnArg$9,
        tmpChainRootProp$9,
        tmpIfTest$15,
        tmpChainElementObject$17,
        tmpChainElementObject$19,
        tmpChainElementObject$21,
        tmpIfTest$17,
      );
      return tmpReturnArg$15;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpReturnArg$11 = $$0;
      let tmpChainRootProp$11 = $$1;
      let tmpIfTest$19 = $$2;
      let tmpChainElementObject$23 = $$3;
      let tmpChainElementObject$25 = $$4;
      let tmpChainElementObject$27 = $$5;
      let tmpIfTest$21 = $$6;
      debugger;
      const tmpReturnArg$17 = tmpBranchingC(tmpReturnArg$11, tmpChainRootProp$11, tmpIfTest$19);
      return tmpReturnArg$17;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$19 = tmpBranchingA$1(
        tmpReturnArg$1,
        tmpChainRootProp$1,
        tmpIfTest$3,
        tmpChainElementObject$5,
        tmpChainElementObject$7,
        tmpChainElementObject$9,
        tmpIfTest$5,
      );
      return tmpReturnArg$19;
    } else {
      const tmpReturnArg$21 = tmpBranchingB$1(
        tmpReturnArg$1,
        tmpChainRootProp$1,
        tmpIfTest$3,
        tmpChainElementObject$5,
        tmpChainElementObject$7,
        tmpChainElementObject$9,
        tmpIfTest$5,
      );
      return tmpReturnArg$21;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpReturnArg$3 = $$0;
    let tmpChainRootProp$3 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
    const tmpReturnArg$23 = tmpBranchingC(tmpReturnArg$3, tmpChainRootProp$3, tmpIfTest$7);
    return tmpReturnArg$23;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpReturnArg$5 = $$0;
    let tmpChainRootProp$5 = $$1;
    let tmpIfTest$9 = $$2;
    debugger;
    return tmpReturnArg$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$25 = tmpBranchingA(tmpReturnArg, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$25;
  } else {
    const tmpReturnArg$27 = tmpBranchingB(tmpReturnArg, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$27;
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
const tmpBranchingA = function ($$0) {
  const tmpChainRootProp$1 = $$0;
  debugger;
  const tmpChainElementObject$5 = tmpChainRootProp$1.c;
  const tmpChainElementObject$7 = tmpChainElementObject$5.d;
  const tmpChainElementObject$9 = tmpChainElementObject$7.e;
  const tmpIfTest$5 = tmpChainElementObject$9 != null;
  if (tmpIfTest$5) {
    const tmpReturnArg$19 = tmpChainElementObject$9.call(tmpChainElementObject$7, 1);
    return tmpReturnArg$19;
  } else {
    return undefined;
  }
};
const f = function () {
  debugger;
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpReturnArg$25 = tmpBranchingA(b);
    return tmpReturnArg$25;
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
