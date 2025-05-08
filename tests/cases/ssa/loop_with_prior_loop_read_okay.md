# Preval test case

# loop_with_prior_loop_read_okay.md

> Ssa > Loop with prior loop read okay
>
> Example of technical case where SSA is possible

- there is a write before any read in the loop
- there is no further read

## Input

`````js filename=intro
function f() {
  let x = $(1);
  while (true) {
    $(x); // This looped read should not be the reason to prevent SSA in the next loop
    if ($) break;
  }
  while (true) {
    x = $(2);
    $(x);
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(1);
  $(x);
  if ($) {
  } else {
    while ($LOOP_UNROLL_10) {
      $(x);
      if ($) {
        break;
      } else {
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    $(tmpClusterSSA_x);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(1);
  $(x);
  if (!$) {
    while (true) {
      $(x);
      if ($) {
        break;
      }
    }
  }
  while (true) {
    $($(2));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
  $( a );
  if ($) {

  }
  else {
    while ($LOOP_UNROLL_10) {
      $( a );
      if ($) {
        break;
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const b = $( 2 );
    $( b );
  }
}
`````


## Todos triggered


- (todo) Support referencing this builtin in isFree: $
- (todo) Support this node type in isFree: LabeledStatement


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
