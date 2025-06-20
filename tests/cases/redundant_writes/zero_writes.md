# Preval test case

# zero_writes.md

> Redundant writes > Zero writes

## Input

`````js filename=intro
let y = $(true);
while (true) {
  if (y) {
    $(y, 'before');
    let x = undefined;
    const obj = { a: 1, b: 2 };
    for (x in obj) {
      $(x, y);
      continue;
    }
    $(x, y, 'after');
    y = $(true);
  } else {
    break;
  }
}
$(y, 'last');
`````


## Settled


`````js filename=intro
let y /*:unknown*/ = undefined;
while (true) {
  y = $(true);
  if (y) {
    $(y, `before`);
    let x /*:unknown*/ = undefined;
    const obj /*:object*/ /*truthy*/ = { a: 1, b: 2 };
    const tmpForInGenNext /*:unknown*/ = $forIn(obj);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpForInNext /*:unknown*/ = tmpForInGenNext();
      const tmpIfTest /*:unknown*/ = tmpForInNext.done;
      if (tmpIfTest) {
        break;
      } else {
        x = tmpForInNext.value;
        $(x, y);
      }
    }
    $(x, y, `after`);
  } else {
    break;
  }
}
$(y, `last`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let y = undefined;
while (true) {
  y = $(true);
  if (y) {
    $(y, `before`);
    let x = undefined;
    const tmpForInGenNext = $forIn({ a: 1, b: 2 });
    while (true) {
      const tmpForInNext = tmpForInGenNext();
      if (tmpForInNext.done) {
        break;
      } else {
        x = tmpForInNext.value;
        $(x, y);
      }
    }
    $(x, y, `after`);
  } else {
    break;
  }
}
$(y, `last`);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
while (true) {
  a = $( true );
  if (a) {
    $( a, "before" );
    let b = undefined;
    const c = {
      a: 1,
      b: 2,
    };
    const d = $forIn( c );
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const e = d();
      const f = e.done;
      if (f) {
        break;
      }
      else {
        b = e.value;
        $( b, a );
      }
    }
    $( b, a, "after" );
  }
  else {
    break;
  }
}
$( a, "last" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = undefined;
while (true) {
  y = $(true);
  if (y) {
    $(y, `before`);
    let x = undefined;
    const obj = { a: 1, b: 2 };
    const tmpForInGenNext = $forIn(obj);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpForInNext = tmpForInGenNext();
      const tmpIfTest = tmpForInNext.done;
      if (tmpIfTest) {
        break;
      } else {
        x = tmpForInNext.value;
        $(x, y);
      }
    }
    $(x, y, `after`);
  } else {
    break;
  }
}
$(y, `last`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true, 'before'
 - 3: 'a', true
 - 4: 'b', true
 - 5: 'b', true, 'after'
 - 6: true
 - 7: true, 'before'
 - 8: 'a', true
 - 9: 'b', true
 - 10: 'b', true, 'after'
 - 11: true
 - 12: true, 'before'
 - 13: 'a', true
 - 14: 'b', true
 - 15: 'b', true, 'after'
 - 16: true
 - 17: true, 'before'
 - 18: 'a', true
 - 19: 'b', true
 - 20: 'b', true, 'after'
 - 21: true
 - 22: true, 'before'
 - 23: 'a', true
 - 24: 'b', true
 - 25: 'b', true, 'after'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
