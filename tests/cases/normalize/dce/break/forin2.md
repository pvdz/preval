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
  const tmpCalleeParam /*:array*/ /*truthy*/ = [10, 20];
  const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    $(`keep`);
  } else {
    tmpForOfNext.value;
    $(`keep`);
  }
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$2 /*:unknown*/ = $(true);
    if (tmpIfTest$2) {
      const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [10, 20];
      const tmpForOfGenNext$1 /*:unknown*/ = $forOf(tmpCalleeParam$1);
      const tmpForOfNext$1 /*:unknown*/ = tmpForOfGenNext$1();
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
  const tmpForOfGenNext = $forOf([10, 20]);
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    $(`keep`);
  } else {
    tmpForOfNext.value;
    $(`keep`);
  }
  while (true) {
    if ($(true)) {
      const tmpForOfGenNext$1 = $forOf([10, 20]);
      const tmpForOfNext$1 = tmpForOfGenNext$1();
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
  while ($LOOP_UNROLLS_LEFT_10) {
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let tmpCalleeParam = [10, 20];
    const tmpForOfGenNext = $forOf(tmpCalleeParam);
    while ($LOOP_NO_UNROLLS_LEFT) {
      const tmpForOfNext = tmpForOfGenNext();
      const tmpIfTest$1 = tmpForOfNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        let x = tmpForOfNext.value;
        break;
      }
    }
    $(`keep`);
  } else {
    break;
  }
}
$(`after`);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes


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
