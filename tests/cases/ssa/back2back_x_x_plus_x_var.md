# Preval test case

# back2back_x_x_plus_x_var.md

> Ssa > Back2back x x plus x var
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

Zooming in on the `x = x + x` case (double self reference).

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
    // This init is _only_ observed as part of the next update to x, so we should be able to SSA this
    let x = $(5);
    // But because the x is used in the rhs, it becomes write-read-write, which is tricky
    // The ref is used twice, making sure we don't just bail when we find one.
    // Since x is used in a closure we would first have to confirm whether side effects can ref x before doing SSA
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
  const tmpClusterSSA_x /*:primitive*/ = x + x;
  if ($) {
    $(tmpClusterSSA_x);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(5);
  const tmpClusterSSA_x = x + x;
  if ($) {
    $(tmpClusterSSA_x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  const b = a + a;
  if ($) {
    $( b );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    const g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = $(5);
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
