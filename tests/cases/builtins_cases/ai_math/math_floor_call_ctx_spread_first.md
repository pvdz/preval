# Preval test case

# math_floor_call_ctx_spread_first.md

> Builtins cases > Ai math > Math floor call ctx spread first
>
> Test Math.floor called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.floor.call({}, 2.8, 3.9, 4.1));
// Expected: 2
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_floor;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 2.8, 3.9, 4.1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
