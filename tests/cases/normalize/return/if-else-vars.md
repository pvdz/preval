# Preval test case

# if-else-vars.md

> Normalize > Return > If-else-vars
>
> When both branches end with an update to the binding that is returned, return it immediately.

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = $(1, 'a');
  } else {
    x = $(2, 'b');
  }
  return x;
}
$(f(), 'result');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  if ($(1)) {
    x = $(1, 'a');
  } else {
    x = $(2, 'b');
  }
  return x;
};
$(f(), 'result');
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  const tmpIfTest = $(1);
  const tmpBranchingA = function () {
    debugger;
    x = $(1, 'a');
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    x = $(2, 'b');
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    return x;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = 'result';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpssa2_x = $(1, 'a');
    return tmpssa2_x;
  } else {
    const tmpssa2_x$1 = $(2, 'b');
    return tmpssa2_x$1;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, 'result');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'a'
 - 3: 1, 'result'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
