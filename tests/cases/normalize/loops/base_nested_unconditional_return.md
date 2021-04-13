# Preval test case

# base_nested_unconditional_return.md

> Normalize > Loops > Base nested unconditional return
>
> A nested loop with an unconditional early return

#TODO

## Input

`````js filename=intro
function f() {
  $('outer');
  while (true) {
    $('middle');
    while (true) {
      $('inner');
      return 100;
    }  
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $('outer');
  while (true) {
    $('middle');
    while (true) {
      $('inner');
      return 100;
    }
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $('outer');
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    $('middle');
    while (true) {
      $('inner');
      tmpLoopRetCode = undefined;
      tmpLoopRetValue = 100;
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
$('outer');
let tmpLoopRetCode = true;
let tmpLoopRetValue = undefined;
const tmpLoopBody = function () {
  debugger;
  $('middle');
  while (true) {
    $('inner');
    tmpLoopRetCode = undefined;
    tmpLoopRetValue = 100;
    return undefined;
  }
};
const tmpLoopTail = function ($$0, $$1) {
  const tmpLoopRetCode$1 = $$0;
  const tmpLoopRetValue$1 = $$1;
  debugger;
  const tmpIfTest = tmpLoopRetCode$1 === undefined;
  if (tmpIfTest) {
    return tmpLoopRetValue$1;
  } else {
  }
};
while (tmpLoopRetCode) {
  tmpLoopBody();
}
const tmpReturnArg = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
$(tmpReturnArg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'outer'
 - 2: 'middle'
 - 3: 'inner'
 - 4: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
