# Preval test case

# math_abs_call_ctx_4args.md

> Builtins cases > Ai math > Math abs call ctx 4args
>
> Test Math.abs called with .call and object context, four arguments (only first is used)

## Input

`````js filename=intro
$(Math.abs.call({}, -15, 3, 2, 1));
// Expected: 15
`````


## Settled


`````js filename=intro
$(15);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(15);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 15 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_abs;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -15, 3, 2, 1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
