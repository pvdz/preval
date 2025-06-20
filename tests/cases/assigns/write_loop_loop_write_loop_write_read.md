# Preval test case

# write_loop_loop_write_loop_write_read.md

> Assigns > Write loop loop write loop write read
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
  x = $(30);
}
$(x);
`````


## Settled


`````js filename=intro
$(10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(20);
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(30);
  } else {
    while ($LOOP_UNROLL_10) {
      $(20);
      const tmpIfTest$1 /*:unknown*/ = $(true);
      if (tmpIfTest$1) {
        break;
      } else {
      }
    }
    $(30);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
while (true) {
  $(20);
  if ($(true)) {
    $(30);
  } else {
    while (true) {
      $(20);
      if ($(true)) {
        break;
      }
    }
    $(30);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 20 );
  const a = $( true );
  if (a) {
    $( 30 );
  }
  else {
    while ($LOOP_UNROLL_10) {
      $( 20 );
      const b = $( true );
      if (b) {
        break;
      }
    }
    $( 30 );
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
  x = $(30);
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
 - 4: 30
 - 5: 20
 - 6: true
 - 7: 30
 - 8: 20
 - 9: true
 - 10: 30
 - 11: 20
 - 12: true
 - 13: 30
 - 14: 20
 - 15: true
 - 16: 30
 - 17: 20
 - 18: true
 - 19: 30
 - 20: 20
 - 21: true
 - 22: 30
 - 23: 20
 - 24: true
 - 25: 30
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
