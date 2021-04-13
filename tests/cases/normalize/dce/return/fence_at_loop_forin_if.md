# Preval test case

# fence_at_loop_forin_if.md

> Normalize > Dce > Return > Fence at loop forin if
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x in {a: 1, b: 2}) {
      $('loop', x);
      if ($(1, 'if')) {
        $('pass');
        return $(100, 'return');
        $('fail');
      } else {
        $('do not visit');
        return $(101, 'return');
        $('fail');
      }
      $('fail -> DCE');
    }
  
    $('after (not invoked but should not be eliminated)');
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
    for (let x in { a: 1, b: 2 }) {
      $('loop', x);
      if ($(1, 'if')) {
        $('pass');
        return $(100, 'return');
        $('fail');
      } else {
        $('do not visit');
        return $(101, 'return');
        $('fail');
      }
      $('fail -> DCE');
    }
    $('after (not invoked but should not be eliminated)');
  }
  $('after (not invoked)');
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
      $('loop');
      const tmpForInDeclRhs = { a: 1, b: 2 };
      let x = undefined;
      for (x in tmpForInDeclRhs) {
        $('loop', x);
        const tmpIfTest$1 = $(1, 'if');
        if (tmpIfTest$1) {
          $('pass');
          const tmpReturnArg = $(100, 'return');
          tmpLoopRetCode = undefined;
          tmpLoopRetValue = tmpReturnArg;
          return undefined;
        } else {
          $('do not visit');
          const tmpReturnArg$1 = $(101, 'return');
          tmpLoopRetCode = undefined;
          tmpLoopRetValue = tmpReturnArg$1;
          return undefined;
        }
      }
      $('after (not invoked but should not be eliminated)');
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
    const tmpIfTest$3 = tmpLoopRetCode$1 === undefined;
    if (tmpIfTest$3) {
      return tmpLoopRetValue$1;
    } else {
      $('after (not invoked)');
      return undefined;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
  const tmpReturnArg$3 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
  return tmpReturnArg$3;
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
    $('loop');
    const tmpForInDeclRhs = { a: 1, b: 2 };
    let x = undefined;
    for (x in tmpForInDeclRhs) {
      $('loop', x);
      const tmpIfTest$1 = $(1, 'if');
      if (tmpIfTest$1) {
        $('pass');
        const tmpReturnArg = $(100, 'return');
        tmpLoopRetCode = undefined;
        tmpLoopRetValue = tmpReturnArg;
        return undefined;
      } else {
        $('do not visit');
        const tmpReturnArg$1 = $(101, 'return');
        tmpLoopRetCode = undefined;
        tmpLoopRetValue = tmpReturnArg$1;
        return undefined;
      }
    }
    $('after (not invoked but should not be eliminated)');
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
  const tmpIfTest$3 = tmpLoopRetCode$1 === undefined;
  if (tmpIfTest$3) {
    return tmpLoopRetValue$1;
  } else {
    $('after (not invoked)');
    return undefined;
  }
};
while (tmpLoopRetCode) {
  tmpLoopBody();
}
const tmpReturnArg$3 = tmpLoopTail(tmpLoopRetCode, tmpLoopRetValue);
$(tmpReturnArg$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 1, 'if'
 - 5: 'pass'
 - 6: 100, 'return'
 - 7: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
