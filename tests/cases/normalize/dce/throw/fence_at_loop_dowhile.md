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
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $('loop');
      let tmpDoWhileFlag = true;
      while (true) {
        let tmpIfTest$1 = tmpDoWhileFlag;
        if (tmpIfTest$1) {
        } else {
          tmpIfTest$1 = $(true);
        }
        if (tmpIfTest$1) {
          tmpDoWhileFlag = false;
          $('loop');
          const tmpThrowArg = $(7, 'throw');
          throw tmpThrowArg;
        } else {
          break;
        }
      }
      $('do not visit, do not eliminate');
    } else {
      break;
    }
  }
  $('after (not invoked)');
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $('loop');
    let tmpDoWhileFlag = true;
    while (true) {
      let tmpIfTest$1 = tmpDoWhileFlag;
      if (tmpDoWhileFlag) {
      } else {
        tmpIfTest$1 = $(true);
      }
      if (tmpIfTest$1) {
        tmpDoWhileFlag = false;
        $('loop');
        const tmpThrowArg = $(7, 'throw');
        throw tmpThrowArg;
      } else {
        break;
      }
    }
    $('do not visit, do not eliminate');
  } else {
    break;
  }
}
$('after (not invoked)');
$(undefined);
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
