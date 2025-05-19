# Preval test case

# ref_in_sibling_if_after.md

> Ssa > Ref in sibling if after
>
> What happens if there are future refs but they are in a sibling branch

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  }
  if ($) {
    // This should prevent SSA
    $(x);
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  $(1);
  if ($) {
    const x /*:unknown*/ = $(2);
    $(x);
    if ($) {
      $(x);
    } else {
    }
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1);
  if ($) {
    const x = $(2);
    $(x);
    if ($) {
      $(x);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  if ($) {
    const a = $( 2 );
    $( a );
    if ($) {
      $( a );
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
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
