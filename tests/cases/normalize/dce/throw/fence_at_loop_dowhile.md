# Preval test case

# fence_at_loop_dowhile.md

> Normalize > Dce > Throw > Fence at loop dowhile
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
function f(){
  while ($(true)) {
    $('loop');
    
    do {
      $('loop');
      throw $(7, 'throw');
      $('fail');
    } while ($(true));
    
    $('do not visit, do not eliminate');
  }
  $('after (not invoked)');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  while ($(true)) {
    $('loop');
    {
      let tmpDoWhileFlag = true;
      while (tmpDoWhileFlag || $(true)) {
        tmpDoWhileFlag = false;
        {
          $('loop');
          throw $(7, 'throw');
          $('fail');
        }
      }
    }
    $('do not visit, do not eliminate');
  }
  $('after (not invoked)');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpLoopRetCode$3 = true;
  let tmpLoopRetValue$3 = undefined;
  let tmpLoopBody$1 = function () {
    debugger;
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $('loop');
      let tmpDoWhileFlag = true;
      let tmpLoopRetCode = true;
      let tmpLoopRetValue = undefined;
      let tmpLoopBody = function () {
        debugger;
        let tmpIfTest$1 = tmpDoWhileFlag;
        const tmpBranchingA = function ($$0) {
          let tmpIfTest$3 = $$0;
          debugger;
          const tmpReturnArg = tmpBranchingC(tmpIfTest$3);
          return tmpReturnArg;
        };
        const tmpBranchingB = function ($$0) {
          let tmpIfTest$5 = $$0;
          debugger;
          tmpIfTest$5 = $(true);
          const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$5);
          return tmpReturnArg$1;
        };
        const tmpBranchingC = function ($$0) {
          let tmpIfTest$7 = $$0;
          debugger;
          if (tmpIfTest$7) {
            tmpDoWhileFlag = false;
            $('loop');
            const tmpThrowArg$1 = $(7, 'throw');
            throw tmpThrowArg$1;
          } else {
            tmpLoopRetCode = false;
            return undefined;
          }
        };
        if (tmpIfTest$1) {
          const tmpReturnArg$3 = tmpBranchingA(tmpIfTest$1);
          return tmpReturnArg$3;
        } else {
          const tmpReturnArg$5 = tmpBranchingB(tmpIfTest$1);
          return tmpReturnArg$5;
        }
      };
      let tmpLoopTail = function ($$0, $$1) {
        let tmpLoopRetCode$1 = $$0;
        let tmpLoopRetValue$1 = $$1;
        debugger;
        const tmpIfTest$9 = tmpLoopRetCode$1 === undefined;
        if (tmpIfTest$9) {
          return tmpLoopRetValue$1;
        } else {
          $('do not visit, do not eliminate');
        }
      };
      while (tmpLoopRetCode) {
        tmpLoopBody();
      }
      const tmpReturnArg$7 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
      tmpLoopRetCode$3 = undefined;
      tmpLoopRetValue$3 = tmpReturnArg$7;
      return undefined;
    } else {
      tmpLoopRetCode$3 = false;
      return undefined;
    }
  };
  let tmpLoopTail$1 = function ($$0, $$1) {
    let tmpLoopRetCode$5 = $$0;
    let tmpLoopRetValue$5 = $$1;
    debugger;
    const tmpIfTest$11 = tmpLoopRetCode$5 === undefined;
    if (tmpIfTest$11) {
      return tmpLoopRetValue$5;
    } else {
      $('after (not invoked)');
    }
  };
  while (tmpLoopRetCode$3) {
    tmpLoopBody$1();
  }
  const tmpReturnArg$9 = tmpLoopTail$1(tmpLoopRetCode$3, tmpLoopRetValue$3);
  return tmpReturnArg$9;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpLoopTail = function ($$0) {
  const tmpLoopRetCode$1 = $$0;
  debugger;
  const tmpIfTest$9 = tmpLoopRetCode$1 === undefined;
  if (tmpIfTest$9) {
    return undefined;
  } else {
    $('do not visit, do not eliminate');
  }
};
let tmpLoopRetCode$3 = true;
let tmpLoopRetValue$3 = undefined;
const tmpLoopBody$1 = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $('loop');
    let tmpDoWhileFlag = true;
    let tmpLoopRetCode = true;
    const tmpLoopBody = function () {
      debugger;
      const tmpIfTest$1 = tmpDoWhileFlag;
      const tmpBranchingC = function ($$0) {
        const tmpIfTest$7 = $$0;
        debugger;
        if (tmpIfTest$7) {
          tmpDoWhileFlag = false;
          $('loop');
          const tmpThrowArg$1 = $(7, 'throw');
          throw tmpThrowArg$1;
        } else {
          tmpLoopRetCode = false;
          return undefined;
        }
      };
      if (tmpIfTest$1) {
        const tmpReturnArg$3 = tmpBranchingC(tmpIfTest$1);
        return tmpReturnArg$3;
      } else {
        const tmpSSA_tmpIfTest$5 = $(true);
        const tmpReturnArg$1 = tmpBranchingC(tmpSSA_tmpIfTest$5);
        return tmpReturnArg$1;
      }
    };
    while (tmpLoopRetCode) {
      tmpLoopBody();
    }
    const tmpReturnArg$7 = tmpLoopTail(tmpLoopRetCode);
    tmpLoopRetCode$3 = undefined;
    tmpLoopRetValue$3 = tmpReturnArg$7;
    return undefined;
  } else {
    tmpLoopRetCode$3 = false;
    return undefined;
  }
};
const tmpLoopTail$1 = function ($$0, $$1) {
  const tmpLoopRetCode$5 = $$0;
  const tmpLoopRetValue$5 = $$1;
  debugger;
  const tmpIfTest$11 = tmpLoopRetCode$5 === undefined;
  if (tmpIfTest$11) {
    return tmpLoopRetValue$5;
  } else {
    $('after (not invoked)');
  }
};
while (tmpLoopRetCode$3) {
  tmpLoopBody$1();
}
const tmpReturnArg$9 = tmpLoopTail$1(tmpLoopRetCode$3, tmpLoopRetValue$3);
$(tmpReturnArg$9);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop'
 - 4: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
