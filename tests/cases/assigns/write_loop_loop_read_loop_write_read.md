# Preval test case

# write_loop_loop_read_loop_write_read.md

> Assigns > Write loop loop read loop write read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    $(x, 'inner')
    if ($(true)) break
  }
  x = $(30);
}
$(x, 'outer');
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x, `inner`);
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
  } else {
    while ($LOOP_UNROLL_10) {
      $(x, `inner`);
      const tmpIfTest$1 /*:unknown*/ = $(true);
      if (tmpIfTest$1) {
        break;
      } else {
      }
    }
  }
  x = $(30);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(10);
while (true) {
  $(x, `inner`);
  if (!$(true)) {
    while (true) {
      $(x, `inner`);
      if ($(true)) {
        break;
      }
    }
  }
  x = $(30);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 10 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a, "inner" );
  const b = $( true );
  if (b) {

  }
  else {
    while ($LOOP_UNROLL_10) {
      $( a, "inner" );
      const c = $( true );
      if (c) {
        break;
      }
    }
  }
  a = $( 30 );
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
 - 4: 30
 - 5: 30, 'inner'
 - 6: true
 - 7: 30
 - 8: 30, 'inner'
 - 9: true
 - 10: 30
 - 11: 30, 'inner'
 - 12: true
 - 13: 30
 - 14: 30, 'inner'
 - 15: true
 - 16: 30
 - 17: 30, 'inner'
 - 18: true
 - 19: 30
 - 20: 30, 'inner'
 - 21: true
 - 22: 30
 - 23: 30, 'inner'
 - 24: true
 - 25: 30
 - 26: 30, 'inner'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
