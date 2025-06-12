# Preval test case

# math_min_direct_0args.md

> Builtins cases > Ai math > Math min direct 0args
>
> Test: Math.min() with 0 arguments

## Input

`````js filename=intro
// Input: Math.min()
// Expected: Infinity (no arguments returns Infinity)
$(Math.min())
// => Infinity
`````


## Settled


`````js filename=intro
$($Number_POSITIVE_INFINITY);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_POSITIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_POSITIVE_INFINITY );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_min;
let tmpCalleeParam = $Number_POSITIVE_INFINITY;
$($Number_POSITIVE_INFINITY);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
