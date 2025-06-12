# Preval test case

# math_asin_direct_1arg.md

> Builtins cases > Ai math > Math asin direct 1arg
>
> Test Math.asin called directly with one argument (0.5)

## Input

`````js filename=intro
$(Math.asin(0.5));
// Expected: 0.5235987755982989
`````


## Settled


`````js filename=intro
$(0.5235987755982989);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.5235987755982989);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.5235987755982989 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asin;
let tmpCalleeParam = 0.5235987755982989;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.5235987755982989
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
