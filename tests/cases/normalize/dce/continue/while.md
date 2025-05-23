# Preval test case

# while.md

> Normalize > Dce > Continue > While
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
while ($(true)) {
  while ($(true)) {
    continue;
    $('fail');
  }
}
$('after, do not evaluate (infinite loop)');
`````


## Settled


`````js filename=intro
while (true) {
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
      while ($LOOP_UNROLL_10) {
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
$(`after, do not evaluate (infinite loop)`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  if ($(true)) {
    if ($(true)) {
      while (true) {
        if (!$(true)) {
          break;
        }
      }
    }
  } else {
    break;
  }
}
$(`after, do not evaluate (infinite loop)`);
`````


## PST Settled
With rename=true

`````js filename=intro
while (true) {
  const a = $( true );
  if (a) {
    const b = $( true );
    if (b) {
      while ($LOOP_UNROLL_10) {
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
$( "after, do not evaluate (infinite loop)" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    while (true) {
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
$(`after, do not evaluate (infinite loop)`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: true
 - 5: true
 - 6: true
 - 7: true
 - 8: true
 - 9: true
 - 10: true
 - 11: true
 - 12: true
 - 13: true
 - 14: true
 - 15: true
 - 16: true
 - 17: true
 - 18: true
 - 19: true
 - 20: true
 - 21: true
 - 22: true
 - 23: true
 - 24: true
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
