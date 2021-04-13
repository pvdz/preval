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
  const tmpBranchingA = function () {
    debugger;
    foo = propTDZ;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    foo = a;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpAssignObjPatternRhs = b;
    propTDZ = tmpAssignObjPatternRhs.x;
    return undefined;
  };
  let propTDZ = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
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
tmpCalleeParam$1.x;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
