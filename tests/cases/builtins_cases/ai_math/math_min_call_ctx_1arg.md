# Preval test case

# math_min_call_ctx_1arg.md

> Builtins cases > Ai math > Math min call ctx 1arg
>
> Test: Math.min.call with 1 argument and a context

## Input

`````js filename=intro
// Input: Math.min.call({}, 7)
// Expected: 7 (context is ignored, single argument returns itself)
$(Math.min.call({}, 7))
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
const tmpMCOO = $Math_min;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 7);
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
