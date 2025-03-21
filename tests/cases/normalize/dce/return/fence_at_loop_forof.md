# Preval test case

# fence_at_loop_forof.md

> Normalize > Dce > Return > Fence at loop forof
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x of [1, 2]) {
      $('loop', x);
      return $(100, 'return');
      $('unreachable');
    }
  
    $('unreachable2 (but keep because the for body may not be visited...)');
  }
  $('unreachable3');
}
$(f());
`````


## Settled


`````js filename=intro
let tmpCalleeParam$1 /*:unknown*/ = undefined;
$inlinedFunction: {
  while (true) {
    const tmpIfTest /*:unknown*/ = $(true);
    if (tmpIfTest) {
      $(`loop`);
      const tmpCalleeParam /*:array*/ = [1, 2];
      const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
      const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
      const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
      if (tmpIfTest$1) {
        $(`unreachable2 (but keep because the for body may not be visited...)`);
      } else {
        const x /*:unknown*/ = tmpForOfNext.value;
        $(`loop`, x);
        const tmpReturnArg /*:unknown*/ = $(100, `return`);
        tmpCalleeParam$1 = tmpReturnArg;
        break $inlinedFunction;
      }
    } else {
      break;
    }
  }
  $(`unreachable3`);
}
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam$1 = undefined;
$inlinedFunction: {
  while (true) {
    if ($(true)) {
      $(`loop`);
      const tmpForOfNext = $forOf([1, 2]).next();
      if (tmpForOfNext.done) {
        $(`unreachable2 (but keep because the for body may not be visited...)`);
      } else {
        $(`loop`, tmpForOfNext.value);
        tmpCalleeParam$1 = $(100, `return`);
        break $inlinedFunction;
      }
    } else {
      break;
    }
  }
  $(`unreachable3`);
}
$(tmpCalleeParam$1);
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
      const c = [ 1, 2 ];
      const d = $forOf( c );
      const e = d.next();
      const f = e.done;
      if (f) {
        $( "unreachable2 (but keep because the for body may not be visited...)" );
      }
      else {
        const g = e.value;
        $( "loop", g );
        const h = $( 100, "return" );
        a = h;
        break $inlinedFunction;
      }
    }
    else {
      break;
    }
  }
  $( "unreachable3" );
}
$( a );
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
 - 4: 100, 'return'
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
