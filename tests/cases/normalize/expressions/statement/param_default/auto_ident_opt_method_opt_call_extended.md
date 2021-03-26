# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Param default > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f(p = b?.c.d.e?.(1)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? b?.c.d.e?.(1) : tmpParamBare;
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
    let tmpIfTest$5 = $$2;
    debugger;
    p$1 = undefined;
    const tmpChainRootProp$1 = b;
    const tmpIfTest$7 = tmpChainRootProp$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$7 = $$0;
      let p$7 = $$1;
      let tmpIfTest$15 = $$2;
      let tmpChainRootProp$3 = $$3;
      let tmpIfTest$17 = $$4;
      debugger;
      const tmpChainElementObject$11 = tmpChainRootProp$3.c;
      const tmpChainElementObject$13 = tmpChainElementObject$11.d;
      const tmpChainElementObject$15 = tmpChainElementObject$13.e;
      const tmpIfTest$19 = tmpChainElementObject$15 != null;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpParamBare$13 = $$0;
        let p$13 = $$1;
        let tmpIfTest$29 = $$2;
        let tmpChainRootProp$9 = $$3;
        let tmpIfTest$31 = $$4;
        let tmpChainElementObject$17 = $$5;
        let tmpChainElementObject$19 = $$6;
        let tmpChainElementObject$21 = $$7;
        let tmpIfTest$33 = $$8;
        debugger;
        const tmpChainElementCall$5 = tmpChainElementObject$21.call(tmpChainElementObject$19, 1);
        p$13 = tmpChainElementCall$5;
        const tmpReturnArg = tmpBranchingC$3(
          tmpParamBare$13,
          p$13,
          tmpIfTest$29,
          tmpChainRootProp$9,
          tmpIfTest$31,
          tmpChainElementObject$17,
          tmpChainElementObject$19,
          tmpChainElementObject$21,
          tmpIfTest$33,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpParamBare$15 = $$0;
        let p$15 = $$1;
        let tmpIfTest$35 = $$2;
        let tmpChainRootProp$11 = $$3;
        let tmpIfTest$37 = $$4;
        let tmpChainElementObject$23 = $$5;
        let tmpChainElementObject$25 = $$6;
        let tmpChainElementObject$27 = $$7;
        let tmpIfTest$39 = $$8;
        debugger;
        const tmpReturnArg$1 = tmpBranchingC$3(
          tmpParamBare$15,
          p$15,
          tmpIfTest$35,
          tmpChainRootProp$11,
          tmpIfTest$37,
          tmpChainElementObject$23,
          tmpChainElementObject$25,
          tmpChainElementObject$27,
          tmpIfTest$39,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpParamBare$17 = $$0;
        let p$17 = $$1;
        let tmpIfTest$41 = $$2;
        let tmpChainRootProp$13 = $$3;
        let tmpIfTest$43 = $$4;
        let tmpChainElementObject$29 = $$5;
        let tmpChainElementObject$31 = $$6;
        let tmpChainElementObject$33 = $$7;
        let tmpIfTest$45 = $$8;
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$1(tmpParamBare$17, p$17, tmpIfTest$41, tmpChainRootProp$13, tmpIfTest$43);
        return tmpReturnArg$3;
      };
      if (tmpIfTest$19) {
        const tmpReturnArg$5 = tmpBranchingA$3(
          tmpParamBare$7,
          p$7,
          tmpIfTest$15,
          tmpChainRootProp$3,
          tmpIfTest$17,
          tmpChainElementObject$11,
          tmpChainElementObject$13,
          tmpChainElementObject$15,
          tmpIfTest$19,
        );
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$3(
          tmpParamBare$7,
          p$7,
          tmpIfTest$15,
          tmpChainRootProp$3,
          tmpIfTest$17,
          tmpChainElementObject$11,
          tmpChainElementObject$13,
          tmpChainElementObject$15,
          tmpIfTest$19,
        );
        return tmpReturnArg$7;
      }
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$9 = $$0;
      let p$9 = $$1;
      let tmpIfTest$21 = $$2;
      let tmpChainRootProp$5 = $$3;
      let tmpIfTest$23 = $$4;
      debugger;
      const tmpReturnArg$9 = tmpBranchingC$1(tmpParamBare$9, p$9, tmpIfTest$21, tmpChainRootProp$5, tmpIfTest$23);
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$11 = $$0;
      let p$11 = $$1;
      let tmpIfTest$25 = $$2;
      let tmpChainRootProp$7 = $$3;
      let tmpIfTest$27 = $$4;
      debugger;
      const tmpReturnArg$11 = tmpBranchingC(tmpParamBare$11, p$11, tmpIfTest$25);
      return tmpReturnArg$11;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$13 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$5, tmpChainRootProp$1, tmpIfTest$7);
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$5, tmpChainRootProp$1, tmpIfTest$7);
      return tmpReturnArg$15;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$11 = $$2;
    debugger;
    p$3 = tmpParamBare$3;
    const tmpReturnArg$17 = tmpBranchingC(tmpParamBare$3, p$3, tmpIfTest$11);
    return tmpReturnArg$17;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let p$5 = $$1;
    let tmpIfTest$13 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$21;
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
  const tmpIfTest$7 = b != null;
  const tmpBranchingA$1 = function ($$0) {
    const tmpChainRootProp$3 = $$0;
    debugger;
    const tmpChainElementObject$11 = tmpChainRootProp$3.c;
    const tmpChainElementObject$13 = tmpChainElementObject$11.d;
    const tmpChainElementObject$15 = tmpChainElementObject$13.e;
    const tmpIfTest$19 = tmpChainElementObject$15 != null;
    if (tmpIfTest$19) {
      tmpChainElementObject$15.call(tmpChainElementObject$13, 1);
      return undefined;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest$7) {
    const tmpReturnArg = tmpBranchingA$1(b);
    return tmpReturnArg;
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
