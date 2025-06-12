# Preval test case

# math_clz32_call_ctx_spread_first.md

> Builtins cases > Ai math > Math clz32 call ctx spread first
>
> Test Math.clz32 called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.clz32.call({}, 0x200, 0x400, 0x800));
// Expected: 23
`````


## Settled


`````js filename=intro
$(22);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(22);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 22 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_clz32;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 512, 1024, 2048);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 22
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
