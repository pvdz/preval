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
  const a = 10;
  let b = undefined;
  const tmpChainRootProp = $(2);
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (a$1, b$1, tmpChainRootProp$1, tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.toString;
    b$1 = tmpChainElementObject$1;
    const tmpReturnArg = tmpBranchingC(a$1, b$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2, b$2, tmpChainRootProp$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(a$2, b$2, tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3, b$3, tmpChainRootProp$3, tmpIfTest$3) {
    let c$1 = undefined;
    const tmpChainRootProp$4 = b$3;
    const tmpIfTest$4 = tmpChainRootProp$4 != null;
    const tmpBranchingA$1 = function (a$4, b$4, tmpChainRootProp$5, tmpIfTest$5, c$2, tmpChainRootProp$6, tmpIfTest$6) {
      const tmpChainElementObject$3 = tmpChainRootProp$6.length;
      c$2 = tmpChainElementObject$3;
      const tmpReturnArg$2 = tmpBranchingC$1(a$4, b$4, tmpChainRootProp$5, tmpIfTest$5, c$2, tmpChainRootProp$6, tmpIfTest$6);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (a$5, b$5, tmpChainRootProp$7, tmpIfTest$7, c$3, tmpChainRootProp$8, tmpIfTest$8) {
      const tmpReturnArg$3 = tmpBranchingC$1(a$5, b$5, tmpChainRootProp$7, tmpIfTest$7, c$3, tmpChainRootProp$8, tmpIfTest$8);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (a$6, b$6, tmpChainRootProp$9, tmpIfTest$9, c$4, tmpChainRootProp$10, tmpIfTest$10) {
      const tmpReturnArg$4 = $(c$4);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$5 = tmpBranchingA$1(a$3, b$3, tmpChainRootProp$3, tmpIfTest$3, c$1, tmpChainRootProp$4, tmpIfTest$4);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(a$3, b$3, tmpChainRootProp$3, tmpIfTest$3, c$1, tmpChainRootProp$4, tmpIfTest$4);
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(a, b, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$8 = tmpBranchingB(a, b, tmpChainRootProp, tmpIfTest);
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
  const tmpChainRootProp = $(2);
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingC = function (b$3) {
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
    const tmpChainElementObject$1 = tmpChainRootProp.toString;
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
