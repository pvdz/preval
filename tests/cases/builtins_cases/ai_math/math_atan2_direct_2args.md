# Preval test case

# math_atan2_direct_2args.md

> Builtins cases > Ai math > Math atan2 direct 2args
>
> Test Math.atan2 called directly with two arguments (1, 1)

## Input

`````js filename=intro
$(Math.atan2(1, 1));
// Expected: 0.7853981633974483
`````


## Settled


`````js filename=intro
$(0.7853981633974483);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.7853981633974483);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.7853981633974483 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atan2;
let tmpCalleeParam = 0.7853981633974483;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.7853981633974483
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
