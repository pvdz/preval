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
    let a$2 = $$0;
    let b$2 = $$1;
    let tmpChainRootCall$2 = $$2;
    let tmpChainElementCall$2 = $$3;
    let tmpIfTest$2 = $$4;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$2, b$2, tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let a$3 = $$0;
    let b$3 = $$1;
    let tmpChainRootCall$3 = $$2;
    let tmpChainElementCall$3 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    let c$1 = undefined;
    const tmpChainRootProp = b$3;
    const tmpIfTest$4 = tmpChainRootProp != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let a$4 = $$0;
      let b$4 = $$1;
      let tmpChainRootCall$4 = $$2;
      let tmpChainElementCall$4 = $$3;
      let tmpIfTest$5 = $$4;
      let c$2 = $$5;
      let tmpChainRootProp$1 = $$6;
      let tmpIfTest$6 = $$7;
      debugger;
      const tmpChainElementObject$3 = tmpChainRootProp$1.length;
      c$2 = tmpChainElementObject$3;
      const tmpReturnArg$2 = tmpBranchingC$1(
        a$4,
        b$4,
        tmpChainRootCall$4,
        tmpChainElementCall$4,
        tmpIfTest$5,
        c$2,
        tmpChainRootProp$1,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let a$5 = $$0;
      let b$5 = $$1;
      let tmpChainRootCall$5 = $$2;
      let tmpChainElementCall$5 = $$3;
      let tmpIfTest$7 = $$4;
      let c$3 = $$5;
      let tmpChainRootProp$2 = $$6;
      let tmpIfTest$8 = $$7;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(
        a$5,
        b$5,
        tmpChainRootCall$5,
        tmpChainElementCall$5,
        tmpIfTest$7,
        c$3,
        tmpChainRootProp$2,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let a$6 = $$0;
      let b$6 = $$1;
      let tmpChainRootCall$6 = $$2;
      let tmpChainElementCall$6 = $$3;
      let tmpIfTest$9 = $$4;
      let c$4 = $$5;
      let tmpChainRootProp$3 = $$6;
      let tmpIfTest$10 = $$7;
      debugger;
      const tmpReturnArg$4 = $(c$4);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$5 = tmpBranchingA$1(
        a$3,
        b$3,
        tmpChainRootCall$3,
        tmpChainElementCall$3,
        tmpIfTest$3,
        c$1,
        tmpChainRootProp,
        tmpIfTest$4,
      );
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(
        a$3,
        b$3,
        tmpChainRootCall$3,
        tmpChainElementCall$3,
        tmpIfTest$3,
        c$1,
        tmpChainRootProp,
        tmpIfTest$4,
      );
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(a, b, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$8 = tmpBranchingB(a, b, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$8;
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
  const tmpChainElementCall = $(2);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingC = function ($$0) {
    const b$3 = $$0;
    debugger;
    const tmpIfTest$4 = b$3 != null;
    if (tmpIfTest$4) {
      const tmpChainElementObject$3 = b$3.length;
      const tmpReturnArg$2 = $(tmpChainElementObject$3);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$6 = $(undefined);
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const tmpChainElementObject$1 = tmpChainElementCall.toString;
    const tmpReturnArg = tmpBranchingC(tmpChainElementObject$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$8 = tmpBranchingC(undefined);
    return tmpReturnArg$8;
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
