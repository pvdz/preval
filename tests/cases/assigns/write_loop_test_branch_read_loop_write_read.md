# Preval test case

# write_loop_test_branch_read_loop_write_read.md

> Assigns > Write loop test branch read loop write read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(10);
while ($(x)) {
  if ($(true)) $(x); // This read can not reach the second write but is still in same loop
  x = $(20);
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(10);
const tmpIfTest /*:unknown*/ = $(x);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(true);
  if (tmpIfTest$1) {
    $(x);
  } else {
  }
  while ($LOOP_UNROLL_10) {
    x = $(20);
    const tmpIfTest$2 /*:unknown*/ = $(x);
    if (tmpIfTest$2) {
      const tmpIfTest$4 /*:unknown*/ = $(true);
      if (tmpIfTest$4) {
        $(x);
      } else {
      }
    } else {
      break;
    }
  }
  $(x);
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(10);
if ($(x)) {
  if ($(true)) {
    $(x);
  }
  while (true) {
    x = $(20);
    if ($(x)) {
      if ($(true)) {
        $(x);
      }
    } else {
      break;
    }
  }
  $(x);
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 10 );
const b = $( a );
if (b) {
  const c = $( true );
  if (c) {
    $( a );
  }
  while ($LOOP_UNROLL_10) {
    a = $( 20 );
    const d = $( a );
    if (d) {
      const e = $( true );
      if (e) {
        $( a );
      }
    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(10);
while (true) {
  const tmpIfTest = $(x);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(x);
    } else {
    }
    x = $(20);
  } else {
    break;
  }
}
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: true
 - 4: 10
 - 5: 20
 - 6: 20
 - 7: true
 - 8: 20
 - 9: 20
 - 10: 20
 - 11: true
 - 12: 20
 - 13: 20
 - 14: 20
 - 15: true
 - 16: 20
 - 17: 20
 - 18: 20
 - 19: true
 - 20: 20
 - 21: 20
 - 22: 20
 - 23: true
 - 24: 20
 - 25: 20
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
