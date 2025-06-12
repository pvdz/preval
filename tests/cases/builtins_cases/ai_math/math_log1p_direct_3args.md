# Preval test case

# math_log1p_direct_3args.md

> Builtins cases > Ai math > Math log1p direct 3args
>
> Test: Math.log1p() with 3 arguments

## Input

`````js filename=intro
// Input: Math.log1p(3, 4, 5)
// Expected: 1.3862943611198906 (only the first argument is used)
$(Math.log1p(3, 4, 5))
// => 1.3862943611198906
`````


## Settled


`````js filename=intro
$(1.3862943611198906);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.3862943611198906);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.3862943611198906 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log1p;
const tmpArgOverflow = 3;
let tmpCalleeParam = $Math_log1p(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.3862943611198906
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
