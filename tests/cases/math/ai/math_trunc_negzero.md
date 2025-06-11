# Preval test case

# math_trunc_negzero.md

> Math > Ai > Math trunc negzero
>
> Math.trunc of -0

## Input

`````js filename=intro
const a = $(Math.trunc(-0.5));
$(a);
// Should be -0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(-0);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(-0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( -0 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_trunc;
let tmpCalleeParam = -0;
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
