# Preval test case

# back2back_ref_closure.md

> Ssa > Back2back ref closure
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

## Input

`````js filename=intro
function f() {
  if ($) { // The branching prevents flattening
    let x = undefined;
    x = function(){};
    function g() {
      if ($) $(x);
    }
    g();
    $(x);
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const tmpSSA_x /*:()=>unknown*/ = function () {
    debugger;
    return undefined;
  };
  $(tmpSSA_x);
  if ($) {
    $(tmpSSA_x);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const tmpSSA_x = function () {};
  $(tmpSSA_x);
  if ($) {
    $(tmpSSA_x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = function() {
    debugger;
    return undefined;
  };
  $( a );
  if ($) {
    $( a );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
