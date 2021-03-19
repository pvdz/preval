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
const f = function (x1) {
  let x = undefined;
  if ($) {
    x = {};
  }
  const g = function () {
    $(arguments.length);
  };
  return g();
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function (x1) {
  let x = undefined;
  const tmpBranchingA = function (x1$1, x$1) {
    x$1 = {};
    const tmpReturnArg = tmpBranchingC(x1$1, x$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (x1$2, x$2) {
    const tmpReturnArg$1 = tmpBranchingC(x1$2, x$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (x1$3, x$3) {
    const g$1 = function () {
      const tmpPrevalAliasArgumentsLen$1 = arguments.length;
      $(tmpPrevalAliasArgumentsLen$1);
    };
    const tmpReturnArg$2 = g$1();
    return tmpReturnArg$2;
  };
  if ($) {
    const tmpReturnArg$3 = tmpBranchingA(x1, x);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$4 = tmpBranchingB(x1, x);
    return tmpReturnArg$4;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpBranchingC = function () {
    const g$1 = function () {
      const tmpPrevalAliasArgumentsLen$1 = arguments.length;
      $(tmpPrevalAliasArgumentsLen$1);
    };
    const tmpReturnArg$2 = g$1();
    return tmpReturnArg$2;
  };
  if ($) {
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$4 = tmpBranchingC();
    return tmpReturnArg$4;
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
