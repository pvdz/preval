# Preval test case

# complex_rhs.md

> Let hoisting > Complex rhs
>
> Hoisting a let even if it has a complex rhs

## Input

`````js filename=intro
let danger = function () {
  if ($) {
    danger = null;
    return 1;
  }
};
const f = function () {
  if ($) $(x);
};
let x = danger(); // End goal is to move this to be between `danger` and `f`
if ($) {
  f();
  x = $('do not inline me');
}
$(x);
`````


## Settled


`````js filename=intro
if ($) {
  $(1);
  if ($) {
    const tmpClusterSSA_x /*:unknown*/ = $(`do not inline me`);
    $(tmpClusterSSA_x);
  } else {
  }
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1);
  if ($) {
    $($(`do not inline me`));
  }
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  if ($) {
    const a = $( "do not inline me" );
    $( a );
  }
}
else {
  $( undefined );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'do not inline me'
 - 3: 'do not inline me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
