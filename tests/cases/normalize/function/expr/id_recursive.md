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
  const tmpBranchingA = function () {
    debugger;
    return 10;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpCallCallee = r;
    const tmpCalleeParam = n + 1;
    const tmpReturnArg$1 = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
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
