# Preval test case

# base2.md

> Assign hoisting > Base2
>
> Trying to move var decls that are functions down to move let decls closer to their real init.

## Input

`````js filename=intro
let x = undefined;
if ($) {
  x = $(3); // Change x
} else {
  $(x); // Observe x
}
$(x);
`````


## Settled


`````js filename=intro
if ($) {
  const tmpClusterSSA_x /*:unknown*/ = $(3);
  $(tmpClusterSSA_x);
} else {
  $(undefined);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $($(3));
} else {
  $(undefined);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 3 );
  $( a );
}
else {
  $( undefined );
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
