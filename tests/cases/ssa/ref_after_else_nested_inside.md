# Preval test case

# ref_after_else_nested_inside.md

> Ssa > Ref after else nested inside
>
> What happens if there are future refs but they are in a sibling branch

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    if ($) {
      x = $(2);
      $(x);
    } else {
      // Cannot reach the write but should not prevent SSA
      $(x);
    }
  } else {
    $('else');
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
  } else {
    $(`else`);
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
    $($(2));
  } else {
    $(`else`);
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
  }
  else {
    $( "else" );
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
