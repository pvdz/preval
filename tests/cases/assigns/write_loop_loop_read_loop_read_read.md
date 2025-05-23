# Preval test case

# write_loop_loop_read_loop_read_read.md

> Assigns > Write loop loop read loop read read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    $(x, 'inner');
    if ($(true)) break
  }
  $(x, 'middle');
}
$(x, 'outer');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x, `inner`);
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(x, `middle`);
  } else {
    while ($LOOP_UNROLL_10) {
      $(x, `inner`);
      const tmpIfTest$1 /*:unknown*/ = $(true);
      if (tmpIfTest$1) {
        break;
      } else {
      }
    }
    $(x, `middle`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(10);
while (true) {
  $(x, `inner`);
  if ($(true)) {
    $(x, `middle`);
  } else {
    while (true) {
      $(x, `inner`);
      if ($(true)) {
        break;
      }
    }
    $(x, `middle`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a, "inner" );
  const b = $( true );
  if (b) {
    $( a, "middle" );
  }
  else {
    while ($LOOP_UNROLL_10) {
      $( a, "inner" );
      const c = $( true );
      if (c) {
        break;
      }
    }
    $( a, "middle" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    $(x, `inner`);
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      break;
    } else {
    }
  }
  $(x, `middle`);
}
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10, 'inner'
 - 3: true
 - 4: 10, 'middle'
 - 5: 10, 'inner'
 - 6: true
 - 7: 10, 'middle'
 - 8: 10, 'inner'
 - 9: true
 - 10: 10, 'middle'
 - 11: 10, 'inner'
 - 12: true
 - 13: 10, 'middle'
 - 14: 10, 'inner'
 - 15: true
 - 16: 10, 'middle'
 - 17: 10, 'inner'
 - 18: true
 - 19: 10, 'middle'
 - 20: 10, 'inner'
 - 21: true
 - 22: 10, 'middle'
 - 23: 10, 'inner'
 - 24: true
 - 25: 10, 'middle'
 - 26: 10, 'inner'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
