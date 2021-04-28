# Preval test case

# base_break_cond2.md

> Normalize > Loops > Base break cond2
>
> A loop with a conditional early break

At some point the final result was receiving undefined rather than 100 because the common return algo had a bug.

#TODO

## Input

`````js filename=intro
function f() {
  let n = 0;
  while (true) {
    $(++n);
    if (n < 4) break;
  }
  $('afterwards');
  return 100;
}
$(f(), 'f');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  while (true) {
    $(++n);
    if (n < 4) break;
  }
  $('afterwards');
  return 100;
};
$(f(), 'f');
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    const tmpCallCallee = $;
    n = n + 1;
    let tmpCalleeParam = n;
    tmpCallCallee(tmpCalleeParam);
    const tmpIfTest = n < 4;
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
      $('afterwards');
      return 100;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
  const tmpReturnArg = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
const tmpCalleeParam$3 = 'f';
tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Output

`````js filename=intro
let n = 0;
let tmpLoopRetCode = true;
const tmpLoopBody = function () {
  debugger;
  n = n + 1;
  const tmpCalleeParam = n;
  $(tmpCalleeParam);
  const tmpIfTest = n < 4;
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
    $('afterwards');
    return 100;
  }
};
while (tmpLoopRetCode) {
  tmpLoopBody();
}
const tmpReturnArg = tmpLoopTail(tmpLoopRetCode);
$(tmpReturnArg, 'f');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'afterwards'
 - 3: 100, 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same