# Preval test case

# math_log2_direct_0args.md

> Builtins cases > Ai math > Math log2 direct 0args
>
> Test: Math.log2() with 0 arguments

## Input

`````js filename=intro
// Input: Math.log2()
// Expected: -Infinity (log2(0) is -Infinity)
$(Math.log2())
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
const tmpMCF = $Math_log2;
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
