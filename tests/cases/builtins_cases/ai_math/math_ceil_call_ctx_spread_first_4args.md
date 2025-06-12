# Preval test case

# math_ceil_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math ceil call ctx spread first 4args
>
> Test Math.ceil called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.ceil.call({}, 4.2, 5.3, 6.4, 7.5));
// Expected: 5
`````


## Settled


`````js filename=intro
$(5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_ceil;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 4.2, 5.3, 6.4, 7.5);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
