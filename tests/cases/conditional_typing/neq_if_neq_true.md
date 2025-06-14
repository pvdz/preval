# Preval test case

# neq_if_neq_true.md

> Conditional typing > Neq if neq true
>
> Assignment that cannot be observed should be dropped

## Input

`````js filename=intro
const a = $(67636)
let x = a !== 67636;
if (x) {
  x = a !== 67636;
} else {
}
$(x)
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(67636);
const x /*:boolean*/ = a !== 67636;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(67636) !== 67636);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 67636 );
const b = a !== 67636;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
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
 - 1: 67636
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
