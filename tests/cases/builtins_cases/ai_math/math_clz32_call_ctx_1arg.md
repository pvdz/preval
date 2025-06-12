# Preval test case

# math_clz32_call_ctx_1arg.md

> Builtins cases > Ai math > Math clz32 call ctx 1arg
>
> Test Math.clz32 called with .call and object context, one argument (255)

## Input

`````js filename=intro
$(Math.clz32.call({}, 255));
// Expected: 24
`````


## Settled


`````js filename=intro
$(24);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(24);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 24 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_clz32;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 255);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 24
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
