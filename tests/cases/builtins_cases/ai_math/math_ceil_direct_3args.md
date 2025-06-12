# Preval test case

# math_ceil_direct_3args.md

> Builtins cases > Ai math > Math ceil direct 3args
>
> Test Math.ceil called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.ceil(2.5, 0, -1));
// Expected: 3
`````


## Settled


`````js filename=intro
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_ceil;
const tmpArgOverflow = 2.5;
let tmpCalleeParam = $Math_ceil(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
