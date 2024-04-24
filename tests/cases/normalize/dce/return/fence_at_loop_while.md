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
const tmpAfterLabel = function ($$0, $$1) {
  let tmpIfTest$4 = $$0;
  const $tmpLoopUnrollCheck$1 = $$1;
  debugger;
  if ($tmpLoopUnrollCheck$1) {
    while ($LOOP_UNROLL_10) {
      if (tmpIfTest$4) {
        $(`loop`);
        const tmpIfTest$6 = $(true);
        if (tmpIfTest$6) {
          $(`loop`);
          const tmpReturnArg$3 = $(100, `return`);
          return tmpReturnArg$3;
        } else {
          $(`do not visit, do not eliminate`);
          tmpIfTest$4 = $(true);
        }
      } else {
        break;
      }
    }
  } else {
  }
  $(`after (not invoked)`);
  return undefined;
};
const f = function () {
  debugger;
  let tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`loop`);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(`loop`);
      const tmpReturnArg = $(100, `return`);
      return tmpReturnArg;
    } else {
      $(`do not visit, do not eliminate`);
      tmpIfTest = $(true);
      const tmpReturnArg$7 = tmpAfterLabel(tmpIfTest, true);
      return tmpReturnArg$7;
    }
  } else {
    const tmpReturnArg$5 = tmpAfterLabel(tmpIfTest, false);
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  let b = c;
  const d = e;
  debugger;
  if (d) {
    while ($LOOP_UNROLL_10) {
      if (b) {
        $( "loop" );
        const f = $( true );
        if (f) {
          $( "loop" );
          const g = $( 100, "return" );
          return g;
        }
        else {
          $( "do not visit, do not eliminate" );
          b = $( true );
        }
      }
      else {
        break;
      }
    }
  }
  $( "after (not invoked)" );
  return undefined;
};
const h = function() {
  debugger;
  let i = $( true );
  if (i) {
    $( "loop" );
    const j = $( true );
    if (j) {
      $( "loop" );
      const k = $( 100, "return" );
      return k;
    }
    else {
      $( "do not visit, do not eliminate" );
      i = $( true );
      const l = a( i, true );
      return l;
    }
  }
  else {
    const m = a( i, false );
    return m;
  }
};
const n = h();
$( n );
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
