# Preval test case

# back2back_bad_because.md

> Ssa > Back2back bad because
>
> This may be an artifact through using ++x

We can't SSA here because renaming the x means the closure breaks.

This is _the_ example case that shows why we have to be careful about read-var-write cases.

The closure is called before the second write and we can't (trivially) tell to which binding the closure should point after the SSA; the old or the new.

Now what happens if the function is called in the second assignment (when it needs to point to the old) and after that assignment (when it needs to point to the new)? Oops.

We can't apply SSA to this with our current heuristics.

We could clone the function with a before and after variation. But that feels like it would only solve a very niche case, not a general solution. And it would fail fast if we can't track the function in the first place. Like what happens when it's a class method, etc.

## Input

`````js filename=intro
function f() {
  if ($) {
    const g = function(){ if ($) return $(x); };
    let x = $(5);
    x = g(); // Here g needs to point to the "old" binding if we would apply SSA.
    g(); // And here g needs to point to the "new" binding if we would apply SSA.
    $(x);
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(5);
  const tmpClusterSSA_x /*:unknown*/ = $(x);
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const tmpClusterSSA_x = $($(5));
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  const b = $( a );
  $( b );
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: 5
 - 4: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
