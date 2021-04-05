# Preval test case

# dowhile1.md

> Normalize > Dce > Return > Dowhile1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  do {
    return $(1, 'return');
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
    const tmpBranchingA = function ($$0) {
      let tmpIfTest$1 = $$0;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(tmpIfTest$1);
      return tmpReturnArg$3;
    };
    const tmpBranchingB = function ($$0) {
      let tmpIfTest$3 = $$0;
      debugger;
      tmpIfTest$3 = $(true);
      const tmpReturnArg$5 = tmpBranchingC(tmpIfTest$3);
      return tmpReturnArg$5;
    };
    const tmpBranchingC = function ($$0) {
      let tmpIfTest$5 = $$0;
      debugger;
      if (tmpIfTest$5) {
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
      const tmpReturnArg$7 = tmpBranchingA(tmpIfTest);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB(tmpIfTest);
      return tmpReturnArg$9;
    }
  };
  let tmpLoopTail = function ($$0, $$1) {
    let tmpLoopRetCode$1 = $$0;
    let tmpLoopRetValue$1 = $$1;
    debugger;
    const tmpIfTest$7 = tmpLoopRetCode$1 === undefined;
    if (tmpIfTest$7) {
      return tmpLoopRetValue$1;
    } else {
      $('keep, do not eval');
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
const tmpBranchingC = function ($$0) {
  const tmpIfTest$5 = $$0;
  debugger;
  if (tmpIfTest$5) {
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
let tmpDoWhileFlag = true;
let tmpLoopRetCode = true;
let tmpLoopRetValue = undefined;
const tmpLoopBody = function () {
  debugger;
  const tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingC(tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpSSA_tmpIfTest$3 = $(true);
    const tmpReturnArg$5 = tmpBranchingC(tmpSSA_tmpIfTest$3);
    return tmpReturnArg$5;
  }
};
const tmpLoopTail = function ($$0, $$1) {
  const tmpLoopRetCode$1 = $$0;
  const tmpLoopRetValue$1 = $$1;
  debugger;
  const tmpIfTest$7 = tmpLoopRetCode$1 === undefined;
  if (tmpIfTest$7) {
    return tmpLoopRetValue$1;
  } else {
    $('keep, do not eval');
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
