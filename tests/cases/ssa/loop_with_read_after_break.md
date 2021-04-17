# Preval test case

# loop_with_read_after_break.md

> Ssa > Loop with read after break
>
> The read afterwards makes SSA not worth it

The break introduces branching which prevents any SSA in the first place.

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  while (true) {
    x = $(2);
    $(x);
    if ($) break;
  }
  $(x);
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  while (true) {
    x = $(2);
    $(x);
    if ($) break;
  }
  $(x);
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    x = $(2);
    $(x);
    if ($) {
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
    const tmpIfTest = tmpLoopRetCode$1 === undefined;
    if (tmpIfTest) {
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
  f();
} else {
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let x = $(1);
  let tmpLoopRetCode = true;
  const tmpLoopBody = function () {
    debugger;
    x = $(2);
    $(x);
    if ($) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  const tmpLoopTail = function ($$0) {
    const tmpLoopRetCode$1 = $$0;
    debugger;
    const tmpIfTest = tmpLoopRetCode$1 === undefined;
    if (tmpIfTest) {
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
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
