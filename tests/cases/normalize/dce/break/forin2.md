# Preval test case

# forin2.md

> Normalize > Dce > Break > Forin2
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
while ($(true)) {
  for (let x of [10, 20]) {
    break;
    $('fail');
  }
  $('keep');
}
$('after');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [10, 20];
  const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    $(`keep`);
  } else {
    tmpForOfNext.value;
    $(`keep`);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(true);
    if (tmpIfTest$2) {
      const tmpCalleeParam$1 /*:array*/ = [10, 20];
      const tmpForOfGen$1 /*:unknown*/ = $forOf(tmpCalleeParam$1);
      const tmpForOfNext$1 /*:unknown*/ = tmpForOfGen$1();
      const tmpIfTest$4 /*:unknown*/ = tmpForOfNext$1.done;
      if (tmpIfTest$4) {
        $(`keep`);
      } else {
        tmpForOfNext$1.value;
        $(`keep`);
      }
    } else {
      break;
    }
  }
  $(`after`);
} else {
  $(`after`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const tmpForOfGen = $forOf([10, 20]);
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    $(`keep`);
  } else {
    tmpForOfNext.value;
    $(`keep`);
  }
  while (true) {
    if ($(true)) {
      const tmpForOfGen$1 = $forOf([10, 20]);
      const tmpForOfNext$1 = tmpForOfGen$1();
      if (tmpForOfNext$1.done) {
        $(`keep`);
      } else {
        tmpForOfNext$1.value;
        $(`keep`);
      }
    } else {
      break;
    }
  }
  $(`after`);
} else {
  $(`after`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = [ 10, 20 ];
  const c = $forOf( b );
  const d = c();
  const e = d.done;
  if (e) {
    $( "keep" );
  }
  else {
    d.value;
    $( "keep" );
  }
  while ($LOOP_UNROLL_10) {
    const f = $( true );
    if (f) {
      const g = [ 10, 20 ];
      const h = $forOf( g );
      const i = h();
      const j = i.done;
      if (j) {
        $( "keep" );
      }
      else {
        i.value;
        $( "keep" );
      }
    }
    else {
      break;
    }
  }
  $( "after" );
}
else {
  $( "after" );
}
`````


## Todos triggered


None


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
