# Preval test case

# flash5.md

> Normalize > Pattern > Binding > Flash5
>
> Regression hunting

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

Note that the implicit global `propTDZ` is caused by TDZ access of x. It's the ternary that leaves it behind, since the actual binding is unused and eliminated.

- skipEval

## Input

`````js filename=intro
let x = function (a, b) {
  let foo = a === undefined ? propTDZ : a;
  let { x: propTDZ } = b;
};
x(undefined, {x: 1});
`````

## Pre Normal

`````js filename=intro
let x = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  let foo = a === undefined ? propTDZ : a;
  let { x: propTDZ } = b;
};
x(undefined, { x: 1 });
`````

## Normalized

`````js filename=intro
let x = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  let foo = undefined;
  const tmpIfTest = a === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let a$1 = $$0;
    let b$1 = $$1;
    let foo$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    foo$1 = propTDZ;
    const tmpReturnArg = tmpBranchingC(a$1, b$1, foo$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let b$3 = $$1;
    let foo$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    foo$3 = a$3;
    const tmpReturnArg$1 = tmpBranchingC(a$3, b$3, foo$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let a$5 = $$0;
    let b$5 = $$1;
    let foo$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    let bindingPatternObjRoot = b$5;
    let propTDZ$1 = bindingPatternObjRoot.x;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(a, b, foo, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(a, b, foo, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = x;
const tmpCalleeParam = undefined;
const tmpCalleeParam$1 = { x: 1 };
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = { x: 1 };
propTDZ;
tmpCalleeParam$1.x;
`````

## Globals

BAD@! Found 1 implicit global bindings:

propTDZ

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
