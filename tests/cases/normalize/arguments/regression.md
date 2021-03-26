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
  const tmpBranchingA = function ($$0, $$1) {
    let x1$1 = $$0;
    let x$1 = $$1;
    debugger;
    x$1 = {};
    const tmpReturnArg = tmpBranchingC(x1$1, x$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let x1$3 = $$0;
    let x$3 = $$1;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(x1$3, x$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let x1$5 = $$0;
    let x$5 = $$1;
    debugger;
    const g$1 = function () {
      const tmpArgumentsLen$1 = arguments.length;
      debugger;
      $(tmpArgumentsLen$1);
    };
    const tmpReturnArg$3 = g$1();
    return tmpReturnArg$3;
  };
  if ($) {
    const tmpReturnArg$5 = tmpBranchingA(x1, x);
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(x1, x);
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
  const tmpBranchingC = function () {
    debugger;
    const g$1 = function () {
      const tmpArgumentsLen$1 = arguments.length;
      debugger;
      $(tmpArgumentsLen$1);
    };
    const tmpReturnArg$3 = g$1();
    return tmpReturnArg$3;
  };
  if ($) {
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
 - 1: 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
