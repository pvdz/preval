# Preval test case

# math_clz32_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math clz32 call ctx spread first 4args
>
> Test Math.clz32 called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.clz32.call({}, 0x400, 0x800, 0x1000, 0x2000));
// Expected: 22
`````


## Settled


`````js filename=intro
$(21);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(21);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 21 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_clz32;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 1024, 2048, 4096, 8192);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 21
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
