# Preval test case

# fence_at_loop_dowhile.md

> Normalize > Dce > Return > Fence at loop dowhile
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
      return $(100, 'return');
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
          return $(100, 'return');
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
        const tmpBranchingA = function () {
          debugger;
          const tmpReturnArg$3 = tmpBranchingC();
          return tmpReturnArg$3;
        };
        const tmpBranchingB = function () {
          debugger;
          tmpIfTest$1 = $(true);
          const tmpReturnArg$5 = tmpBranchingC();
          return tmpReturnArg$5;
        };
        const tmpBranchingC = function () {
          debugger;
          if (tmpIfTest$1) {
            tmpDoWhileFlag = false;
            $('loop');
            const tmpReturnArg$1 = $(100, 'return');
            tmpLoopRetCode = undefined;
            tmpLoopRetValue = tmpReturnArg$1;
            return undefined;
          } else {
            tmpLoopRetCode = false;
            return undefined;
          }
        };
        if (tmpIfTest$1) {
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
        const tmpIfTest$3 = tmpLoopRetCode$1 === undefined;
        if (tmpIfTest$3) {
          return tmpLoopRetValue$1;
        } else {
          $('do not visit, do not eliminate');
          return undefined;
        }
      };
      while (tmpLoopRetCode) {
        tmpLoopBody();
      }
      const tmpReturnArg$11 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
      tmpLoopRetCode$3 = undefined;
      tmpLoopRetValue$3 = tmpReturnArg$11;
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
    const tmpIfTest$5 = tmpLoopRetCode$5 === undefined;
    if (tmpIfTest$5) {
      return tmpLoopRetValue$5;
    } else {
      $('after (not invoked)');
      return undefined;
    }
  };
  while (tmpLoopRetCode$3) {
    tmpLoopBody$1();
  }
  const tmpReturnArg$13 = tmpLoopTail$1(tmpLoopRetCode$3, tmpLoopRetValue$3);
  return tmpReturnArg$13;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpLoopTail = function ($$0, $$1) {
  const tmpLoopRetCode$1 = $$0;
  const tmpLoopRetValue$1 = $$1;
  debugger;
  const tmpIfTest$3 = tmpLoopRetCode$1 === undefined;
  if (tmpIfTest$3) {
    return tmpLoopRetValue$1;
  } else {
    $('do not visit, do not eliminate');
    return undefined;
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
    let tmpLoopRetValue = undefined;
    const tmpLoopBody = function () {
      debugger;
      const tmpIfTest$1 = tmpDoWhileFlag;
      const tmpBranchingC = function () {
        debugger;
        if (tmpIfelseifelse) {
          tmpDoWhileFlag = false;
          $('loop');
          const tmpReturnArg$1 = $(100, 'return');
          tmpLoopRetCode = undefined;
          tmpLoopRetValue = tmpReturnArg$1;
          return undefined;
        } else {
          tmpLoopRetCode = false;
          return undefined;
        }
      };
      let tmpIfelseifelse = undefined;
      if (tmpIfTest$1) {
        tmpIfelseifelse = true;
        tmpBranchingC();
        return undefined;
      } else {
        tmpIfelseifelse = $(true);
        tmpBranchingC();
        return undefined;
      }
    };
    while (tmpLoopRetCode) {
      tmpLoopBody();
    }
    const tmpReturnArg$11 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
    tmpLoopRetCode$3 = undefined;
    tmpLoopRetValue$3 = tmpReturnArg$11;
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
  const tmpIfTest$5 = tmpLoopRetCode$5 === undefined;
  if (tmpIfTest$5) {
    return tmpLoopRetValue$5;
  } else {
    $('after (not invoked)');
    return undefined;
  }
};
while (tmpLoopRetCode$3) {
  tmpLoopBody$1();
}
const tmpReturnArg$13 = tmpLoopTail$1(tmpLoopRetCode$3, tmpLoopRetValue$3);
$(tmpReturnArg$13);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop'
 - 4: 100, 'return'
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
