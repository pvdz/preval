# Preval test case

# complex_rhs2.md

> Let hoisting > Complex rhs2
>
> Hoisting a let even if it has a complex rhs

## Input

`````js filename=intro
let danger = function () {
  if ($(true)) {
    danger = null;
    return 1;
  }
};
const f = function () {
  if ($(true)) $(x);
};
let x = danger(); // End goal is to move this to be between `danger` and `f`
if ($(true)) {
  f();
  x = $('do not inline me');
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:primitive*/ = undefined;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  x = 1;
} else {
}
const tmpIfTest$3 /*:unknown*/ = $(true);
if (tmpIfTest$3) {
  const tmpIfTest$1 /*:unknown*/ = $(true);
  if (tmpIfTest$1) {
    $(x);
  } else {
  }
  const tmpClusterSSA_x /*:unknown*/ = $(`do not inline me`);
  $(tmpClusterSSA_x);
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 1;
}
if ($(true)) {
  if ($(true)) {
    $(x);
  }
  $($(`do not inline me`));
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( true );
if (b) {
  a = 1;
}
const c = $( true );
if (c) {
  const d = $( true );
  if (d) {
    $( a );
  }
  const e = $( "do not inline me" );
  $( e );
}
else {
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: 1
 - 5: 'do not inline me'
 - 6: 'do not inline me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
