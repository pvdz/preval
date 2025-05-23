# Preval test case

# ref_in_sibling_block.md

> Ssa > Ref in sibling block
>
> What happens if there are future refs but they are in a sibling branch

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    if (a) {
      x = $(2);
      $(x);
    }
    {
      $(x);
    }
  } else {
    // Cannot reach the write but should not prevent SSA
    $(x);
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(1);
  if ($) {
    if (a) {
      const tmpClusterSSA_x /*:unknown*/ = $(2);
      $(tmpClusterSSA_x);
      $(tmpClusterSSA_x);
    } else {
      $(x);
    }
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
    if (a) {
      const tmpClusterSSA_x = $(2);
      $(tmpClusterSSA_x);
      $(tmpClusterSSA_x);
    } else {
      $(x);
    }
  } else {
    $(x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const b = $( 1 );
  if ($) {
    if (a) {
      const c = $( 2 );
      $( c );
      $( c );
    }
    else {
      $( b );
    }
  }
  else {
    $( b );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    if (a) {
      x = $(2);
      $(x);
      $(x);
      return undefined;
    } else {
      $(x);
      return undefined;
    }
  } else {
    $(x);
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

a


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
