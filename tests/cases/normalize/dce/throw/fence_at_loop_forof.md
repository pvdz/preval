# Preval test case

# fence_at_loop_forof.md

> Normalize > Dce > Throw > Fence at loop forof
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x of [1, 2]) {
      $('loop', x);
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
  const tmpCalleeParam /*:array*/ = [1, 2];
  const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    $(`do not visit, do not eliminate`);
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        $(`loop`);
        const tmpCalleeParam$1 /*:array*/ = [1, 2];
        const tmpForOfGen$1 /*:unknown*/ = $forOf(tmpCalleeParam$1);
        const tmpForOfNext$1 /*:unknown*/ = tmpForOfGen$1.next();
        const tmpIfTest$4 /*:unknown*/ = tmpForOfNext$1.done;
        if (tmpIfTest$4) {
          $(`do not visit, do not eliminate`);
        } else {
          const x$1 /*:unknown*/ = tmpForOfNext$1.value;
          $(`loop`, x$1);
          const tmpThrowArg$1 /*:unknown*/ = $(7, `throw`);
          throw tmpThrowArg$1;
        }
      } else {
        break;
      }
    }
    $(`after (not invoked)`);
    $(undefined);
  } else {
    const x /*:unknown*/ = tmpForOfNext.value;
    $(`loop`, x);
    const tmpThrowArg /*:unknown*/ = $(7, `throw`);
    throw tmpThrowArg;
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
  const tmpForOfNext = $forOf([1, 2]).next();
  if (tmpForOfNext.done) {
    $(`do not visit, do not eliminate`);
    while (true) {
      if ($(true)) {
        $(`loop`);
        const tmpForOfNext$1 = $forOf([1, 2]).next();
        if (tmpForOfNext$1.done) {
          $(`do not visit, do not eliminate`);
        } else {
          $(`loop`, tmpForOfNext$1.value);
          const tmpThrowArg$1 = $(7, `throw`);
          throw tmpThrowArg$1;
        }
      } else {
        break;
      }
    }
    $(`after (not invoked)`);
    $(undefined);
  } else {
    $(`loop`, tmpForOfNext.value);
    const tmpThrowArg = $(7, `throw`);
    throw tmpThrowArg;
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
  const b = [ 1, 2 ];
  const c = $forOf( b );
  const d = c.next();
  const e = d.done;
  if (e) {
    $( "do not visit, do not eliminate" );
    while ($LOOP_UNROLL_10) {
      const f = $( true );
      if (f) {
        $( "loop" );
        const g = [ 1, 2 ];
        const h = $forOf( g );
        const i = h.next();
        const j = i.done;
        if (j) {
          $( "do not visit, do not eliminate" );
        }
        else {
          const k = i.value;
          $( "loop", k );
          const l = $( 7, "throw" );
          throw l;
        }
      }
      else {
        break;
      }
    }
    $( "after (not invoked)" );
    $( undefined );
  }
  else {
    const m = d.value;
    $( "loop", m );
    const n = $( 7, "throw" );
    throw n;
  }
}
else {
  $( "after (not invoked)" );
  $( undefined );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 1
 - 4: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
