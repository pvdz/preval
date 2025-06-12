# Preval test case

# math_floor_direct_3args.md

> Builtins cases > Ai math > Math floor direct 3args
>
> Test Math.floor called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.floor(2.9, 0, -1));
// Expected: 2
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_floor;
const tmpArgOverflow = 2.9;
let tmpCalleeParam = $Math_floor(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
