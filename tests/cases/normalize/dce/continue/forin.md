# Preval test case

# forin.md

> Normalize > Dce > Continue > Forin
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
