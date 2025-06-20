# Preval test case

# loop_with_prior_loop_read_bad.md

> Ssa > Loop with prior loop read bad
>
> Assignments in loops won't easily be SSA'd

## Input

`````js filename=intro
function f() {
  let x = $(1);
  while (true) {
    $(x); // This prevents SSA of the next assign
    x = $(2);
    $(x);
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  let x /*:unknown*/ = $(1);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(x);
    x = $(2);
    $(x);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let x = $(1);
  while (true) {
    $(x);
    x = $(2);
    $(x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = $( 1 );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( a );
    a = $( 2 );
    $( a );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  while (true) {
    $(x);
    x = $(2);
    $(x);
  }
  return undefined;
};
if ($) {
  f();
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
