# Preval test case

# forof.md

> Normalize > Dce > Continue > Forof
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
while ($(true)) {
  for (let x of [10, 20]) {
    continue;
    $('fail');
  }
}
$('after, wont eval due to infinite loop');
`````


## Settled


`````js filename=intro
while (true) {
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    const tmpCalleeParam /*:array*/ = [10, 20];
    const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
      const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        tmpForOfNext.value;
      }
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
    const tmpForOfGenNext = $forOf([10, 20]);
    while (true) {
      const tmpForOfNext = tmpForOfGenNext();
      if (tmpForOfNext.done) {
        break;
      } else {
        tmpForOfNext.value;
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
    const b = [ 10, 20 ];
    const c = $forOf( b );
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const d = c();
      const e = d.done;
      if (e) {
        break;
      }
      else {
        d.value;
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
    let tmpCalleeParam = [10, 20];
    const tmpForOfGenNext = $forOf(tmpCalleeParam);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpForOfNext = tmpForOfGenNext();
      const tmpIfTest$1 = tmpForOfNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        let x = tmpForOfNext.value;
      }
    }
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


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
