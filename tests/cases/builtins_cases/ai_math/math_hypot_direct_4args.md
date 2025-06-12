# Preval test case

# math_hypot_direct_4args.md

> Builtins cases > Ai math > Math hypot direct 4args
>
> Test Math.hypot called directly with four arguments (1, 2, 3, 4)

## Input

`````js filename=intro
$(Math.hypot(1, 2, 3, 4));
// Expected: 5.477225575051661
`````


## Settled


`````js filename=intro
$(5.477225575051661);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5.477225575051661);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 5.477225575051661 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_hypot;
let tmpCalleeParam = 5.477225575051661;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5.477225575051661
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
