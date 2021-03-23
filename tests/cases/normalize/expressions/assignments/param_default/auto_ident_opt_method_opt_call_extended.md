# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f(p = (a = b?.c.d.e?.(1))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = b?.c.d.e?.(1)) : tmpParamBare;
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
    let tmpNestedComplexRhs$1 = undefined;
    const tmpChainRootProp$1 = b;
    const tmpIfTest$4 = tmpChainRootProp$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$4 = $$0;
      let p$4 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpNestedComplexRhs$2 = $$3;
      let tmpChainRootProp$2 = $$4;
      let tmpIfTest$9 = $$5;
      debugger;
      const tmpChainElementObject$6 = tmpChainRootProp$2.c;
      const tmpChainElementObject$7 = tmpChainElementObject$6.d;
      const tmpChainElementObject$8 = tmpChainElementObject$7.e;
      const tmpIfTest$10 = tmpChainElementObject$8 != null;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$7 = $$0;
        let p$7 = $$1;
        let tmpIfTest$15 = $$2;
        let tmpNestedComplexRhs$5 = $$3;
        let tmpChainRootProp$5 = $$4;
        let tmpIfTest$16 = $$5;
        let tmpChainElementObject$9 = $$6;
        let tmpChainElementObject$10 = $$7;
        let tmpChainElementObject$11 = $$8;
        let tmpIfTest$17 = $$9;
        debugger;
        const tmpChainElementCall$3 = tmpChainElementObject$11.call(tmpChainElementObject$10, 1);
        tmpNestedComplexRhs$5 = tmpChainElementCall$3;
        const tmpReturnArg = tmpBranchingC$2(
          tmpParamBare$7,
          p$7,
          tmpIfTest$15,
          tmpNestedComplexRhs$5,
          tmpChainRootProp$5,
          tmpIfTest$16,
          tmpChainElementObject$9,
          tmpChainElementObject$10,
          tmpChainElementObject$11,
          tmpIfTest$17,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$8 = $$0;
        let p$8 = $$1;
        let tmpIfTest$18 = $$2;
        let tmpNestedComplexRhs$6 = $$3;
        let tmpChainRootProp$6 = $$4;
        let tmpIfTest$19 = $$5;
        let tmpChainElementObject$12 = $$6;
        let tmpChainElementObject$13 = $$7;
        let tmpChainElementObject$14 = $$8;
        let tmpIfTest$20 = $$9;
        debugger;
        const tmpReturnArg$1 = tmpBranchingC$2(
          tmpParamBare$8,
          p$8,
          tmpIfTest$18,
          tmpNestedComplexRhs$6,
          tmpChainRootProp$6,
          tmpIfTest$19,
          tmpChainElementObject$12,
          tmpChainElementObject$13,
          tmpChainElementObject$14,
          tmpIfTest$20,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$9 = $$0;
        let p$9 = $$1;
        let tmpIfTest$21 = $$2;
        let tmpNestedComplexRhs$7 = $$3;
        let tmpChainRootProp$7 = $$4;
        let tmpIfTest$22 = $$5;
        let tmpChainElementObject$15 = $$6;
        let tmpChainElementObject$16 = $$7;
        let tmpChainElementObject$17 = $$8;
        let tmpIfTest$23 = $$9;
        debugger;
        const tmpReturnArg$2 = tmpBranchingC$1(tmpParamBare$9, p$9, tmpIfTest$21, tmpNestedComplexRhs$7, tmpChainRootProp$7, tmpIfTest$22);
        return tmpReturnArg$2;
      };
      if (tmpIfTest$10) {
        const tmpReturnArg$3 = tmpBranchingA$2(
          tmpParamBare$4,
          p$4,
          tmpIfTest$8,
          tmpNestedComplexRhs$2,
          tmpChainRootProp$2,
          tmpIfTest$9,
          tmpChainElementObject$6,
          tmpChainElementObject$7,
          tmpChainElementObject$8,
          tmpIfTest$10,
        );
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$4 = tmpBranchingB$2(
          tmpParamBare$4,
          p$4,
          tmpIfTest$8,
          tmpNestedComplexRhs$2,
          tmpChainRootProp$2,
          tmpIfTest$9,
          tmpChainElementObject$6,
          tmpChainElementObject$7,
          tmpChainElementObject$8,
          tmpIfTest$10,
        );
        return tmpReturnArg$4;
      }
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$5 = $$0;
      let p$5 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpNestedComplexRhs$3 = $$3;
      let tmpChainRootProp$3 = $$4;
      let tmpIfTest$12 = $$5;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamBare$5, p$5, tmpIfTest$11, tmpNestedComplexRhs$3, tmpChainRootProp$3, tmpIfTest$12);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$6 = $$0;
      let p$6 = $$1;
      let tmpIfTest$13 = $$2;
      let tmpNestedComplexRhs$4 = $$3;
      let tmpChainRootProp$4 = $$4;
      let tmpIfTest$14 = $$5;
      debugger;
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$6 = tmpBranchingC(tmpParamBare$6, p$6, tmpIfTest$13);
      return tmpReturnArg$6;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$3, tmpNestedComplexRhs$1, tmpChainRootProp$1, tmpIfTest$4);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$3, tmpNestedComplexRhs$1, tmpChainRootProp$1, tmpIfTest$4);
      return tmpReturnArg$8;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let p$2 = $$1;
    let tmpIfTest$6 = $$2;
    debugger;
    p$2 = tmpParamBare$2;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamBare$2, p$2, tmpIfTest$6);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$11;
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
  const tmpIfTest$4 = b != null;
  const tmpBranchingA$1 = function ($$0) {
    const tmpChainRootProp$2 = $$0;
    debugger;
    const tmpChainElementObject$6 = tmpChainRootProp$2.c;
    const tmpChainElementObject$7 = tmpChainElementObject$6.d;
    const tmpChainElementObject$8 = tmpChainElementObject$7.e;
    const tmpIfTest$10 = tmpChainElementObject$8 != null;
    if (tmpIfTest$10) {
      const tmpChainElementCall$3 = tmpChainElementObject$8.call(tmpChainElementObject$7, 1);
      a = tmpChainElementCall$3;
      return undefined;
    } else {
      a = undefined;
      return undefined;
    }
  };
  if (tmpIfTest$4) {
    const tmpReturnArg = tmpBranchingA$1(b);
    return tmpReturnArg;
  } else {
    a = undefined;
    return undefined;
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
 - 2: undefined
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
