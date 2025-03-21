# Preval test case

# fence_at_loop_while.md

> Normalize > Dce > Continue > Fence at loop while
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  while ($(true)) {
    $('loop');
    continue;
    $('fail');
  }

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````


## Settled


`````js filename=intro
while (true) {
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(`loop`);
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
      while ($LOOP_UNROLL_10) {
        $(`loop`);
        const tmpIfTest$2 /*:unknown*/ = $(true);
        if (tmpIfTest$2) {
        } else {
          break;
        }
      }
      $(`infiloop, do not eliminate`);
    } else {
      $(`infiloop, do not eliminate`);
    }
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  if ($(true)) {
    $(`loop`);
    if ($(true)) {
      while (true) {
        $(`loop`);
        if (!$(true)) {
          break;
        }
      }
      $(`infiloop, do not eliminate`);
    } else {
      $(`infiloop, do not eliminate`);
    }
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````


## PST Settled
With rename=true

`````js filename=intro
while (true) {
  const a = $( true );
  if (a) {
    $( "loop" );
    const b = $( true );
    if (b) {
      while ($LOOP_UNROLL_10) {
        $( "loop" );
        const c = $( true );
        if (c) {

        }
        else {
          break;
        }
      }
      $( "infiloop, do not eliminate" );
    }
    else {
      $( "infiloop, do not eliminate" );
    }
  }
  else {
    break;
  }
}
$( "after (not invoked)" );
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
 - 5: true
 - 6: 'loop'
 - 7: true
 - 8: 'loop'
 - 9: true
 - 10: 'loop'
 - 11: true
 - 12: 'loop'
 - 13: true
 - 14: 'loop'
 - 15: true
 - 16: 'loop'
 - 17: true
 - 18: 'loop'
 - 19: true
 - 20: 'loop'
 - 21: true
 - 22: 'loop'
 - 23: true
 - 24: 'loop'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
