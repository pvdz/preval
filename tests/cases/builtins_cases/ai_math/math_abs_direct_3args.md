# Preval test case

# math_abs_direct_3args.md

> Builtins cases > Ai math > Math abs direct 3args
>
> Test Math.abs called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.abs(-8, 2, 1));
// Expected: 8
`````


## Settled


`````js filename=intro
$(8);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(8);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 8 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
const tmpArgOverflow = -8;
let tmpCalleeParam = $Math_abs(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
