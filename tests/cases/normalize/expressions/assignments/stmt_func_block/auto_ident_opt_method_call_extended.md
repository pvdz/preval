# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: { d: { e: $ } } };

    let a = { a: 999, b: 1000 };
    a = b?.c.d.e(1);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let b = { c: { d: { e: $ } } };
    let a = { a: 999, b: 1000 };
    a = b?.c.d.e(1);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  let b = { c: tmpObjLitVal };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (tmpObjLitVal$2, tmpObjLitVal$3, b$1, a$1, tmpChainRootProp$1, tmpIfTest$1) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpChainElementCall$1 = tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
    a$1 = tmpChainElementCall$1;
    const tmpReturnArg = tmpBranchingC(tmpObjLitVal$2, tmpObjLitVal$3, b$1, a$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpObjLitVal$4, tmpObjLitVal$5, b$2, a$2, tmpChainRootProp$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(tmpObjLitVal$4, tmpObjLitVal$5, b$2, a$2, tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpObjLitVal$6, tmpObjLitVal$7, b$3, a$3, tmpChainRootProp$3, tmpIfTest$3) {
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpObjLitVal$1, tmpObjLitVal, b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpObjLitVal$1, tmpObjLitVal, b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$3;
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
  if (tmpIfTest) {
    const tmpChainElementObject$3 = b.c;
    const tmpChainElementObject$4 = tmpChainElementObject$3.d;
    const tmpChainElementObject$5 = tmpChainElementObject$4.e;
    const tmpChainElementCall$1 = tmpChainElementObject$5.call(tmpChainElementObject$4, 1);
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
