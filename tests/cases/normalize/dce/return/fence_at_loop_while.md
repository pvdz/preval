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


## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
$inlinedFunction: {
  while (true) {
    const tmpIfTest /*:unknown*/ = $(true);
    if (tmpIfTest) {
      $(`loop`);
      const tmpIfTest$1 /*:unknown*/ = $(true);
      if (tmpIfTest$1) {
        $(`loop`);
        tmpCalleeParam = $(100, `return`);
        break $inlinedFunction;
      } else {
        $(`do not visit, do not eliminate`);
      }
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
}
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
$inlinedFunction: {
  while (true) {
    if ($(true)) {
      $(`loop`);
      if ($(true)) {
        $(`loop`);
        tmpCalleeParam = $(100, `return`);
        break $inlinedFunction;
      } else {
        $(`do not visit, do not eliminate`);
      }
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
}
$(tmpCalleeParam);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
$inlinedFunction: {
  while (true) {
    const b = $( true );
    if (b) {
      $( "loop" );
      const c = $( true );
      if (c) {
        $( "loop" );
        a = $( 100, "return" );
        break $inlinedFunction;
      }
      else {
        $( "do not visit, do not eliminate" );
      }
    }
    else {
      break;
    }
  }
  $( "after (not invoked)" );
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(`loop`);
      while (true) {
        const tmpIfTest$1 = $(true);
        if (tmpIfTest$1) {
          $(`loop`);
          const tmpReturnArg = $(100, `return`);
          return tmpReturnArg;
        } else {
          break;
        }
      }
      $(`do not visit, do not eliminate`);
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
