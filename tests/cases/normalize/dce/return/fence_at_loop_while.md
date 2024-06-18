# Preval test case

# fence_at_loop_while.md

> Normalize > Dce > Return > Fence at loop while
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
function f(){
  while ($(true)) {
    $('loop');
    
    while ($(true)) {
      $('loop');
      return $(100, 'return');
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
    $(`loop`);
    while ($(true)) {
      $(`loop`);
      return $(100, `return`);
      $(`fail`);
    }
    $(`do not visit, do not eliminate`);
  }
  $(`after (not invoked)`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let tmpIfTest = $(true);
  while (true) {
    if (tmpIfTest) {
      $(`loop`);
      let tmpIfTest$1 = $(true);
      while (true) {
        if (tmpIfTest$1) {
          $(`loop`);
          const tmpReturnArg = $(100, `return`);
          return tmpReturnArg;
        } else {
          break;
        }
      }
      $(`do not visit, do not eliminate`);
      tmpIfTest = $(true);
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
$inlinedFunction: {
  let tmpIfTest = $(true);
  while (true) {
    if (tmpIfTest) {
      $(`loop`);
      const tmpIfTest$1 = $(true);
      while (true) {
        if (tmpIfTest$1) {
          $(`loop`);
          const tmpReturnArg = $(100, `return`);
          tmpCalleeParam = tmpReturnArg;
          break $inlinedFunction;
        } else {
          break;
        }
      }
      $(`do not visit, do not eliminate`);
      tmpIfTest = $(true);
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
$inlinedFunction: {
  let b = $( true );
  while (true) {
    if (b) {
      $( "loop" );
      const c = $( true );
      while (true) {
        if (c) {
          $( "loop" );
          const d = $( 100, "return" );
          a = d;
          break $inlinedFunction;
        }
        else {
          break;
        }
      }
      $( "do not visit, do not eliminate" );
      b = $( true );
    }
    else {
      break;
    }
  }
  $( "after (not invoked)" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: true
 - 4: 'loop'
 - 5: 100, 'return'
 - 6: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
