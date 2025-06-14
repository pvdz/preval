# Preval test case

# back2back_bad.md

> Ssa > Back2back bad
>
> This may be an artifact through using ++x

We can't SSA here because renaming the x means the closure breaks.

This is _the_ example case that shows why we have to be careful about read-var-write cases.

The closure is called before the second write and we can't (trivially) tell to which binding the closure should point after the SSA; the old or the new.

Now what happens if the function is called in the second assignment (when it needs to point to the old) and after that assignment (when it needs to point to the new)? Oops.

## Input

`````js filename=intro
function f() {
  if ($) {
    const g = function(){ if ($) return $(x); };
    let x = $(5);
    x = g(); // The value of `x` is observable even though the assignments are back2back
    $(x);
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(5);
  if ($) {
    const tmpClusterSSA_x /*:unknown*/ = $(x);
    $(tmpClusterSSA_x);
  } else {
    $(undefined);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(5);
  if ($) {
    $($(x));
  } else {
    $(undefined);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  if ($) {
    const b = $( a );
    $( b );
  }
  else {
    $( undefined );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    const g = function () {
      debugger;
      if ($) {
        const tmpReturnArg = $(x);
        return tmpReturnArg;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    x = g();
    $(x);
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
 - 3: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
