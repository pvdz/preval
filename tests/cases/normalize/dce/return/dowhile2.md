# Preval test case

# dowhile2.md

> Normalize > Dce > Return > Dowhile2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  do {
    return $(1, 'return');
    $('fail');
  } while ($(true));
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let tmpDoWhileFlag = true;
    while (tmpDoWhileFlag || $(true)) {
      tmpDoWhileFlag = false;
      {
        return $(1, 'return');
        $('fail');
      }
    }
  }
  $('keep, do not eval');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpDoWhileFlag = true;
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    let tmpIfTest = tmpDoWhileFlag;
    const tmpBranchingA = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    };
    const tmpBranchingB = function () {
      debugger;
      tmpIfTest = $(true);
      const tmpReturnArg$5 = tmpBranchingC();
      return tmpReturnArg$5;
    };
    const tmpBranchingC = function () {
      debugger;
      if (tmpIfTest) {
        tmpDoWhileFlag = false;
        const tmpReturnArg$1 = $(1, 'return');
        tmpLoopRetCode = undefined;
        tmpLoopRetValue = tmpReturnArg$1;
        return undefined;
      } else {
        tmpLoopRetCode = false;
        return undefined;
      }
    };
    if (tmpIfTest) {
      const tmpReturnArg$7 = tmpBranchingA();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB();
      return tmpReturnArg$9;
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
  const tmpReturnArg$11 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
  return tmpReturnArg$11;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
let tmpLoopRetCode = true;
let tmpLoopRetValue = undefined;
const tmpLoopBody = function () {
  debugger;
  const tmpIfTest = tmpDoWhileFlag;
  const tmpBranchingC = function () {
    debugger;
    if (tmpIfelseifelse) {
      tmpDoWhileFlag = false;
      const tmpReturnArg$1 = $(1, 'return');
      tmpLoopRetCode = undefined;
      tmpLoopRetValue = tmpReturnArg$1;
      return undefined;
    } else {
      tmpLoopRetCode = false;
      return undefined;
    }
  };
  let tmpIfelseifelse = undefined;
  if (tmpIfTest) {
    tmpIfelseifelse = true;
    tmpBranchingC();
    return undefined;
  } else {
    tmpIfelseifelse = $(true);
    tmpBranchingC();
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
    return undefined;
  }
};
while (tmpLoopRetCode) {
  tmpLoopBody();
}
const tmpReturnArg$11 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
$(tmpReturnArg$11);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'return'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
