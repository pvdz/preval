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
} else {
  $(undefined);
}
if ($) {
  const tmpClusterSSA_x /*:unknown*/ = $(`do not inline me`);
  $(tmpClusterSSA_x);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1);
} else {
  $(undefined);
}
if ($) {
  $($(`do not inline me`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 1 );
}
else {
  $( undefined );
}
if ($) {
  const a = $( "do not inline me" );
  $( a );
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
