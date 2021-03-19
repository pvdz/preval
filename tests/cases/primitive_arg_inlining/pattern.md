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
let f = function (op) {
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
let f = function (op) {
  let ap = undefined;
  const useDef = op === undefined;
  const tmpBranchingA = function (op$1, ap$1, useDef$1) {
    const p$1 = { a: 'fail' };
    ap$1 = $(p$1);
    const tmpReturnArg = tmpBranchingC(op$1, ap$1, useDef$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (op$2, ap$2, useDef$2) {
    ap$2 = op$2;
    const tmpReturnArg$1 = tmpBranchingC(op$2, ap$2, useDef$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (op$3, ap$3, useDef$3) {
    const tmpCalleeParam$1 = [];
    let x$1 = objPatternRest(ap$3, tmpCalleeParam$1, undefined);
    return x$1;
  };
  if (useDef) {
    const tmpReturnArg$2 = tmpBranchingA(op, ap, useDef);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(op, ap, useDef);
    return tmpReturnArg$3;
  }
};
const out = f('abc');
$(out);
`````

## Output

`````js filename=intro
const f = function (op) {
  const useDef = op === undefined;
  const tmpBranchingC = function (ap$3) {
    const tmpCalleeParam$1 = [];
    const x$1 = objPatternRest(ap$3, tmpCalleeParam$1, undefined);
    return x$1;
  };
  if (useDef) {
    const p$1 = { a: 'fail' };
    const SSA_ap$1 = $(p$1);
    const tmpReturnArg = tmpBranchingC(SSA_ap$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(op);
    return tmpReturnArg$1;
  }
};
const out = f('abc');
$(out);
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
