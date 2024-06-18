# Preval test case

# fence_at_loop_while.md

> Normalize > Dce > Throw > Fence at loop while
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

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
    $(`loop`);
    while ($(true)) {
      $(`loop`);
      throw $(7, `throw`);
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
          const tmpThrowArg = $(7, `throw`);
          throw tmpThrowArg;
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
if (tmpIfTest) {
  $(`loop`);
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    $(`loop`);
    const tmpThrowArg = $(7, `throw`);
    throw tmpThrowArg;
  } else {
    $(`do not visit, do not eliminate`);
    let tmpClusterSSA_tmpIfTest = $(true);
    while ($LOOP_UNROLL_10) {
      if (tmpClusterSSA_tmpIfTest) {
        $(`loop`);
        const tmpIfTest$2 = $(true);
        if (tmpIfTest$2) {
          $(`loop`);
          const tmpThrowArg$1 = $(7, `throw`);
          throw tmpThrowArg$1;
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
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "loop" );
  const b = $( true );
  if (b) {
    $( "loop" );
    const c = $( 7, "throw" );
    throw c;
  }
  else {
    $( "do not visit, do not eliminate" );
    let d = $( true );
    while ($LOOP_UNROLL_10) {
      if (d) {
        $( "loop" );
        const e = $( true );
        if (e) {
          $( "loop" );
          const f = $( 7, "throw" );
          throw f;
        }
        else {
          $( "do not visit, do not eliminate" );
          d = $( true );
        }
      }
      else {
        break;
      }
    }
  }
}
$( "after (not invoked)" );
$( undefined );
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
