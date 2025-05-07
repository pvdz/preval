# Preval test case

# forin2.md

> Normalize > Dce > Continue > Forin2
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
  $('keep');
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
    $(`keep`);
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
    $(`keep`);
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
    $( "keep" );
  }
  else {
    break;
  }
}
$( "after, wont eval due to infinite loop" );
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'keep'
 - 3: true
 - 4: 'keep'
 - 5: true
 - 6: 'keep'
 - 7: true
 - 8: 'keep'
 - 9: true
 - 10: 'keep'
 - 11: true
 - 12: 'keep'
 - 13: true
 - 14: 'keep'
 - 15: true
 - 16: 'keep'
 - 17: true
 - 18: 'keep'
 - 19: true
 - 20: 'keep'
 - 21: true
 - 22: 'keep'
 - 23: true
 - 24: 'keep'
 - 25: true
 - 26: 'keep'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
