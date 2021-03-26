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
  const tmpBranchingA = function ($$0, $$1) {
    let x$1 = $$0;
    let tmpIfTest$1 = $$1;
    debugger;
    x$1 = $(1, 'a');
    const tmpReturnArg = tmpBranchingC(x$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let x$3 = $$0;
    let tmpIfTest$3 = $$1;
    debugger;
    x$3 = $(2, 'b');
    const tmpReturnArg$1 = tmpBranchingC(x$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let x$5 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
    return x$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(x, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(x, tmpIfTest);
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
    const tmpReturnArg$3 = $(1, 'a');
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = $(2, 'b');
    return tmpReturnArg$5;
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
