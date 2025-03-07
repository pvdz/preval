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
  const tmpClusterSSA_x /*:primitive*/ = x + 1;
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
  const tmpClusterSSA_x = $(5) + 1;
  if ($) {
    $(tmpClusterSSA_x);
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let g = function () {
      debugger;
      if ($) $(x);
    };
    let x = $(5);
    ++x;
    g();
  }
};
if ($) f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = $(5);
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

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  const b = a + 1;
  if ($) {
    $( b );
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
