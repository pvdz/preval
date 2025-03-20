# Preval test case

# ref_after_else.md

> Ssa > Ref after else
>
> What happens if there are future refs but they are in a sibling branch

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  } else {
  }
  // This ref can not reach the assign and so it prevents SSA
  $(x);
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(1);
  if ($) {
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    $(tmpClusterSSA_x);
    $(tmpClusterSSA_x);
  } else {
    $(x);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(1);
  if ($) {
    const tmpClusterSSA_x = $(2);
    $(tmpClusterSSA_x);
    $(tmpClusterSSA_x);
  } else {
    $(x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
  if ($) {
    const b = $( 2 );
    $( b );
    $( b );
  }
  else {
    $( a );
  }
}
`````


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
