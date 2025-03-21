# Preval test case

# fence_at_loop_while.md

> Normalize > Dce > Break > Fence at loop while
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  while ($(true)) {
    $('loop');
    break;
    $('fail');
  }

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`loop`);
  const tmpIfTest$1 /*:unknown*/ = $(true);
  if (tmpIfTest$1) {
    $(`loop`);
    $(`infiloop, do not eliminate`);
  } else {
    $(`infiloop, do not eliminate`);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(true);
    if (tmpIfTest$2) {
      $(`loop`);
      const tmpIfTest$4 /*:unknown*/ = $(true);
      if (tmpIfTest$4) {
        $(`loop`);
        $(`infiloop, do not eliminate`);
      } else {
        $(`infiloop, do not eliminate`);
      }
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
} else {
  $(`after (not invoked)`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`loop`);
  if ($(true)) {
    $(`loop`);
    $(`infiloop, do not eliminate`);
  } else {
    $(`infiloop, do not eliminate`);
  }
  while (true) {
    if ($(true)) {
      $(`loop`);
      if ($(true)) {
        $(`loop`);
        $(`infiloop, do not eliminate`);
      } else {
        $(`infiloop, do not eliminate`);
      }
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
} else {
  $(`after (not invoked)`);
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
    $( "infiloop, do not eliminate" );
  }
  else {
    $( "infiloop, do not eliminate" );
  }
  while ($LOOP_UNROLL_10) {
    const c = $( true );
    if (c) {
      $( "loop" );
      const d = $( true );
      if (d) {
        $( "loop" );
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
}
else {
  $( "after (not invoked)" );
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
 - 3: true
 - 4: 'loop'
 - 5: 'infiloop, do not eliminate'
 - 6: true
 - 7: 'loop'
 - 8: true
 - 9: 'loop'
 - 10: 'infiloop, do not eliminate'
 - 11: true
 - 12: 'loop'
 - 13: true
 - 14: 'loop'
 - 15: 'infiloop, do not eliminate'
 - 16: true
 - 17: 'loop'
 - 18: true
 - 19: 'loop'
 - 20: 'infiloop, do not eliminate'
 - 21: true
 - 22: 'loop'
 - 23: true
 - 24: 'loop'
 - 25: 'infiloop, do not eliminate'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
