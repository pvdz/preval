# Preval test case

# math_asin_call_ctx_2args.md

> Builtins cases > Ai math > Math asin call ctx 2args
>
> Test Math.asin called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.asin.call({}, -0.5, 1));
// Expected: -0.5235987755982989
`````


## Settled


`````js filename=intro
$(-0.5235987755982989);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-0.5235987755982989);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -0.5235987755982989 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asin;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -0.5, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -0.5235987755982989
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
