# Preval test case

# forof.md

> Normalize > Dce > Break > Forof
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
}
$('after');
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [10, 20];
  const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
  } else {
    tmpForOfNext.value;
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(true);
    if (tmpIfTest$2) {
      const tmpCalleeParam$1 /*:array*/ = [10, 20];
      const tmpForOfGen$1 /*:unknown*/ = $forOf(tmpCalleeParam$1);
      const tmpForOfNext$1 /*:unknown*/ = tmpForOfGen$1.next();
      const tmpIfTest$4 /*:unknown*/ = tmpForOfNext$1.done;
      if (tmpIfTest$4) {
      } else {
        tmpForOfNext$1.value;
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
  const tmpForOfNext = $forOf([10, 20]).next();
  if (!tmpForOfNext.done) {
    tmpForOfNext.value;
  }
  while (true) {
    if ($(true)) {
      const tmpForOfNext$1 = $forOf([10, 20]).next();
      if (!tmpForOfNext$1.done) {
        tmpForOfNext$1.value;
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

## Pre Normal


`````js filename=intro
while ($(true)) {
  {
    let tmpForOfGen = $forOf([10, 20]);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForOfNext = tmpForOfGen.next();
      if (tmpForOfNext.done) {
        break;
      } else {
        let x = tmpForOfNext.value;
        {
          break;
          $(`fail`);
        }
      }
    }
  }
}
$(`after`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpCalleeParam = [10, 20];
    let tmpForOfGen = $forOf(tmpCalleeParam);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForOfNext = tmpForOfGen.next();
      const tmpIfTest$1 = tmpForOfNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        let x = tmpForOfNext.value;
        break;
      }
    }
  } else {
    break;
  }
}
$(`after`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = [ 10, 20 ];
  const c = $forOf( b );
  const d = c.next();
  const e = d.done;
  if (e) {

  }
  else {
    d.value;
  }
  while ($LOOP_UNROLL_10) {
    const f = $( true );
    if (f) {
      const g = [ 10, 20 ];
      const h = $forOf( g );
      const i = h.next();
      const j = i.done;
      if (j) {

      }
      else {
        i.value;
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
