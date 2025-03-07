# Preval test case

# fence_at_loop_dowhile.md

> Normalize > Dce > Return > Fence at loop dowhile
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

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

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`loop`);
  $(`loop`);
  const tmpReturnArg /*:unknown*/ = $(100, `return`);
  tmpCalleeParam = tmpReturnArg;
} else {
  $(`after (not invoked)`);
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
if ($(true)) {
  $(`loop`);
  $(`loop`);
  tmpCalleeParam = $(100, `return`);
} else {
  $(`after (not invoked)`);
}
$(tmpCalleeParam);
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
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(`loop`);
      while (true) {
        $(`loop`);
        const tmpReturnArg = $(100, `return`);
        return tmpReturnArg;
      }
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( true );
if (b) {
  $( "loop" );
  $( "loop" );
  const c = $( 100, "return" );
  a = c;
}
else {
  $( "after (not invoked)" );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop'
 - 4: 100, 'return'
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
