# Preval test case

# math_ceil_call_ctx_2args.md

> Builtins cases > Ai math > Math ceil call ctx 2args
>
> Test Math.ceil called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.ceil.call({}, -2.8, 1));
// Expected: -2
`````


## Settled


`````js filename=intro
$(-2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_ceil;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -2.8, 1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
