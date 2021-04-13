# Preval test case

# ifelse_with_tail_closure_binding2.md

> Normalize > Branching > Ifelse with tail closure binding2
>
> Regression found while running Preval on Tenko

Trying to make sure there's no optimization that messes up other usages of the closure.

This is essentially a TDZ problem (that's the error that should be thrown here).

#TODO

## Options

TDZ errors are not properly emulated so an eval mismatch is expected

- skipEval

## Input

`````js filename=intro
const f = function () {
  const g = function () {
    $(xyz);
  };
  $(xyz);
  if ($) {
    $(1);
  }
  const xyz = $();
  return g();
};
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const g = function () {
    debugger;
    $(xyz);
  };
  $(xyz);
  if ($) {
    $(1);
  }
  const xyz = $();
  return g();
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const g = function () {
    debugger;
    $(xyz);
    return undefined;
  };
  $(xyz);
  const tmpBranchingA = function () {
    debugger;
    $(1);
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
    xyz = $();
    const tmpReturnArg$3 = g();
    return tmpReturnArg$3;
  };
  let xyz = undefined;
  if ($) {
    const tmpReturnArg$5 = tmpBranchingA();
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB();
    return tmpReturnArg$7;
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
  $(xyz);
  const tmpBranchingC = function () {
    debugger;
    xyz = $();
    $(xyz);
    return undefined;
  };
  let xyz = undefined;
  if ($) {
    $(1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$7 = tmpBranchingC();
    return tmpReturnArg$7;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
