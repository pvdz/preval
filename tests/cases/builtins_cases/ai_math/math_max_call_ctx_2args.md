# Preval test case

# math_max_call_ctx_2args.md

> Builtins cases > Ai math > Math max call ctx 2args
>
> Test: Math.max.call with 2 arguments and a context

## Input

`````js filename=intro
// Input: Math.max.call({}, 7, 3)
// Expected: 7 (context is ignored, returns the largest argument)
$(Math.max.call({}, 7, 3))
// => 7
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
const tmpMCOO = $Math_max;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 7, 3);
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
