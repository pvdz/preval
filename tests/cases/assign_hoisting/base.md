# Preval test case

# base.md

> Assign hoisting > Base
>
> Trying to move var decls that are functions down to move let decls closer to their real init.

## Input

`````js filename=intro
let x = undefined;
const f = function(){
  if ($) {
    $('block inlining');
    $(x);
  }
};
x = $(2);
if ($) {
  f();
  x = $(3); // Change x
} else {
  $(x); // Observe x
}
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(2);
if ($) {
  $(`block inlining`);
  $(x);
  const tmpClusterSSA_x /*:unknown*/ = $(3);
  $(tmpClusterSSA_x);
} else {
  $(x);
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(2);
if ($) {
  $(`block inlining`);
  $(x);
  $($(3));
} else {
  $(x);
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
if ($) {
  $( "block inlining" );
  $( a );
  const b = $( 3 );
  $( b );
}
else {
  $( a );
  $( a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 'block inlining'
 - 3: 2
 - 4: 3
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
