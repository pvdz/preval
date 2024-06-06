# Preval test case

# fence_at_loop_while.md

> Normalize > Dce > Return > Fence at loop while
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
const f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`loop`);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(`loop`);
      const tmpReturnArg = $(100, `return`);
      return tmpReturnArg;
    } else {
      $(`do not visit, do not eliminate`);
      let tmpClusterSSA_tmpIfTest = $(true);
      while ($LOOP_UNROLL_10) {
        if (tmpClusterSSA_tmpIfTest) {
          $(`loop`);
          const tmpIfTest$2 = $(true);
          if (tmpIfTest$2) {
            $(`loop`);
            const tmpReturnArg$1 = $(100, `return`);
            return tmpReturnArg$1;
          } else {
            $(`do not visit, do not eliminate`);
            tmpClusterSSA_tmpIfTest = $(true);
          }
        } else {
          break;
        }
      }
    }
  } else {
  }
  $(`after (not invoked)`);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( true );
  if (b) {
    $( "loop" );
    const c = $( true );
    if (c) {
      $( "loop" );
      const d = $( 100, "return" );
      return d;
    }
    else {
      $( "do not visit, do not eliminate" );
      let e = $( true );
      while ($LOOP_UNROLL_10) {
        if (e) {
          $( "loop" );
          const f = $( true );
          if (f) {
            $( "loop" );
            const g = $( 100, "return" );
            return g;
          }
          else {
            $( "do not visit, do not eliminate" );
            e = $( true );
          }
        }
        else {
          break;
        }
      }
    }
  }
  $( "after (not invoked)" );
  return undefined;
};
const h = a();
$( h );
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
