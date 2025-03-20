# Preval test case

# back2back_closure.md

> Ssa > Back2back closure
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

## Input

`````js filename=intro
function f() {
  if ($) { // The branching prevents flattening
    let x = $(5);
    ++x;
    function g() {
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
  const x /*:unknown*/ = $(5);
  const tmpPostUpdArgIdent /*:number*/ = $coerce(x, `number`);
  if ($) {
    const tmpClusterSSA_x /*:number*/ = tmpPostUpdArgIdent + 1;
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
  const tmpPostUpdArgIdent = $coerce($(5), `number`);
  if ($) {
    $(tmpPostUpdArgIdent + 1);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  const b = $coerce( a, "number" );
  if ($) {
    const c = b + 1;
    $( c );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
