# Preval test case

# dowhile1.md

> Normalize > Dce > Throw > Dowhile1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  do {
    throw $(1, 'return');
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
        throw $(1, 'return');
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
      const tmpReturnArg = tmpBranchingC();
      return tmpReturnArg;
    };
    const tmpBranchingB = function () {
      debugger;
      tmpIfTest = $(true);
      const tmpReturnArg$1 = tmpBranchingC();
      return tmpReturnArg$1;
    };
    const tmpBranchingC = function () {
      debugger;
      if (tmpIfTest) {
        tmpDoWhileFlag = false;
        const tmpThrowArg$1 = $(1, 'return');
        throw tmpThrowArg$1;
      } else {
        tmpLoopRetCode = false;
        return undefined;
      }
    };
    if (tmpIfTest) {
      const tmpReturnArg$3 = tmpBranchingA();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = tmpBranchingB();
      return tmpReturnArg$5;
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
  const tmpReturnArg$7 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
  return tmpReturnArg$7;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
let tmpLoopRetCode = true;
const tmpLoopBody = function () {
  debugger;
  let tmpIfTest = tmpDoWhileFlag;
  const tmpBranchingC = function () {
    debugger;
    if (tmpIfTest) {
      tmpDoWhileFlag = false;
      const tmpThrowArg$1 = $(1, 'return');
      throw tmpThrowArg$1;
    } else {
      tmpLoopRetCode = false;
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    tmpIfTest = $(true);
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
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
 - 1: 1, 'return'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
