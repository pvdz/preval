# Preval test case

# math_max_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math max call ctx spread first 4args
>
> Test: Math.max.call({}, ...[7, 3, 9, 2]) (spread as first argument with context, 4 values)

## Input

`````js filename=intro
// Input: Math.max.call({}, ...[7, 3, 9, 2])
// Expected: 9 (context is ignored, returns the largest argument)
$(Math.max.call({}, ...[7, 3, 9, 2]))
// => 9
`````


## Settled


`````js filename=intro
$(9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(9);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 9 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_max;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
const tmpMCSP = [7, 3, 9, 2];
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
