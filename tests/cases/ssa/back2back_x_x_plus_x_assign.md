# Preval test case

# back2back_x_x_plus_x_assign.md

> Ssa > Back2back x x plus x assign
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

Zooming in on the `x = x + x` case (double self reference). This is the double assign case.

## Input

`````js filename=intro
const f = function () {
  if ($) {
    const g = function () {
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    $(x);
    // This rhs is _only_ observed as part of the next update to x, so we should be able to SSA this
    x = $(10);
    // But because the x is used in the rhs, it becomes write-read-write, which is tricky
    // The ref is used twice, making sure we don't just bail when we find one.
    x = x + x;
    g();
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(5);
  $(x);
  const tmpClusterSSA_x /*:unknown*/ = $(10);
  const tmpClusterSSA_x$1 /*:primitive*/ = tmpClusterSSA_x + tmpClusterSSA_x;
  if ($) {
    $(tmpClusterSSA_x$1);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $($(5));
  const tmpClusterSSA_x = $(10);
  const tmpClusterSSA_x$1 = tmpClusterSSA_x + tmpClusterSSA_x;
  if ($) {
    $(tmpClusterSSA_x$1);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  $( a );
  const b = $( 10 );
  const c = b + b;
  if ($) {
    $( c );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: 10
 - 4: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
