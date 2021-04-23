# Preval test case

# func_nested_var_simple.md

> Normalize > Nullish > Func nested var simple
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = $(2)??toString,
        c = b??length
  return $(c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const a = 10,
    b = $(2) ?? toString,
    c = b ?? length;
  return $(c);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const a = 10;
  let b = $(2);
  const tmpIfTest = b == null;
  const tmpBranchingA = function () {
    debugger;
    b = toString;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    c = b;
    const tmpIfTest$1 = c == null;
    const tmpBranchingA$1 = function () {
      debugger;
      c = length;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$7 = $(c);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$9 = tmpBranchingA$1();
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1();
      return tmpReturnArg$11;
    }
  };
  let c = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB();
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
  let b = $(2);
  const tmpIfTest = b == null;
  const tmpBranchingC = function () {
    debugger;
    const tmpSSA_tmpssa3_c = b;
    const tmpIfTest$1 = tmpSSA_tmpssa3_c == null;
    if (tmpIfTest$1) {
      const tmpSSA_tmpssa3_c$1 = length;
      const tmpReturnArg$3 = $(tmpSSA_tmpssa3_c$1);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$11 = $(tmpSSA_tmpssa3_c);
      return tmpReturnArg$11;
    }
  };
  if (tmpIfTest) {
    b = toString;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$15 = tmpBranchingC();
    return tmpReturnArg$15;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 2 implicit global bindings:

length, toString

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
