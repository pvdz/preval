# Preval test case

# if_no_ssa_alt.md

> Ref tracking > Last write analysis > If no ssa alt
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
if ($) {
} else {
  x = $('b');
}
// Read should reach two writes. No SSA possible (unless transformed to allow it)
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
if ($) {
  $(x);
} else {
  const tmpClusterSSA_x /*:unknown*/ = $(`b`);
  $(tmpClusterSSA_x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`a`);
$(x);
if ($) {
  $(x);
} else {
  $($(`b`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
if ($) {
  $( a );
}
else {
  const b = $( "b" );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`a`);
$(x);
if ($) {
  $(x);
} else {
  x = $(`b`);
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
