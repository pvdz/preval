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
let tmpIfTest = $(true);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  $(`loop`);
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    $(`loop`);
    const tmpThrowArg = $(7, `throw`);
    throw tmpThrowArg;
  } else {
    $(`do not visit, do not eliminate`);
    tmpIfTest = $(true);
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      $(`loop`);
      const tmpIfTest$2 = $(true);
      if (tmpIfTest$2) {
        $(`loop`);
        const tmpThrowArg$1 = $(7, `throw`);
        throw tmpThrowArg$1;
      } else {
        $(`do not visit, do not eliminate`);
        tmpIfTest = $(true);
      }
    } else {
      break;
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
let a = $( true );
let b = true;
if (a) {
  $( "loop" );
  const c = $( true );
  if (c) {
    $( "loop" );
    const d = $( 7, "throw" );
    throw d;
  }
  else {
    $( "do not visit, do not eliminate" );
    a = $( true );
  }
}
else {
  b = false;
}
if (b) {
  while ($LOOP_UNROLL_10) {
    if (a) {
      $( "loop" );
      const e = $( true );
      if (e) {
        $( "loop" );
        const f = $( 7, "throw" );
        throw f;
      }
      else {
        $( "do not visit, do not eliminate" );
        a = $( true );
      }
    }
    else {
      break;
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
