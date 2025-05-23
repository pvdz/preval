# Preval test case

# eq_else_neq_true.md

> Conditional typing > Eq else neq true
>
> Assignment that cannot be observed should be dropped

## Input

`````js filename=intro
const a = $(67636)
let x = a === 67636;
if (x) {
} else {
  x = a !== 67636;
}
$(x)
`````


## Settled


`````js filename=intro
$(67636);
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(67636);
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 67636 );
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(67636);
let x = a === 67636;
if (x) {
  $(x);
} else {
  x = a !== 67636;
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 67636
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
