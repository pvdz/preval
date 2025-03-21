# Preval test case

# ref_in_sibling_else_after2.md

> Ssa > Ref in sibling else after2
>
> What happens if there are future refs but they are in a sibling branch

Mirror test for back to back ifs. Feel free to ignore.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
  } else {
    x = $(2);
    $(x);
  }
  if ($) {
    // This should prevent SSA
    $(x);
  } else {
    $('if');
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(1);
  if ($) {
    $(x);
  } else {
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    $(tmpClusterSSA_x);
    if ($) {
      $(tmpClusterSSA_x);
    } else {
      $(`if`);
    }
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
    $(x);
  } else {
    const tmpClusterSSA_x = $(2);
    $(tmpClusterSSA_x);
    if ($) {
      $(tmpClusterSSA_x);
    } else {
      $(`if`);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
  if ($) {
    $( a );
  }
  else {
    const b = $( 2 );
    $( b );
    if ($) {
      $( b );
    }
    else {
      $( "if" );
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
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
