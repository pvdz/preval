# Preval test case

# fence_at_loop_forin_if.md

> Normalize > Dce > Continue > Fence at loop forin if
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  for (let x in {a: 1, b: 2}) {
    $('loop', x);
    if ($(1)) {
      $('pass');
      continue;
      $('fail');
    } else {
      $('do not visit');
      continue;
      $('fail');
    }
    $('fail -> DCE');
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
    const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
    const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpForInNext /*:unknown*/ = tmpForInGen.next();
      const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        const x /*:unknown*/ = tmpForInNext.value;
        $(`loop`, x);
        const tmpIfTest$3 /*:unknown*/ = $(1);
        if (tmpIfTest$3) {
          $(`pass`);
        } else {
          $(`do not visit`);
        }
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
    const tmpForInGen = $forIn({ a: 1, b: 2 });
    while (true) {
      const tmpForInNext = tmpForInGen.next();
      if (tmpForInNext.done) {
        break;
      } else {
        $(`loop`, tmpForInNext.value);
        if ($(1)) {
          $(`pass`);
        } else {
          $(`do not visit`);
        }
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
    const b = {
      a: 1,
      b: 2,
    };
    const c = $forIn( b );
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const d = c.next();
      const e = d.done;
      if (e) {
        break;
      }
      else {
        const f = d.value;
        $( "loop", f );
        const g = $( 1 );
        if (g) {
          $( "pass" );
        }
        else {
          $( "do not visit" );
        }
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


## Todos triggered


- (todo) Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 1
 - 5: 'pass'
 - 6: 'loop', 'b'
 - 7: 1
 - 8: 'pass'
 - 9: 'infiloop, do not eliminate'
 - 10: true
 - 11: 'loop'
 - 12: 'loop', 'a'
 - 13: 1
 - 14: 'pass'
 - 15: 'loop', 'b'
 - 16: 1
 - 17: 'pass'
 - 18: 'infiloop, do not eliminate'
 - 19: true
 - 20: 'loop'
 - 21: 'loop', 'a'
 - 22: 1
 - 23: 'pass'
 - 24: 'loop', 'b'
 - 25: 1
 - 26: 'pass'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
