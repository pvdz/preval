# Preval test case

# loop_with_read_after_break.md

> Ssa > Loop with read after break
>
> The read afterwards makes SSA not worth it

The break introduces branching which prevents any SSA in the first place.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  while (true) {
    x = $(2);
    $(x);
    if ($) break;
  }
  $(x);
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
    $(tmpClusterSSA_x);
  } else {
    let x /*:unknown*/ = undefined;
    while ($LOOP_UNROLL_10) {
      x = $(2);
      $(x);
      if ($) {
        break;
      } else {
      }
    }
    $(x);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1);
  const tmpClusterSSA_x = $(2);
  $(tmpClusterSSA_x);
  if ($) {
    $(tmpClusterSSA_x);
  } else {
    let x = undefined;
    while (true) {
      x = $(2);
      $(x);
      if ($) {
        break;
      }
    }
    $(x);
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
    $( a );
  }
  else {
    let b = undefined;
    while ($LOOP_UNROLL_10) {
      b = $( 2 );
      $( b );
      if ($) {
        break;
      }
    }
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
  while (true) {
    x = $(2);
    $(x);
    if ($) {
      break;
    } else {
    }
  }
  $(x);
  return undefined;
};
if ($) {
  f();
} else {
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
