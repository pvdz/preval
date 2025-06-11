# Preval test case

# math_log1p_negone.md

> Math > Ai > Math log1p negone
>
> Math.log1p(-1)

## Input

`````js filename=intro
const a = $(Math.log1p(-1));
$(a);
// Should be -Infinity
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($Number_NEGATIVE_INFINITY));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NEGATIVE_INFINITY );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log1p;
let tmpCalleeParam = $Number_NEGATIVE_INFINITY;
const a = $($Number_NEGATIVE_INFINITY);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -Infinity
 - 2: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
