# Preval test case

# func_nested_var.md

> Normalize > Optional > Func nested var
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = (a, $(2))?.toString,
        c = (1, b)?.length
  return $(c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const a = 10,
    b = (a, $(2))?.toString,
    c = (1, b)?.length;
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
  const tmpChainRootProp = $(2);
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let a$1 = $$0;
    let b$1 = $$1;
    let tmpChainRootProp$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    const tmpChainElementObject$1 = tmpChainRootProp$1.toString;
    b$1 = tmpChainElementObject$1;
    const tmpReturnArg = tmpBranchingC(a$1, b$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let b$3 = $$1;
    let tmpChainRootProp$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$3, b$3, tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let a$5 = $$0;
    let b$5 = $$1;
    let tmpChainRootProp$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    let c$1 = undefined;
    const tmpChainRootProp$7 = b$5;
    const tmpIfTest$7 = tmpChainRootProp$7 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let a$7 = $$0;
      let b$7 = $$1;
      let tmpChainRootProp$9 = $$2;
      let tmpIfTest$9 = $$3;
      let c$3 = $$4;
      let tmpChainRootProp$11 = $$5;
      let tmpIfTest$11 = $$6;
      debugger;
      const tmpChainElementObject$5 = tmpChainRootProp$11.length;
      c$3 = tmpChainElementObject$5;
      const tmpReturnArg$3 = tmpBranchingC$1(a$7, b$7, tmpChainRootProp$9, tmpIfTest$9, c$3, tmpChainRootProp$11, tmpIfTest$11);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let a$9 = $$0;
      let b$9 = $$1;
      let tmpChainRootProp$13 = $$2;
      let tmpIfTest$13 = $$3;
      let c$5 = $$4;
      let tmpChainRootProp$15 = $$5;
      let tmpIfTest$15 = $$6;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(a$9, b$9, tmpChainRootProp$13, tmpIfTest$13, c$5, tmpChainRootProp$15, tmpIfTest$15);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let a$11 = $$0;
      let b$11 = $$1;
      let tmpChainRootProp$17 = $$2;
      let tmpIfTest$17 = $$3;
      let c$7 = $$4;
      let tmpChainRootProp$19 = $$5;
      let tmpIfTest$19 = $$6;
      debugger;
      const tmpReturnArg$7 = $(c$7);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$9 = tmpBranchingA$1(a$5, b$5, tmpChainRootProp$5, tmpIfTest$5, c$1, tmpChainRootProp$7, tmpIfTest$7);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(a$5, b$5, tmpChainRootProp$5, tmpIfTest$5, c$1, tmpChainRootProp$7, tmpIfTest$7);
      return tmpReturnArg$11;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(a, b, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(a, b, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$15;
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
  const tmpChainRootProp = $(2);
  const tmpIfTest = tmpChainRootProp != null;
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
  if (tmpIfTest) {
    const tmpChainElementObject$1 = tmpChainRootProp.toString;
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
