# Preval test case

# math_max_direct_0args.md

> Builtins cases > Ai math > Math max direct 0args
>
> Test: Math.max() with 0 arguments

## Input

`````js filename=intro
// Input: Math.max()
// Expected: -Infinity (no arguments returns -Infinity)
$(Math.max())
// => -Infinity
`````


## Settled


`````js filename=intro
$($Number_NEGATIVE_INFINITY);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NEGATIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NEGATIVE_INFINITY );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_max;
let tmpCalleeParam = $Number_NEGATIVE_INFINITY;
$($Number_NEGATIVE_INFINITY);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
