# Preval test case

# dowhile.md

> Normalize > Dce > Throw > Dowhile
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  do {
    throw $(1, 'throw');
    $('fail');
  } while ($(true));
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
        throw $(1, 'throw');
        $('fail');
      }
    }
  }
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
    const tmpBranchingA = function ($$0) {
      let tmpIfTest$1 = $$0;
      debugger;
      const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
      return tmpReturnArg;
    };
    const tmpBranchingB = function ($$0) {
      let tmpIfTest$3 = $$0;
      debugger;
      tmpIfTest$3 = $(true);
      const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$3);
      return tmpReturnArg$1;
    };
    const tmpBranchingC = function ($$0) {
      let tmpIfTest$5 = $$0;
      debugger;
      if (tmpIfTest$5) {
        tmpDoWhileFlag = false;
        const tmpThrowArg$1 = $(1, 'throw');
        throw tmpThrowArg$1;
      } else {
        tmpLoopRetCode = false;
        return undefined;
      }
    };
    if (tmpIfTest) {
      const tmpReturnArg$3 = tmpBranchingA(tmpIfTest);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = tmpBranchingB(tmpIfTest);
      return tmpReturnArg$5;
    }
  };
  let tmpLoopTail = function ($$0, $$1) {
    let tmpLoopRetCode$1 = $$0;
    let tmpLoopRetValue$1 = $$1;
    debugger;
    const tmpIfTest$7 = tmpLoopRetCode$1 === undefined;
    if (tmpIfTest$7) {
      return tmpLoopRetValue$1;
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
const tmpBranchingC = function ($$0) {
  const tmpIfTest$5 = $$0;
  debugger;
  if (tmpIfTest$5) {
    tmpDoWhileFlag = false;
    const tmpThrowArg$1 = $(1, 'throw');
    throw tmpThrowArg$1;
  } else {
    tmpLoopRetCode = false;
    return undefined;
  }
};
let tmpDoWhileFlag = true;
let tmpLoopRetCode = true;
const tmpLoopBody = function () {
  debugger;
  const tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingC(tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpSSA_tmpIfTest$3 = $(true);
    const tmpReturnArg$1 = tmpBranchingC(tmpSSA_tmpIfTest$3);
    return tmpReturnArg$1;
  }
};
const tmpLoopTail = function ($$0) {
  const tmpLoopRetCode$1 = $$0;
  debugger;
  const tmpIfTest$7 = tmpLoopRetCode$1 === undefined;
  if (tmpIfTest$7) {
    return undefined;
  }
};
while (tmpLoopRetCode) {
  tmpLoopBody();
}
const tmpReturnArg$7 = tmpLoopTail(tmpLoopRetCode);
$(tmpReturnArg$7);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
