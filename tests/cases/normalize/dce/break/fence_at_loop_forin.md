# Preval test case

# fence_at_loop_forin.md

> Normalize > Dce > Break > Fence at loop forin
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  for (let x in {a: 1, b: 2}) {
    $('loop', x);
    break;
    $('fail');
  }

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`loop`);
  const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
  const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest$1) {
    $(`infiloop, do not eliminate`);
  } else {
    const x /*:unknown*/ = tmpForInNext.value;
    $(`loop`, x);
    $(`infiloop, do not eliminate`);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(true);
    if (tmpIfTest$2) {
      $(`loop`);
      const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { a: 1, b: 2 };
      const tmpForInGen$1 /*:unknown*/ = $forIn(tmpCalleeParam$1);
      const tmpForInNext$1 /*:unknown*/ = tmpForInGen$1();
      const tmpIfTest$4 /*:unknown*/ = tmpForInNext$1.done;
      if (tmpIfTest$4) {
        $(`infiloop, do not eliminate`);
      } else {
        const x$1 /*:unknown*/ = tmpForInNext$1.value;
        $(`loop`, x$1);
        $(`infiloop, do not eliminate`);
      }
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
} else {
  $(`after (not invoked)`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`loop`);
  const tmpForInGen = $forIn({ a: 1, b: 2 });
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    $(`infiloop, do not eliminate`);
  } else {
    $(`loop`, tmpForInNext.value);
    $(`infiloop, do not eliminate`);
  }
  while (true) {
    if ($(true)) {
      $(`loop`);
      const tmpForInGen$1 = $forIn({ a: 1, b: 2 });
      const tmpForInNext$1 = tmpForInGen$1();
      if (tmpForInNext$1.done) {
        $(`infiloop, do not eliminate`);
      } else {
        $(`loop`, tmpForInNext$1.value);
        $(`infiloop, do not eliminate`);
      }
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
} else {
  $(`after (not invoked)`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "loop" );
  const b = {
    a: 1,
    b: 2,
  };
  const c = $forIn( b );
  const d = c();
  const e = d.done;
  if (e) {
    $( "infiloop, do not eliminate" );
  }
  else {
    const f = d.value;
    $( "loop", f );
    $( "infiloop, do not eliminate" );
  }
  while ($LOOP_UNROLL_10) {
    const g = $( true );
    if (g) {
      $( "loop" );
      const h = {
        a: 1,
        b: 2,
      };
      const i = $forIn( h );
      const j = i();
      const k = j.done;
      if (k) {
        $( "infiloop, do not eliminate" );
      }
      else {
        const l = j.value;
        $( "loop", l );
        $( "infiloop, do not eliminate" );
      }
    }
    else {
      break;
    }
  }
  $( "after (not invoked)" );
}
else {
  $( "after (not invoked)" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`loop`);
    let tmpCalleeParam = { a: 1, b: 2 };
    const tmpForInGen = $forIn(tmpCalleeParam);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpForInNext = tmpForInGen();
      const tmpIfTest$1 = tmpForInNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        let x = tmpForInNext.value;
        $(`loop`, x);
        break;
      }
    }
    $(`infiloop, do not eliminate`);
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 'infiloop, do not eliminate'
 - 5: true
 - 6: 'loop'
 - 7: 'loop', 'a'
 - 8: 'infiloop, do not eliminate'
 - 9: true
 - 10: 'loop'
 - 11: 'loop', 'a'
 - 12: 'infiloop, do not eliminate'
 - 13: true
 - 14: 'loop'
 - 15: 'loop', 'a'
 - 16: 'infiloop, do not eliminate'
 - 17: true
 - 18: 'loop'
 - 19: 'loop', 'a'
 - 20: 'infiloop, do not eliminate'
 - 21: true
 - 22: 'loop'
 - 23: 'loop', 'a'
 - 24: 'infiloop, do not eliminate'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
