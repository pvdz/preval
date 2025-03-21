# Preval test case

# eq_else_eq_false.md

> Conditional typing > Eq else eq false
>
> Assignment that cannot be observed should be dropped

There's two aspects here;
- We can know the assigned value is false
- The binding `x` is already false in the else branch so the assignment is redundant

## Input

`````js filename=intro
const a = $(67637)
let x = a === 67636;
if (x) {
} else {
  x = a === 67636;
}
$(x)
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


None


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
