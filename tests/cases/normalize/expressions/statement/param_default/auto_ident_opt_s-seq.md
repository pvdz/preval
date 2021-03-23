# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Statement > Param default > Auto ident opt s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f(p = (1, 2, b)?.x) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (1, 2, b)?.x : tmpParamBare;
};
let b = { x: 1 };
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
    let tmpIfTest$2 = $$2;
    debugger;
    p$1 = undefined;
    const tmpChainRootProp$1 = b;
    const tmpIfTest$3 = tmpChainRootProp$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$4 = $$0;
      let p$4 = $$1;
      let tmpIfTest$6 = $$2;
      let tmpChainRootProp$2 = $$3;
      let tmpIfTest$7 = $$4;
      debugger;
      const tmpChainElementObject$2 = tmpChainRootProp$2.x;
      p$4 = tmpChainElementObject$2;
      const tmpReturnArg = tmpBranchingC$1(tmpParamBare$4, p$4, tmpIfTest$6, tmpChainRootProp$2, tmpIfTest$7);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$5 = $$0;
      let p$5 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpChainRootProp$3 = $$3;
      let tmpIfTest$9 = $$4;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamBare$5, p$5, tmpIfTest$8, tmpChainRootProp$3, tmpIfTest$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$6 = $$0;
      let p$6 = $$1;
      let tmpIfTest$10 = $$2;
      let tmpChainRootProp$4 = $$3;
      let tmpIfTest$11 = $$4;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC(tmpParamBare$6, p$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$2, tmpChainRootProp$1, tmpIfTest$3);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$2, tmpChainRootProp$1, tmpIfTest$3);
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let p$2 = $$1;
    let tmpIfTest$4 = $$2;
    debugger;
    p$2 = tmpParamBare$2;
    const tmpReturnArg$5 = tmpBranchingC(tmpParamBare$2, p$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$7;
  }
};
let b = { x: 1 };
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
  const tmpIfTest$3 = b != null;
  if (tmpIfTest$3) {
    b.x;
    return undefined;
  } else {
    return undefined;
  }
};
const b = { x: 1 };
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
