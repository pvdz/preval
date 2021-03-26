# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Statement > Param default > Auto ident opt method call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f(p = b?.c.d.e(1)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? b?.c.d.e(1) : tmpParamBare;
};
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let p$1 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    p$1 = undefined;
    const tmpChainRootProp$1 = b;
    const tmpIfTest$5 = tmpChainRootProp$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$7 = $$0;
      let p$7 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpChainRootProp$3 = $$3;
      let tmpIfTest$13 = $$4;
      debugger;
      const tmpChainElementObject$11 = tmpChainRootProp$3.c;
      const tmpChainElementObject$13 = tmpChainElementObject$11.d;
      const tmpChainElementObject$15 = tmpChainElementObject$13.e;
      const tmpChainElementCall$3 = tmpChainElementObject$15.call(tmpChainElementObject$13, 1);
      p$7 = tmpChainElementCall$3;
      const tmpReturnArg = tmpBranchingC$1(tmpParamBare$7, p$7, tmpIfTest$11, tmpChainRootProp$3, tmpIfTest$13);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$9 = $$0;
      let p$9 = $$1;
      let tmpIfTest$15 = $$2;
      let tmpChainRootProp$5 = $$3;
      let tmpIfTest$17 = $$4;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamBare$9, p$9, tmpIfTest$15, tmpChainRootProp$5, tmpIfTest$17);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$11 = $$0;
      let p$11 = $$1;
      let tmpIfTest$19 = $$2;
      let tmpChainRootProp$7 = $$3;
      let tmpIfTest$21 = $$4;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(tmpParamBare$11, p$11, tmpIfTest$19);
      return tmpReturnArg$3;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$3, tmpChainRootProp$1, tmpIfTest$5);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$3, tmpChainRootProp$1, tmpIfTest$5);
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
    p$3 = tmpParamBare$3;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamBare$3, p$3, tmpIfTest$7);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let p$5 = $$1;
    let tmpIfTest$9 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
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
  const tmpIfTest$5 = b != null;
  if (tmpIfTest$5) {
    const tmpChainElementObject$1 = b.c;
    const tmpChainElementObject$3 = tmpChainElementObject$1.d;
    const tmpChainElementObject$5 = tmpChainElementObject$3.e;
    tmpChainElementObject$5.call(tmpChainElementObject$3, 1);
    return undefined;
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
 - 2: undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
