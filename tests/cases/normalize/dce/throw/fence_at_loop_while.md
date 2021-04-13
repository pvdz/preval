# Preval test case

# fence_at_loop_while.md

> Normalize > Dce > Throw > Fence at loop while
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
function f(){
  while ($(true)) {
    $('loop');
    
    while ($(true)) {
      $('loop');
      throw $(7, 'throw');
      $('fail');
    }
    
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
    while ($(true)) {
      $('loop');
      throw $(7, 'throw');
      $('fail');
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
      let tmpLoopRetCode = true;
      let tmpLoopRetValue = undefined;
      let tmpLoopBody = function () {
        debugger;
        const tmpIfTest$1 = $(true);
        if (tmpIfTest$1) {
          $('loop');
          const tmpThrowArg = $(7, 'throw');
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
      const tmpReturnArg = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
      tmpLoopRetCode$3 = undefined;
      tmpLoopRetValue$3 = tmpReturnArg;
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
  const tmpReturnArg$1 = tmpLoopTail$1(tmpLoopRetCode$3, tmpLoopRetValue$3);
  return tmpReturnArg$1;
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
  const tmpIfTest$3 = tmpLoopRetCode$1 === undefined;
  if (tmpIfTest$3) {
    return undefined;
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
    let tmpLoopRetCode = true;
    const tmpLoopBody = function () {
      debugger;
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        $('loop');
        const tmpThrowArg = $(7, 'throw');
        throw tmpThrowArg;
      } else {
        tmpLoopRetCode = false;
        return undefined;
      }
    };
    while (tmpLoopRetCode) {
      tmpLoopBody();
    }
    tmpLoopTail(tmpLoopRetCode);
    tmpLoopRetCode$3 = undefined;
    tmpLoopRetValue$3 = undefined;
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
const tmpReturnArg$1 = tmpLoopTail$1(tmpLoopRetCode$3, tmpLoopRetValue$3);
$(tmpReturnArg$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: true
 - 4: 'loop'
 - 5: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
