# Preval test case

# math_clz32_call_ctx_3args.md

> Builtins cases > Ai math > Math clz32 call ctx 3args
>
> Test Math.clz32 called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.clz32.call({}, 0x7FFFFFFF, 0, 1));
// Expected: 1
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_clz32;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 2147483647, 0, 1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
