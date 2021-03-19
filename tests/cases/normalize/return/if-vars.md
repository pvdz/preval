# Preval test case

# if-vars.md

> Normalize > Return > If-vars
>
> When the if branch ends with an update to the binding that is returned afterwards, return it immediately.

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = $(1, 'a');
  }
  return x;
}
$(f(), 'result');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let x = undefined;
  if ($(1)) {
    x = $(1, 'a');
  }
  return x;
};
$(f(), 'result');
`````

## Normalized

`````js filename=intro
let f = function () {
  let x = undefined;
  const tmpIfTest = $(1);
  const tmpBranchingA = function (x$1, tmpIfTest$1) {
    x$1 = $(1, 'a');
    const tmpReturnArg = tmpBranchingC(x$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (x$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(x$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (x$3, tmpIfTest$3) {
    return x$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(x, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(x, tmpIfTest);
    return tmpReturnArg$3;
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const SSA_x$1 = $(1, 'a');
    return SSA_x$1;
  } else {
    return undefined;
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
