# Preval test case

# fence_at_loop_forof.md

> Normalize > Dce > Break > Fence at loop forof
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  for (let x of [1, 2]) {
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
  const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
  const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    $(`infiloop, do not eliminate`);
  } else {
    const x /*:unknown*/ = tmpForOfNext.value;
    $(`loop`, x);
    $(`infiloop, do not eliminate`);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(true);
    if (tmpIfTest$2) {
      $(`loop`);
      const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 2];
      const tmpForOfGenNext$1 /*:unknown*/ = $forOf(tmpCalleeParam$1);
      const tmpForOfNext$1 /*:unknown*/ = tmpForOfGenNext$1();
      const tmpIfTest$4 /*:unknown*/ = tmpForOfNext$1.done;
      if (tmpIfTest$4) {
        $(`infiloop, do not eliminate`);
      } else {
        const x$1 /*:unknown*/ = tmpForOfNext$1.value;
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
  const tmpForOfGenNext = $forOf([1, 2]);
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    $(`infiloop, do not eliminate`);
  } else {
    $(`loop`, tmpForOfNext.value);
    $(`infiloop, do not eliminate`);
  }
  while (true) {
    if ($(true)) {
      $(`loop`);
      const tmpForOfGenNext$1 = $forOf([1, 2]);
      const tmpForOfNext$1 = tmpForOfGenNext$1();
      if (tmpForOfNext$1.done) {
        $(`infiloop, do not eliminate`);
      } else {
        $(`loop`, tmpForOfNext$1.value);
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
  const b = [ 1, 2 ];
  const c = $forOf( b );
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
      const h = [ 1, 2 ];
      const i = $forOf( h );
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
    let tmpCalleeParam = [1, 2];
    const tmpForOfGenNext = $forOf(tmpCalleeParam);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpForOfNext = tmpForOfGenNext();
      const tmpIfTest$1 = tmpForOfNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        let x = tmpForOfNext.value;
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


- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 1
 - 4: 'infiloop, do not eliminate'
 - 5: true
 - 6: 'loop'
 - 7: 'loop', 1
 - 8: 'infiloop, do not eliminate'
 - 9: true
 - 10: 'loop'
 - 11: 'loop', 1
 - 12: 'infiloop, do not eliminate'
 - 13: true
 - 14: 'loop'
 - 15: 'loop', 1
 - 16: 'infiloop, do not eliminate'
 - 17: true
 - 18: 'loop'
 - 19: 'loop', 1
 - 20: 'infiloop, do not eliminate'
 - 21: true
 - 22: 'loop'
 - 23: 'loop', 1
 - 24: 'infiloop, do not eliminate'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
