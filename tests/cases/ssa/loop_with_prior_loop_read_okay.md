# Preval test case

# loop_with_prior_loop_read_okay.md

> Ssa > Loop with prior loop read okay
>
> Example of technical case where SSA is possible

- there is a write before any read in the loop
- there is no further read

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  while (true) {
    $(x); // This looped read should not be the reason to prevent SSA in the next loop
    if ($) break;
  }
  while (true) {
    x = $(2);
    $(x);
  }
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  while (true) {
    $(x);
    if ($) break;
  }
  while (true) {
    x = $(2);
    $(x);
  }
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
      while (true) {
        x = $(2);
        $(x);
      }
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
      while (true) {
        x = $(2);
        $(x);
      }
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
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
