# Preval test case

# eq_else_eq_false2.md

> Conditional typing > Eq else eq false2
>
> Assignment that cannot be observed should be dropped

There's two aspects here;
- We can know the assigned value is false
- The binding `x` is already false in the else branch so the assignment is redundant

## Input

`````js filename=intro
const a = $(67637);
const x = a === 67636;
if (x) {
  $(true);
} else {
  $(false);
}
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(67637);
const x /*:boolean*/ = a === 67636;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(67637) === 67636);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 67637 );
const b = a === 67636;
$( b );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 67637
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
