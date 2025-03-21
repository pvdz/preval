# Preval test case

# back2back_x_x_plus_1_assign2.md

> Ssa > Back2back x x plus 1 assign2
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

Zooming in on the `x = x + 1` case. This is the double assign case.

This should be the proof of why this is dangerous. The `x + 1` expression could have observable side effects that change x.

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
    x = $({
      toString(){
        $('tostring');
        x = 20;
        return 'hi';
      }
    });
    // But because the x is used in the rhs, it becomes write-read-write, which is tricky
    // This addition triggers the toString method of x, which is observable.
    x = x + 1;
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
  const tmpCalleeParam /*:object*/ = {
    toString() {
      debugger;
      $(`tostring`);
      return `hi`;
    },
  };
  const tmpClusterSSA_x /*:unknown*/ = $(tmpCalleeParam);
  const tmpClusterSSA_x$1 /*:primitive*/ = tmpClusterSSA_x + 1;
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
  const tmpClusterSSA_x$1 =
    $({
      toString() {
        $(`tostring`);
        return `hi`;
      },
    }) + 1;
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
  const b = { toString(  ) {
    debugger;
    $( "tostring" );
    return "hi";
  } };
  const c = $( b );
  const d = c + 1;
  if ($) {
    $( d );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: { toString: '"<function>"' }
 - 4: 'tostring'
 - 5: 'hi1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
