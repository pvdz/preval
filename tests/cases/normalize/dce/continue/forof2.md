# Preval test case

# forof2.md

> Normalize > Dce > Continue > Forof2
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
while ($(true)) {
  for (let x in {a: 1, b: 2}) {
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
    const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
    const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
    while ($LOOP_NO_UNROLLS_LEFT) {
      const tmpForInNext /*:unknown*/ = tmpForInGen();
      const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        tmpForInNext.value;
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
    const tmpForInGen = $forIn({ a: 1, b: 2 });
    while (true) {
      const tmpForInNext = tmpForInGen();
      if (tmpForInNext.done) {
        break;
      } else {
        tmpForInNext.value;
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
    const b = {
      a: 1,
      b: 2,
    };
    const c = $forIn( b );
    while ($LOOP_NO_UNROLLS_LEFT) {
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let tmpCalleeParam = { a: 1, b: 2 };
    const tmpForInGen = $forIn(tmpCalleeParam);
    while ($LOOP_NO_UNROLLS_LEFT) {
      const tmpForInNext = tmpForInGen();
      const tmpIfTest$1 = tmpForInNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        let x = tmpForInNext.value;
      }
    }
    $(`keep`);
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
