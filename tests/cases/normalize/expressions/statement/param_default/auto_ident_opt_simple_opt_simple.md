# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident opt simple opt simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f(p = b?.x?.y) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? b?.x?.y : tmpParamBare;
};
let b = { x: { y: 1 } };
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
    const tmpIfTest$4 = tmpChainRootProp$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$4 = $$0;
      let p$4 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpChainRootProp$2 = $$3;
      let tmpIfTest$9 = $$4;
      debugger;
      const tmpChainElementObject$4 = tmpChainRootProp$2.x;
      const tmpIfTest$10 = tmpChainElementObject$4 != null;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$7 = $$0;
        let p$7 = $$1;
        let tmpIfTest$15 = $$2;
        let tmpChainRootProp$5 = $$3;
        let tmpIfTest$16 = $$4;
        let tmpChainElementObject$6 = $$5;
        let tmpIfTest$17 = $$6;
        debugger;
        const tmpChainElementObject$7 = tmpChainElementObject$6.y;
        p$7 = tmpChainElementObject$7;
        const tmpReturnArg = tmpBranchingC$2(
          tmpParamBare$7,
          p$7,
          tmpIfTest$15,
          tmpChainRootProp$5,
          tmpIfTest$16,
          tmpChainElementObject$6,
          tmpIfTest$17,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$8 = $$0;
        let p$8 = $$1;
        let tmpIfTest$18 = $$2;
        let tmpChainRootProp$6 = $$3;
        let tmpIfTest$19 = $$4;
        let tmpChainElementObject$8 = $$5;
        let tmpIfTest$20 = $$6;
        debugger;
        const tmpReturnArg$1 = tmpBranchingC$2(
          tmpParamBare$8,
          p$8,
          tmpIfTest$18,
          tmpChainRootProp$6,
          tmpIfTest$19,
          tmpChainElementObject$8,
          tmpIfTest$20,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
        let tmpParamBare$9 = $$0;
        let p$9 = $$1;
        let tmpIfTest$21 = $$2;
        let tmpChainRootProp$7 = $$3;
        let tmpIfTest$22 = $$4;
        let tmpChainElementObject$9 = $$5;
        let tmpIfTest$23 = $$6;
        debugger;
        const tmpReturnArg$2 = tmpBranchingC$1(tmpParamBare$9, p$9, tmpIfTest$21, tmpChainRootProp$7, tmpIfTest$22);
        return tmpReturnArg$2;
      };
      if (tmpIfTest$10) {
        const tmpReturnArg$3 = tmpBranchingA$2(
          tmpParamBare$4,
          p$4,
          tmpIfTest$8,
          tmpChainRootProp$2,
          tmpIfTest$9,
          tmpChainElementObject$4,
          tmpIfTest$10,
        );
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$4 = tmpBranchingB$2(
          tmpParamBare$4,
          p$4,
          tmpIfTest$8,
          tmpChainRootProp$2,
          tmpIfTest$9,
          tmpChainElementObject$4,
          tmpIfTest$10,
        );
        return tmpReturnArg$4;
      }
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$5 = $$0;
      let p$5 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpChainRootProp$3 = $$3;
      let tmpIfTest$12 = $$4;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamBare$5, p$5, tmpIfTest$11, tmpChainRootProp$3, tmpIfTest$12);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$6 = $$0;
      let p$6 = $$1;
      let tmpIfTest$13 = $$2;
      let tmpChainRootProp$4 = $$3;
      let tmpIfTest$14 = $$4;
      debugger;
      const tmpReturnArg$6 = tmpBranchingC(tmpParamBare$6, p$6, tmpIfTest$13);
      return tmpReturnArg$6;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$3, tmpChainRootProp$1, tmpIfTest$4);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$3, tmpChainRootProp$1, tmpIfTest$4);
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
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpIfTest$4 = b != null;
    const tmpBranchingA$1 = function ($$0) {
      const tmpChainRootProp$2 = $$0;
      debugger;
      const tmpChainElementObject$4 = tmpChainRootProp$2.x;
      const tmpIfTest$10 = tmpChainElementObject$4 != null;
      if (tmpIfTest$10) {
        tmpChainElementObject$4.y;
        return undefined;
      } else {
        return undefined;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(b);
      return tmpReturnArg$7;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA();
    return tmpReturnArg$10;
  } else {
    return undefined;
  }
};
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
