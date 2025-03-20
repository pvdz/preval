# Preval test case

# early_return_mendable.md

> Ssa > Single scope > Early return mendable
>
> Figure out why the early returns are not allowing the var to be SSA'd

This is "mendable" because the tail could be moved into the `else` block of the `if` and then the algorithm would be okay, considering the other ref in the other branch.

Of course the algorithm should be able to detect this SSA even without that trick.

## Input

`````js filename=intro
const tmpLabeledBlockFunc$3 = function (x) {
  if ($) {
    // SSA this
    x = $(1);
    $(x);
    return;
  }
  $(x);
};
$(tmpLabeledBlockFunc$3);
`````


## Settled


`````js filename=intro
const tmpLabeledBlockFunc$3 /*:(unknown)=>undefined*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  if ($) {
    const tmpClusterSSA_x /*:unknown*/ = $(1);
    $(tmpClusterSSA_x);
    return undefined;
  } else {
    $(x);
    return undefined;
  }
};
$(tmpLabeledBlockFunc$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (x) {
  if ($) {
    $($(1));
  } else {
    $(x);
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  if ($) {
    const c = $( 1 );
    $( c );
    return undefined;
  }
  else {
    $( b );
    return undefined;
  }
};
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
