# Preval test case

# math_floor_call_ctx_2args.md

> Builtins cases > Ai math > Math floor call ctx 2args
>
> Test Math.floor called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.floor.call({}, -2.8, 1));
// Expected: -3
`````


## Settled


`````js filename=intro
$(-3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_floor;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -2.8, 1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
