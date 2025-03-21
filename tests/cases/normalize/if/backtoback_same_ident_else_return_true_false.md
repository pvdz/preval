# Preval test case

# backtoback_same_ident_else_return_true_false.md

> Normalize > If > Backtoback same ident else return true false
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if (x) {
    x = $(0);
  } else {
  
  }
  if (x) {
    return $(3);
  } else {
    return x;
  }
}
$(f());
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  const tmpClusterSSA_x /*:unknown*/ = $(0);
  if (tmpClusterSSA_x) {
    const tmpReturnArg /*:unknown*/ = $(3);
    $(tmpReturnArg);
  } else {
    $(tmpClusterSSA_x);
  }
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if (x) {
  const tmpClusterSSA_x = $(0);
  if (tmpClusterSSA_x) {
    $($(3));
  } else {
    $(tmpClusterSSA_x);
  }
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 0 );
  if (b) {
    const c = $( 3 );
    $( c );
  }
  else {
    $( b );
  }
}
else {
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
