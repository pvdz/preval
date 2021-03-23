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
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let a$1 = $$0;
    let b$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    b$1 = toString;
    const tmpReturnArg = tmpBranchingC(a$1, b$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let a$2 = $$0;
    let b$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$2, b$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let a$3 = $$0;
    let b$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    let c$1 = b$3;
    const tmpIfTest$4 = c$1 == null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let a$4 = $$0;
      let b$4 = $$1;
      let tmpIfTest$5 = $$2;
      let c$2 = $$3;
      let tmpIfTest$6 = $$4;
      debugger;
      c$2 = length;
      const tmpReturnArg$2 = tmpBranchingC$1(a$4, b$4, tmpIfTest$5, c$2, tmpIfTest$6);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let a$5 = $$0;
      let b$5 = $$1;
      let tmpIfTest$7 = $$2;
      let c$3 = $$3;
      let tmpIfTest$8 = $$4;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(a$5, b$5, tmpIfTest$7, c$3, tmpIfTest$8);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let a$6 = $$0;
      let b$6 = $$1;
      let tmpIfTest$9 = $$2;
      let c$4 = $$3;
      let tmpIfTest$10 = $$4;
      debugger;
      const tmpReturnArg$4 = $(c$4);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$5 = tmpBranchingA$1(a$3, b$3, tmpIfTest$3, c$1, tmpIfTest$4);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(a$3, b$3, tmpIfTest$3, c$1, tmpIfTest$4);
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(a, b, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$8 = tmpBranchingB(a, b, tmpIfTest);
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
  const b = $(2);
  const tmpIfTest = b == null;
  const tmpBranchingC = function ($$0) {
    const b$3 = $$0;
    debugger;
    const tmpIfTest$4 = b$3 == null;
    if (tmpIfTest$4) {
      const SSA_c$2 = length;
      const tmpReturnArg$2 = $(SSA_c$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$6 = $(b$3);
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const SSA_b$1 = toString;
    const tmpReturnArg = tmpBranchingC(SSA_b$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$8 = tmpBranchingC(b);
    return tmpReturnArg$8;
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
