# Preval test case

# base_func_loop.md

> Ssa > Base func loop
>
> Contrived example

#TODO

## Input

`````js filename=intro
function f() {
    let x = $(3);
    $(x);
    while (true) {
      $(++x);
      if (x > 5) break;
    }
    $(x);
}
if ($) $(f()); // The branching prevents certain flattening
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = $(3);
  $(x);
  while (true) {
    $(++x);
    if (x > 5) break;
  }
  $(x);
};
if ($) $(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = $(3);
  $(x);
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    const tmpCallCallee = $;
    x = x + 1;
    let tmpCalleeParam = x;
    tmpCallCallee(tmpCalleeParam);
    const tmpIfTest = x > 5;
    if (tmpIfTest) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  let tmpLoopTail = function ($$0, $$1) {
    let tmpLoopRetCode$1 = $$0;
    let tmpLoopRetValue$1 = $$1;
    debugger;
    const tmpIfTest$1 = tmpLoopRetCode$1 === undefined;
    if (tmpIfTest$1) {
      return tmpLoopRetValue$1;
    } else {
      $(x);
      return undefined;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
  const tmpReturnArg = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
  return tmpReturnArg;
};
if ($) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f();
  tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let x = $(3);
  $(x);
  let tmpLoopRetCode = true;
  const tmpLoopBody = function () {
    debugger;
    x = x + 1;
    const tmpCalleeParam = x;
    $(tmpCalleeParam);
    const tmpIfTest = x > 5;
    if (tmpIfTest) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  const tmpLoopTail = function ($$0) {
    const tmpLoopRetCode$1 = $$0;
    debugger;
    const tmpIfTest$1 = tmpLoopRetCode$1 === undefined;
    if (tmpIfTest$1) {
      return undefined;
    } else {
      $(x);
      return undefined;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
  tmpLoopTail(tmpLoopRetCode);
  return undefined;
};
if ($) {
  f();
  $(undefined);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 6
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
