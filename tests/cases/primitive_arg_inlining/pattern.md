# Preval test case

# pattern.md

> Primitive arg inlining > Pattern
>
> This is roughly what patterns dissolve into

#TODO

## Input

`````js filename=intro
function f(op) {
  let ap = undefined;
  const useDef = op === undefined;
  if (useDef) {
    const p = { a: 'fail' };
    ap = $(p);
  } else {
    ap = op;
  }
  const tmpCalleeParam$2 = [];
  let x = objPatternRest(ap, tmpCalleeParam$2, undefined);
  return x;
}
const out = f('abc');
$(out);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let op = $$0;
  debugger;
  let ap = undefined;
  const useDef = op === undefined;
  if (useDef) {
    const p = { a: 'fail' };
    ap = $(p);
  } else {
    ap = op;
  }
  const tmpCalleeParam$2 = [];
  let x = objPatternRest(ap, tmpCalleeParam$2, undefined);
  return x;
};
const out = f('abc');
$(out);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let op = $$0;
  debugger;
  let ap = undefined;
  const useDef = op === undefined;
  const tmpBranchingA = function () {
    debugger;
    const p$1 = { a: 'fail' };
    ap = $(p$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    ap = op;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    tmpCalleeParam$2 = [];
    x = objPatternRest(ap, tmpCalleeParam$2, undefined);
    return x;
  };
  let tmpCalleeParam$2 = undefined;
  let x = undefined;
  if (useDef) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const out = f('abc');
$(out);
`````

## Output

`````js filename=intro
const tmpssa2_tmpCalleeParam$2 = [];
const tmpssa2_x = objPatternRest('abc', tmpssa2_tmpCalleeParam$2, undefined);
$(tmpssa2_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
