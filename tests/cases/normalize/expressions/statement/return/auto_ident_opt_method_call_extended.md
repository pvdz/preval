# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Statement > Return > Auto ident opt method call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f() {
  return b?.c.d.e(1);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return b?.c.d.e(1);
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
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp$1.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpChainElementCall$1 = tmpChainElementObject$9.call(tmpChainElementObject$7, 1);
    tmpReturnArg$1 = tmpChainElementCall$1;
    const tmpReturnArg$7 = tmpBranchingC(tmpReturnArg$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpReturnArg$3 = $$0;
    let tmpChainRootProp$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$9 = tmpBranchingC(tmpReturnArg$3, tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpReturnArg$5 = $$0;
    let tmpChainRootProp$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    return tmpReturnArg$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpReturnArg, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpReturnArg, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$13;
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
  if (tmpIfTest) {
    const tmpChainElementObject$5 = b.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpChainElementCall$1 = tmpChainElementObject$9.call(tmpChainElementObject$7, 1);
    return tmpChainElementCall$1;
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
