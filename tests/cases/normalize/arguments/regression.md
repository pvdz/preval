# Preval test case

# regression.md

> Normalize > Arguments > Regression
>
> Regression that was leading to a crash due to arguments.length. The outer func was mandatory, as was the param default

#TODO

## Input

`````js filename=intro
const f = function(x1) {
  let x = undefined;
  if ($) {
    x = {};
  } 
  const g = function() {
    $(arguments.length)
  }
  return g();
}
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let x1 = $$0;
  debugger;
  let x = undefined;
  if ($) {
    x = {};
  }
  const g = function () {
    const tmpArgumentsLen = arguments.length;
    debugger;
    $(tmpArgumentsLen);
  };
  return g();
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let x1 = $$0;
  debugger;
  let x = undefined;
  const tmpBranchingA = function () {
    debugger;
    x = {};
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
    g = function () {
      const tmpArgumentsLen$1 = arguments.length;
      debugger;
      $(tmpArgumentsLen$1);
      return undefined;
    };
    const tmpReturnArg$3 = g();
    return tmpReturnArg$3;
  };
  let g = undefined;
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
const tmpssa2_g = function () {
  const tmpArgumentsLen$1 = arguments.length;
  debugger;
  $(tmpArgumentsLen$1);
  return undefined;
};
const tmpBranchingC = function () {
  debugger;
  tmpssa2_g();
  return undefined;
};
if ($) {
  tmpBranchingC();
} else {
  tmpBranchingC();
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
