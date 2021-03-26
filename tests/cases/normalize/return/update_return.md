# Preval test case

# update_return.md

> Normalize > Return > Update return
>
> The branch updates the value that is finally returned. Does it combine them after inlining the return into the branches?

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = 10;
  }
  return x;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  if ($(1)) {
    x = 10;
  }
  return x;
};
$(f());
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
    x$1 = 10;
    const tmpReturnArg = tmpBranchingC(x$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let x$3 = $$0;
    let tmpIfTest$3 = $$1;
    debugger;
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
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return 10;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
