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
const tmpIfTest = $(true);
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
let tmpReturnArg$11 = undefined;
if (tmpIfTest) {
  $(`loop`);
  const tmpIfTest$10 = $(true);
  if (tmpIfTest$10) {
    $(`loop`);
    const tmpReturnArg$5 = $(100, `return`);
    tmpReturnArg$11 = tmpReturnArg$5;
  } else {
    $(`do not visit, do not eliminate`);
    const tmpClusterSSA_tmpIfTest$8 = $(true);
    const tmpReturnArg$9 = tmpAfterLabel(tmpClusterSSA_tmpIfTest$8, true);
    tmpReturnArg$11 = tmpReturnArg$9;
  }
} else {
  const tmpReturnArg$7 = tmpAfterLabel(tmpIfTest, false);
  tmpReturnArg$11 = tmpReturnArg$7;
}
$(tmpReturnArg$11);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
const b = function($$0,$$1 ) {
  let c = d;
  const e = f;
  debugger;
  if (e) {
    while ($LOOP_UNROLL_10) {
      if (c) {
        $( "loop" );
        const g = $( true );
        if (g) {
          $( "loop" );
          const h = $( 100, "return" );
          return h;
        }
        else {
          $( "do not visit, do not eliminate" );
          c = $( true );
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
let i = undefined;
if (a) {
  $( "loop" );
  const j = $( true );
  if (j) {
    $( "loop" );
    const k = $( 100, "return" );
    i = k;
  }
  else {
    $( "do not visit, do not eliminate" );
    const l = $( true );
    const m = b( l, true );
    i = m;
  }
}
else {
  const n = b( a, false );
  i = n;
}
$( i );
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
