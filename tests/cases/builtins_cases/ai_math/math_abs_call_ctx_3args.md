# Preval test case

# math_abs_call_ctx_3args.md

> Builtins cases > Ai math > Math abs call ctx 3args
>
> Test Math.abs called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.abs.call({}, -9, 1, 0));
// Expected: 9
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
const tmpMCOO = $Math_abs;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -9, 1, 0);
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
