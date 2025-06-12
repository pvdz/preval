# Preval test case

# math_log1p_direct_0args.md

> Builtins cases > Ai math > Math log1p direct 0args
>
> Test: Math.log1p() with 0 arguments

## Input

`````js filename=intro
// Input: Math.log1p()
// Expected: 0 (log1p(0) is 0)
$(Math.log1p())
// => 0
`````


## Settled


`````js filename=intro
$($Number_NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log1p;
let tmpCalleeParam = NaN;
$($Number_NaN);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
