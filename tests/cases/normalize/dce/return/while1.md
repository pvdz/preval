# Preval test case

# while1.md

> Normalize > Dce > Return > While1
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    return $(1, 'return');
  }
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  while ($(true)) {
    return $(1, 'return');
  }
  $('keep, do not eval');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      const tmpReturnArg = $(1, 'return');
      tmpLoopRetCode = undefined;
      tmpLoopRetValue = tmpReturnArg;
      return undefined;
    } else {
      tmpLoopRetCode = false;
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
      $('keep, do not eval');
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
  const tmpReturnArg$1 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpLoopRetCode = true;
let tmpLoopRetValue = undefined;
const tmpLoopBody = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpReturnArg = $(1, 'return');
    tmpLoopRetCode = undefined;
    tmpLoopRetValue = tmpReturnArg;
    return undefined;
  } else {
    tmpLoopRetCode = false;
    return undefined;
  }
};
const tmpLoopTail = function ($$0, $$1) {
  const tmpLoopRetCode$1 = $$0;
  const tmpLoopRetValue$1 = $$1;
  debugger;
  const tmpIfTest$1 = tmpLoopRetCode$1 === undefined;
  if (tmpIfTest$1) {
    return tmpLoopRetValue$1;
  } else {
    $('keep, do not eval');
  }
};
while (tmpLoopRetCode) {
  tmpLoopBody();
}
const tmpReturnArg$1 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
$(tmpReturnArg$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1, 'return'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
