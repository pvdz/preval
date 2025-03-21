# Preval test case

# loop_could_be_okay_break.md

> Ssa > Loop could be okay break
>
> Example of technical case where SSA is possible

- there is a write before any read in the loop
- there is no further read

The conditional break introduces branching which prevents any SSA in the first place.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  while (true) {
    x = $(2);
    $(x);
    if ($) break;
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  $(1);
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
  if ($) {
  } else {
    while ($LOOP_UNROLL_10) {
      const tmpClusterSSA_x$1 /*:unknown*/ = $(2);
      $(tmpClusterSSA_x$1);
      if ($) {
        break;
      } else {
      }
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1);
  $($(2));
  if (!$) {
    while (true) {
      $($(2));
      if ($) {
        break;
      }
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  const a = $( 2 );
  $( a );
  if ($) {

  }
  else {
    while ($LOOP_UNROLL_10) {
      const b = $( 2 );
      $( b );
      if ($) {
        break;
      }
    }
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
