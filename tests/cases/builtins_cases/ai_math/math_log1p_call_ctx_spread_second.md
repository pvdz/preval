# Preval test case

# math_log1p_call_ctx_spread_second.md

> Builtins cases > Ai math > Math log1p call ctx spread second
>
> Test: Math.log1p.call({}, 2, ...[3]) (spread as second argument with context)

## Input

`````js filename=intro
// Input: Math.log1p.call({}, 2, ...[3])
// Expected: 1.0986122886681096 (context is ignored, only the first argument is used)
$(Math.log1p.call({}, 2, ...[3]))
// => 1.0986122886681096
`````


## Settled


`````js filename=intro
$(1.0986122886681096);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.0986122886681096);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.0986122886681096 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log1p;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
const tmpMCSP = [3];
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log1p


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.0986122886681096
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
