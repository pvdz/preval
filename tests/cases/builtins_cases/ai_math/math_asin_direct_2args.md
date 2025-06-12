# Preval test case

# math_asin_direct_2args.md

> Builtins cases > Ai math > Math asin direct 2args
>
> Test Math.asin called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.asin(-1, 2));
// Expected: -1.5707963267948966
`````


## Settled


`````js filename=intro
$(-1.5707963267948966);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1.5707963267948966);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1.5707963267948966 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asin;
const tmpArgOverflow = -1;
let tmpCalleeParam = $Math_asin(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1.5707963267948966
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
