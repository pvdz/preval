# Preval test case

# base_tdz_impossible.md

> Ssa > Base tdz impossible
>
> Contrived example

This is a tdz example we can not detect safely

## Input

`````js filename=intro
if ($) $(x);
let x = $(5);
$(x);
// Next write can be SSA'd
x = $(10);
$(x);
`````


## Settled


`````js filename=intro
if ($) {
  throw `Preval: TDZ triggered for this read: \$(x)`;
} else {
  const x /*:unknown*/ = $(5);
  $(x);
  const tmpClusterSSA_x /*:unknown*/ = $(10);
  $(tmpClusterSSA_x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  throw `Preval: TDZ triggered for this read: \$(x)`;
} else {
  $($(5));
  $($(10));
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  throw "Preval: TDZ triggered for this read: $(x)";
}
else {
  const a = $( 5 );
  $( a );
  const b = $( 10 );
  $( b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
