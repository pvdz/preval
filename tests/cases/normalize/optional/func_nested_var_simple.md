# Preval test case

# func_nested_var_simple.md

> Normalize > Optional > Func nested var simple
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = $(2)?.toString,
        c = b?.length
  return $(c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const a = 10,
    b = $(2)?.toString,
    c = b?.length;
  return $(c);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const a = 10;
  let b = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(2);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4) {
    let a$1 = $$0;
    let b$1 = $$1;
    let tmpChainRootCall$1 = $$2;
    let tmpChainElementCall$1 = $$3;
    let tmpIfTest$1 = $$4;
    debugger;
    const tmpChainElementObject$1 = tmpChainElementCall$1.toString;
    b$1 = tmpChainElementObject$1;
    const tmpReturnArg = tmpBranchingC(a$1, b$1, tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let a$3 = $$0;
    let b$3 = $$1;
    let tmpChainRootCall$3 = $$2;
    let tmpChainElementCall$3 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$3, b$3, tmpChainRootCall$3, tmpChainElementCall$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let a$5 = $$0;
    let b$5 = $$1;
    let tmpChainRootCall$5 = $$2;
    let tmpChainElementCall$5 = $$3;
    let tmpIfTest$5 = $$4;
    debugger;
    let c$1 = undefined;
    const tmpChainRootProp = b$5;
    const tmpIfTest$7 = tmpChainRootProp != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let a$7 = $$0;
      let b$7 = $$1;
      let tmpChainRootCall$7 = $$2;
      let tmpChainElementCall$7 = $$3;
      let tmpIfTest$9 = $$4;
      let c$3 = $$5;
      let tmpChainRootProp$1 = $$6;
      let tmpIfTest$11 = $$7;
      debugger;
      const tmpChainElementObject$5 = tmpChainRootProp$1.length;
      c$3 = tmpChainElementObject$5;
      const tmpReturnArg$3 = tmpBranchingC$1(
        a$7,
        b$7,
        tmpChainRootCall$7,
        tmpChainElementCall$7,
        tmpIfTest$9,
        c$3,
        tmpChainRootProp$1,
        tmpIfTest$11,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let a$9 = $$0;
      let b$9 = $$1;
      let tmpChainRootCall$9 = $$2;
      let tmpChainElementCall$9 = $$3;
      let tmpIfTest$13 = $$4;
      let c$5 = $$5;
      let tmpChainRootProp$3 = $$6;
      let tmpIfTest$15 = $$7;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(
        a$9,
        b$9,
        tmpChainRootCall$9,
        tmpChainElementCall$9,
        tmpIfTest$13,
        c$5,
        tmpChainRootProp$3,
        tmpIfTest$15,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let a$11 = $$0;
      let b$11 = $$1;
      let tmpChainRootCall$11 = $$2;
      let tmpChainElementCall$11 = $$3;
      let tmpIfTest$17 = $$4;
      let c$7 = $$5;
      let tmpChainRootProp$5 = $$6;
      let tmpIfTest$19 = $$7;
      debugger;
      const tmpReturnArg$7 = $(c$7);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$9 = tmpBranchingA$1(
        a$5,
        b$5,
        tmpChainRootCall$5,
        tmpChainElementCall$5,
        tmpIfTest$5,
        c$1,
        tmpChainRootProp,
        tmpIfTest$7,
      );
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(
        a$5,
        b$5,
        tmpChainRootCall$5,
        tmpChainElementCall$5,
        tmpIfTest$5,
        c$1,
        tmpChainRootProp,
        tmpIfTest$7,
      );
      return tmpReturnArg$11;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(a, b, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(a, b, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$15;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const b$5 = $$0;
  debugger;
  const tmpIfTest$7 = b$5 != null;
  if (tmpIfTest$7) {
    const tmpChainElementObject$5 = b$5.length;
    const tmpReturnArg$3 = $(tmpChainElementObject$5);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$11 = $(undefined);
    return tmpReturnArg$11;
  }
};
const f = function () {
  debugger;
  const tmpChainElementCall = $(2);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = tmpChainElementCall.toString;
    const tmpReturnArg = tmpBranchingC(tmpChainElementObject$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$15 = $(undefined);
    return tmpReturnArg$15;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
