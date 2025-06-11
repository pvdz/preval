# Preval test case

# parseInt_float_precision.md

> Math > Ai > ParseInt float precision
>
> parseInt on float with large exponent

## Input

`````js filename=intro
const a = $(parseInt("1e21"));
$(a);
// Should be 1
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 1;
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
