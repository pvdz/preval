# Preval test case

# backtoback_same_ident_if_return_true_false.md

> Normalize > If > Backtoback same ident if return true false
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if (x) {
  
  } else {
    x = $(0);
  }
  if (x) {
    return x;
  } else {
    return $(3);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(x);
} else {
  const tmpClusterSSA_x /*:unknown*/ = $(0);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x);
  } else {
    const tmpCalleeParam /*:unknown*/ = $(3);
    $(tmpCalleeParam);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if (x) {
  $(x);
} else {
  const tmpClusterSSA_x = $(0);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x);
  } else {
    $($(3));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( a );
}
else {
  const b = $( 0 );
  if (b) {
    $( b );
  }
  else {
    const c = $( 3 );
    $( c );
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
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
