# Preval test case

# recursion_indirect.md

> Function onecall > Recursion indirect
>
> This was triggering a problem in another test. Turns out to be caused by recursion.

The single call was being inlined but that led to an implosion of the function.

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;
  const g = function() {
    x = 2;
  };
  if ($) {
    f();
  }
  $(x);
}
// Do not call f(). That did not trigger the path.
// Yes that means this test ends with an empty output. Or should, anyways.
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  const g = function () {
    debugger;
    x = 2;
  };
  if ($) {
    f();
  }
  $(x);
};
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  const g = function () {
    debugger;
    x = 2;
    return undefined;
  };
  const tmpBranchingA = function () {
    debugger;
    f();
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
    $(x);
    return undefined;
  };
  if ($) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
`````

## Output

`````js filename=intro
const tmpBranchingC = function () {
  debugger;
  $(1);
  return undefined;
};
const f = function () {
  debugger;
  if ($) {
    f();
    tmpBranchingC();
    return undefined;
  } else {
    tmpBranchingC();
    return undefined;
  }
};
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
