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


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`loop`);
  const tmpIfTest$1 /*:unknown*/ = $(true);
  if (tmpIfTest$1) {
    $(`loop`);
    const tmpThrowArg /*:unknown*/ = $(7, `throw`);
    throw tmpThrowArg;
  } else {
    $(`do not visit, do not eliminate`);
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        $(`loop`);
        const tmpIfTest$4 /*:unknown*/ = $(true);
        if (tmpIfTest$4) {
          $(`loop`);
          const tmpThrowArg$1 /*:unknown*/ = $(7, `throw`);
          throw tmpThrowArg$1;
        } else {
          $(`do not visit, do not eliminate`);
        }
      } else {
        break;
      }
    }
    $(`after (not invoked)`);
    $(undefined);
  }
} else {
  $(`after (not invoked)`);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`loop`);
  if ($(true)) {
    $(`loop`);
    const tmpThrowArg = $(7, `throw`);
    throw tmpThrowArg;
  } else {
    $(`do not visit, do not eliminate`);
    while (true) {
      if ($(true)) {
        $(`loop`);
        if ($(true)) {
          $(`loop`);
          const tmpThrowArg$1 = $(7, `throw`);
          throw tmpThrowArg$1;
        } else {
          $(`do not visit, do not eliminate`);
        }
      } else {
        break;
      }
    }
    $(`after (not invoked)`);
    $(undefined);
  }
} else {
  $(`after (not invoked)`);
  $(undefined);
}
`````


## PST Settled
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
    while ($LOOP_UNROLL_10) {
      const d = $( true );
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
        }
      }
      else {
        break;
      }
    }
    $( "after (not invoked)" );
    $( undefined );
  }
}
else {
  $( "after (not invoked)" );
  $( undefined );
}
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
          const tmpThrowArg = $(7, `throw`);
          throw tmpThrowArg;
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


- (todo) support WhileStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: true
 - 4: 'loop'
 - 5: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
