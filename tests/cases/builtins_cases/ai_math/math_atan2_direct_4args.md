# Preval test case

# math_atan2_direct_4args.md

> Builtins cases > Ai math > Math atan2 direct 4args
>
> Test Math.atan2 called directly with four arguments (only first two are used)

## Input

`````js filename=intro
$(Math.atan2(0, -1, 2, 3));
// Expected: 3.141592653589793
`````


## Settled


`````js filename=intro
$(3.141592653589793);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3.141592653589793);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3.141592653589793 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atan2;
const tmpArgOverflow = 0;
const tmpArgOverflow$1 = -1;
let tmpCalleeParam = $Math_atan2(tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3.141592653589793
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
