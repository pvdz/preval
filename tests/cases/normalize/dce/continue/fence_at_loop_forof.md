# Preval test case

# fence_at_loop_forof.md

> Normalize > Dce > Continue > Fence at loop forof
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  for (let x of [1, 2]) {
    $('loop', x);
    continue;
    $('fail');
  }

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````


## Settled


`````js filename=intro
while (true) {
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(`loop`);
    const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
    const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
      const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        const x /*:unknown*/ = tmpForOfNext.value;
        $(`loop`, x);
      }
    }
    $(`infiloop, do not eliminate`);
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  if ($(true)) {
    $(`loop`);
    const tmpForOfGenNext = $forOf([1, 2]);
    while (true) {
      const tmpForOfNext = tmpForOfGenNext();
      if (tmpForOfNext.done) {
        break;
      } else {
        $(`loop`, tmpForOfNext.value);
      }
    }
    $(`infiloop, do not eliminate`);
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````


## PST Settled
With rename=true

`````js filename=intro
while (true) {
  const a = $( true );
  if (a) {
    $( "loop" );
    const b = [ 1, 2 ];
    const c = $forOf( b );
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const d = c();
      const e = d.done;
      if (e) {
        break;
      }
      else {
        const f = d.value;
        $( "loop", f );
      }
    }
    $( "infiloop, do not eliminate" );
  }
  else {
    break;
  }
}
$( "after (not invoked)" );
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


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 1
 - 4: 'loop', 2
 - 5: 'infiloop, do not eliminate'
 - 6: true
 - 7: 'loop'
 - 8: 'loop', 1
 - 9: 'loop', 2
 - 10: 'infiloop, do not eliminate'
 - 11: true
 - 12: 'loop'
 - 13: 'loop', 1
 - 14: 'loop', 2
 - 15: 'infiloop, do not eliminate'
 - 16: true
 - 17: 'loop'
 - 18: 'loop', 1
 - 19: 'loop', 2
 - 20: 'infiloop, do not eliminate'
 - 21: true
 - 22: 'loop'
 - 23: 'loop', 1
 - 24: 'loop', 2
 - 25: 'infiloop, do not eliminate'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
