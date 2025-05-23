# Preval test case

# write_loop_loop_write_loop_read_read.md

> Assigns > Write loop loop write loop read read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    if ($(true)) break
  }
  $(x);
}
$(x);
`````


## Settled


`````js filename=intro
$(10);
let x /*:unknown*/ = undefined;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpClusterSSA_x /*:unknown*/ = $(20);
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(tmpClusterSSA_x);
  } else {
    while ($LOOP_UNROLL_10) {
      x = $(20);
      const tmpIfTest$1 /*:unknown*/ = $(true);
      if (tmpIfTest$1) {
        break;
      } else {
      }
    }
    $(x);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
let x = undefined;
while (true) {
  const tmpClusterSSA_x = $(20);
  if ($(true)) {
    $(tmpClusterSSA_x);
  } else {
    while (true) {
      x = $(20);
      if ($(true)) {
        break;
      }
    }
    $(x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
let a = undefined;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( 20 );
  const c = $( true );
  if (c) {
    $( b );
  }
  else {
    while ($LOOP_UNROLL_10) {
      a = $( 20 );
      const d = $( true );
      if (d) {
        break;
      }
    }
    $( a );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      break;
    } else {
    }
  }
  $(x);
}
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: true
 - 4: 20
 - 5: 20
 - 6: true
 - 7: 20
 - 8: 20
 - 9: true
 - 10: 20
 - 11: 20
 - 12: true
 - 13: 20
 - 14: 20
 - 15: true
 - 16: 20
 - 17: 20
 - 18: true
 - 19: 20
 - 20: 20
 - 21: true
 - 22: 20
 - 23: 20
 - 24: true
 - 25: 20
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
