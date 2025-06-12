# Preval test case

# math_hypot_direct_3args.md

> Builtins cases > Ai math > Math hypot direct 3args
>
> Test Math.hypot called directly with three arguments (2, 3, 6)

## Input

`````js filename=intro
$(Math.hypot(2, 3, 6));
// Expected: 6.782329983125268
`````


## Settled


`````js filename=intro
$(7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(7);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 7 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_hypot;
let tmpCalleeParam = 7;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
