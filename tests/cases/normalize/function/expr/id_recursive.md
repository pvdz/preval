# Preval test case

# id_recursive.md

> Normalize > Function > Expr > Id recursive
>
> Function recursion by referencing a function expr id

#TODO

## Input

`````js filename=intro
const f = function r(n) {
  if (n > 100) return 10;
  return r(n + 1);
};
const a = $(10);
const x = f(a);
$(x);
`````

## Pre Normal

`````js filename=intro
const f = function r($$0) {
  let n = $$0;
  debugger;
  if (n > 100) return 10;
  return r(n + 1);
};
const a = $(10);
const x = f(a);
$(x);
`````

## Normalized

`````js filename=intro
const r = function ($$0) {
  let n = $$0;
  debugger;
  const tmpIfTest = n > 100;
  const tmpBranchingA = function ($$0, $$1) {
    let n$1 = $$0;
    let tmpIfTest$1 = $$1;
    debugger;
    return 10;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let n$3 = $$0;
    let tmpIfTest$3 = $$1;
    debugger;
    const tmpReturnArg = tmpBranchingC(n$3, tmpIfTest$3);
    return tmpReturnArg;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let n$5 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
    const tmpCallCallee = r;
    const tmpCalleeParam = n$5 + 1;
    const tmpReturnArg$1 = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(n, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(n, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const f = r;
const a = $(10);
const x = f(a);
$(x);
`````

## Output

`````js filename=intro
const r = function ($$0) {
  const n = $$0;
  debugger;
  const tmpIfTest = n > 100;
  if (tmpIfTest) {
    return 10;
  } else {
    const tmpCalleeParam = n + 1;
    const tmpReturnArg$1 = r(tmpCalleeParam);
    return tmpReturnArg$1;
  }
};
const a = $(10);
const x = r(a);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
