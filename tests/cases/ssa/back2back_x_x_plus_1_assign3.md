# Preval test case

# back2back_x_x_plus_1_assign3.md

> Ssa > Back2back x x plus 1 assign3
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

Zooming in on the `x = x + 1` case. This is the double assign case.

This should be the proof of why this is dangerous. The `x + 1` expression could have observable side effects that change x.

What happens if we do SSA it?

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
    let ssax = $({ // What if we rename this assign and all writes up to the next one? x->ssax
      toString(){
        $('tostring');
        x = 20; // Note that this is rhs of the assign, which goes (in rwOrder), before this let, so it stays x
        return 'hi';
      }
    });
    // This read goes before the assign in rwOrder, and we don't change the assign
    x = ssax + 1;
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
  let x /*:unknown*/ = $(5);
  $(x);
  const tmpCalleeParam /*:object*/ /*truthy*/ = {
    toString() {
      debugger;
      $(`tostring`);
      x = 20;
      return `hi`;
    },
  };
  const ssax /*:unknown*/ = $(tmpCalleeParam);
  x = ssax + 1;
  if ($) {
    $(x);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let x = $(5);
  $(x);
  x =
    $({
      toString() {
        $(`tostring`);
        x = 20;
        return `hi`;
      },
    }) + 1;
  if ($) {
    $(x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = $( 5 );
  $( a );
  const b = { toString(  ) {
    debugger;
    $( "tostring" );
    a = 20;
    return "hi";
  } };
  const c = $( b );
  a = c + 1;
  if ($) {
    $( a );
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
    $(x);
    let tmpCalleeParam = {
      toString() {
        debugger;
        $(`tostring`);
        x = 20;
        return `hi`;
      },
    };
    let ssax = $(tmpCalleeParam);
    x = ssax + 1;
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
 - 2: 5
 - 3: { toString: '"<function>"' }
 - 4: 'tostring'
 - 5: 'hi1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
