# Preval test case

# subnormal.md

> Math > Subnormal
>
>

## Input

`````js filename=intro
const n = 5e-324; // Smallest positive subnormal number
$(n); // "5e-324"
const n2 = 1e-325;
$(n2); // "0"
`````


## Settled


`````js filename=intro
$(5e-324);
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5e-324);
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 5e-324 );
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const n = 5e-324;
$(n);
const n2 = 0;
$(n2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5e-324
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
