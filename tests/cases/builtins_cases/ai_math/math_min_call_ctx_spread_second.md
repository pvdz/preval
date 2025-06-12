# Preval test case

# math_min_call_ctx_spread_second.md

> Builtins cases > Ai math > Math min call ctx spread second
>
> Test: Math.min.call({}, 7, ...[3]) (spread as second argument with context)

## Input

`````js filename=intro
// Input: Math.min.call({}, 7, ...[3])
// Expected: 3 (context is ignored, returns the smallest argument)
$(Math.min.call({}, 7, ...[3]))
// => 3
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
const tmpMCOO = $Math_min;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
const tmpMCSP = [3];
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 7, ...tmpMCSP);
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
