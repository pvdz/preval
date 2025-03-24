# Preval test case

# complex_rhs3.md

> Let hoisting > Complex rhs3
>
> Hoisting a let even if it has a complex rhs

## Input

`````js filename=intro
const b = $(true);
let danger = function () {
  if (b) {
    danger = null;
    return 1;
  }
};
const f = function () {
  if (b) $(x);
};
let x = danger(); // End goal is to move this to be between `danger` and `f`
if (b) {
  f();
  x = $('do not inline me');
}
$(x);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(true);
if (b) {
  $(1);
  const tmpClusterSSA_x /*:unknown*/ = $(`do not inline me`);
  $(tmpClusterSSA_x);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(1);
  $($(`do not inline me`));
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 1 );
  const b = $( "do not inline me" );
  $( b );
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
 - 1: true
 - 2: 1
 - 3: 'do not inline me'
 - 4: 'do not inline me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
