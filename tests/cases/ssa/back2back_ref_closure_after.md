# Preval test case

# back2back_ref_closure_after.md

> Ssa > Back2back ref closure after
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

This version makes sure there's no closure of x before the decl.

## Input

`````js filename=intro
function f() {
  if ($) { // The branching prevents flattening
    let x = undefined;
    x = function(){};
    const g = function() {
      if ($) $(x);
    }
    g();
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:()=>unknown*/ = function $pcompiled() {
    debugger;
    return undefined;
  };
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
  const x = function $pcompiled() {};
  if ($) {
    $(x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = function $pcompiled() {
    debugger;
    return undefined;
  };
  if ($) {
    $( a );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = undefined;
    x = function () {
      debugger;
      return undefined;
    };
    const g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
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
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
