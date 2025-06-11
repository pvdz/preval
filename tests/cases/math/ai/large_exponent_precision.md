# Preval test case

# large_exponent_precision.md

> Math > Ai > Large exponent precision
>
> Large exponent addition precision

## Input

`````js filename=intro
const a = $(1e308 + 1e292);
$(a);
// Should be 1e308
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1.0000000000000002e308);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1.0000000000000002e308));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1.0000000000000002e+308 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 1.0000000000000002e308;
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.0000000000000002e308
 - 2: 1.0000000000000002e308
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
