# Preval test case

# while2.md

> Normalize > Dce > Throw > While2
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    throw $(1, 'throw');
    $('fail');
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
    throw $(1, 'throw');
    $('fail');
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
      const tmpThrowArg = $(1, 'throw');
      throw tmpThrowArg;
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
      return undefined;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
  const tmpReturnArg = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpLoopRetCode = true;
const tmpLoopBody = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpThrowArg = $(1, 'throw');
    throw tmpThrowArg;
  } else {
    tmpLoopRetCode = false;
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
    $('keep, do not eval');
    return undefined;
  }
};
while (tmpLoopRetCode) {
  tmpLoopBody();
}
tmpLoopTail(tmpLoopRetCode);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
