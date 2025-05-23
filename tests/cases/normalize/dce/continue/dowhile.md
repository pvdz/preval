# Preval test case

# dowhile.md

> Normalize > Dce > Continue > Dowhile
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) {
  do {
    $('loop');
    continue;
    $('fail');
  } while ($(true));
}
$('after, wont eval due to infinite loop');
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
    } else {
    }
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
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
    }
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
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
    }
  }
  else {
    break;
  }
}
$( "after, wont eval due to infinite loop" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    while (true) {
      $(`loop`);
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
      } else {
        break;
      }
    }
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
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
