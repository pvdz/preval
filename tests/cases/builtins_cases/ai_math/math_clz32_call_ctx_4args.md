# Preval test case

# math_clz32_call_ctx_4args.md

> Builtins cases > Ai math > Math clz32 call ctx 4args
>
> Test Math.clz32 called with .call and object context, four arguments (only first is used)

## Input

`````js filename=intro
$(Math.clz32.call({}, 0x1, 2, 3, 4));
// Expected: 31
`````


## Settled


`````js filename=intro
$(31);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(31);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 31 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_clz32;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 1, 2, 3, 4);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 31
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
