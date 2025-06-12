# Preval test case

# math_log_direct_0args.md

> Builtins cases > Ai math > Math log direct 0args
>
> Test: Math.log() with 0 arguments

## Input

`````js filename=intro
// Input: Math.log()
// Expected: -Infinity (log(0) is -Infinity)
$(Math.log())
// => -Infinity
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
const tmpMCF = $Math_log;
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
