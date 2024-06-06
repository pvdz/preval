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
    $(`loop`);
    while (true) {
      {
        $(`loop`);
        return $(100, `return`);
        $(`fail`);
      }
      if ($(true)) {
      } else {
        break;
      }
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
      while (true) {
        $(`loop`);
        const tmpReturnArg = $(100, `return`);
        return tmpReturnArg;
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
    $(`loop`);
    const tmpReturnArg = $(100, `return`);
    return tmpReturnArg;
  } else {
    $(`after (not invoked)`);
    return undefined;
  }
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
    $( "loop" );
    const c = $( 100, "return" );
    return c;
  }
  else {
    $( "after (not invoked)" );
    return undefined;
  }
};
const d = a();
$( d );
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
