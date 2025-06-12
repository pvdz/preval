# Preval test case

# math_atan2_direct_3args.md

> Builtins cases > Ai math > Math atan2 direct 3args
>
> Test Math.atan2 called directly with three arguments (only first two are used)

## Input

`````js filename=intro
$(Math.atan2(-1, 0, 2));
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
const tmpMCF = $Math_atan2;
const tmpArgOverflow = -1;
const tmpArgOverflow$1 = 0;
let tmpCalleeParam = $Math_atan2(tmpArgOverflow, tmpArgOverflow$1);
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
