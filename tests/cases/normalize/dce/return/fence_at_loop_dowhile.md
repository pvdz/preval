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
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`loop`);
  $(`loop`);
  const tmpCalleeParam /*:unknown*/ = $(100, `return`);
  $(tmpCalleeParam);
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
  $(`loop`);
  $($(100, `return`));
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
  $( "loop" );
  const b = $( 100, "return" );
  $( b );
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
 - 3: 'loop'
 - 4: 100, 'return'
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
