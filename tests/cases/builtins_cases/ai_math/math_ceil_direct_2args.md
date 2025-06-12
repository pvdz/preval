# Preval test case

# math_ceil_direct_2args.md

> Builtins cases > Ai math > Math ceil direct 2args
>
> Test Math.ceil called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.ceil(-1.7, 2));
// Expected: -1
`````


## Settled


`````js filename=intro
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_ceil;
const tmpArgOverflow = -1.7;
let tmpCalleeParam = $Math_ceil(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
