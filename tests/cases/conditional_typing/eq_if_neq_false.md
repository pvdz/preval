# Preval test case

# eq_if_neq_false.md

> Conditional typing > Eq if neq false
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
  x = a !== 67636;
} else {
}
$(x)
`````


## Settled


`````js filename=intro
$(67637);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(67637);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 67637 );
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(67637);
let x = a === 67636;
if (x) {
  x = a !== 67636;
  $(x);
} else {
  $(x);
}
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
