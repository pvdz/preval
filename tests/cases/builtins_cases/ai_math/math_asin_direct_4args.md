# Preval test case

# math_asin_direct_4args.md

> Builtins cases > Ai math > Math asin direct 4args
>
> Test Math.asin called directly with four arguments (only first is used)

## Input

`````js filename=intro
$(Math.asin(0, 1, 2, 3));
// Expected: 0
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asin;
const tmpArgOverflow = 0;
let tmpCalleeParam = $Math_asin(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
