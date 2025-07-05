# Preval test case

# fence_at_loop_dowhile.md

> Normalize > Dce > Continue > Fence at loop dowhile
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  do {
    $('loop');
    continue;
    $('fail');
  } while ($(true));

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
    $(`loop`);
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
      while ($LOOP_UNROLLS_LEFT_10) {
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
    $( "loop" );
    const b = $( true );
    if (b) {
      while ($LOOP_UNROLLS_LEFT_10) {
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`loop`);
    while (true) {
      $(`loop`);
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
      } else {
        break;
      }
    }
    $(`infiloop, do not eliminate`);
  } else {
    break;
  }
}
$(`after (not invoked)`);
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
 - 4: true
 - 5: 'loop'
 - 6: true
 - 7: 'loop'
 - 8: true
 - 9: 'loop'
 - 10: true
 - 11: 'loop'
 - 12: true
 - 13: 'loop'
 - 14: true
 - 15: 'loop'
 - 16: true
 - 17: 'loop'
 - 18: true
 - 19: 'loop'
 - 20: true
 - 21: 'loop'
 - 22: true
 - 23: 'loop'
 - 24: true
 - 25: 'loop'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
