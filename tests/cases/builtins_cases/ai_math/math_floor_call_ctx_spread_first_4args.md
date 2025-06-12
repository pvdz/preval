# Preval test case

# math_floor_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math floor call ctx spread first 4args
>
> Test Math.floor called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.floor.call({}, 4.2, 5.3, 6.4, 7.5));
// Expected: 4
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_floor;
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
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
