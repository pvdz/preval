# Preval test case

# math_atanh_one.md

> Math > Ai > Math atanh one
>
> Math.atanh(1) returns Infinity

## Input

`````js filename=intro
const a = $(Math.atanh(1));
$(a);
// Should be Infinity
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_POSITIVE_INFINITY);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($Number_POSITIVE_INFINITY));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_POSITIVE_INFINITY );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atanh;
let tmpCalleeParam = $Number_POSITIVE_INFINITY;
const a = $($Number_POSITIVE_INFINITY);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: Infinity
 - 2: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
