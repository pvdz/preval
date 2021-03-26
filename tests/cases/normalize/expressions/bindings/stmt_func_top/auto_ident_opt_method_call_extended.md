# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident opt method call extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: { d: { e: $ } } };

  let a = b?.c.d.e(1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: { d: { e: $ } } };
  let a = b?.c.d.e(1);
  $(a);
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
  let a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$3 = $$0;
    let tmpObjLitVal$5 = $$1;
    let b$1 = $$2;
    let a$1 = $$3;
    let tmpChainRootProp$1 = $$4;
    let tmpIfTest$1 = $$5;
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp$1.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpChainElementCall$1 = tmpChainElementObject$9.call(tmpChainElementObject$7, 1);
    a$1 = tmpChainElementCall$1;
    const tmpReturnArg = tmpBranchingC(tmpObjLitVal$3, tmpObjLitVal$5, b$1, a$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$7 = $$0;
    let tmpObjLitVal$9 = $$1;
    let b$3 = $$2;
    let a$3 = $$3;
    let tmpChainRootProp$3 = $$4;
    let tmpIfTest$3 = $$5;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(tmpObjLitVal$7, tmpObjLitVal$9, b$3, a$3, tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5) {
    let tmpObjLitVal$11 = $$0;
    let tmpObjLitVal$13 = $$1;
    let b$5 = $$2;
    let a$5 = $$3;
    let tmpChainRootProp$5 = $$4;
    let tmpIfTest$5 = $$5;
    debugger;
    $(a$5);
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpObjLitVal$1, tmpObjLitVal, b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpObjLitVal$1, tmpObjLitVal, b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$5;
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
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject$5 = b.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpChainElementCall$1 = tmpChainElementObject$9.call(tmpChainElementObject$7, 1);
    $(tmpChainElementCall$1);
    return undefined;
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
