# Preval test case

# math_log10_direct_0args.md

> Builtins cases > Ai math > Math log10 direct 0args
>
> Test: Math.log10() with 0 arguments

## Input

`````js filename=intro
// Input: Math.log10()
// Expected: -Infinity (log10(0) is -Infinity)
$(Math.log10())
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
const tmpMCF = $Math_log10;
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
