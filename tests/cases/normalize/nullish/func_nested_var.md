# Preval test case

# func_nested_var.md

> Normalize > Nullish > Func nested var
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = (a, $(2))??toString,
        c = (1, b)??length
  return $(c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const a = 10,
    b = (a, $(2)) ?? toString,
    c = (1, b) ?? length;
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
    let a$3 = $$0;
    let b$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(a$3, b$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let a$5 = $$0;
    let b$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    let c$1 = b$5;
    const tmpIfTest$7 = c$1 == null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let a$7 = $$0;
      let b$7 = $$1;
      let tmpIfTest$9 = $$2;
      let c$3 = $$3;
      let tmpIfTest$11 = $$4;
      debugger;
      c$3 = length;
      const tmpReturnArg$3 = tmpBranchingC$1(a$7, b$7, tmpIfTest$9, c$3, tmpIfTest$11);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let a$9 = $$0;
      let b$9 = $$1;
      let tmpIfTest$13 = $$2;
      let c$5 = $$3;
      let tmpIfTest$15 = $$4;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(a$9, b$9, tmpIfTest$13, c$5, tmpIfTest$15);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let a$11 = $$0;
      let b$11 = $$1;
      let tmpIfTest$17 = $$2;
      let c$7 = $$3;
      let tmpIfTest$19 = $$4;
      debugger;
      const tmpReturnArg$7 = $(c$7);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$9 = tmpBranchingA$1(a$5, b$5, tmpIfTest$5, c$1, tmpIfTest$7);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(a$5, b$5, tmpIfTest$5, c$1, tmpIfTest$7);
      return tmpReturnArg$11;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(a, b, tmpIfTest);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(a, b, tmpIfTest);
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
  const tmpIfTest$7 = b$5 == null;
  if (tmpIfTest$7) {
    const SSA_c$3 = length;
    const tmpReturnArg$3 = $(SSA_c$3);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$11 = $(b$5);
    return tmpReturnArg$11;
  }
};
const f = function () {
  debugger;
  const b = $(2);
  const tmpIfTest = b == null;
  if (tmpIfTest) {
    const SSA_b$1 = toString;
    const tmpReturnArg = tmpBranchingC(SSA_b$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$15 = tmpBranchingC(b);
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
