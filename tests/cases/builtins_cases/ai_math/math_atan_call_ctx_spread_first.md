# Preval test case

# math_atan_call_ctx_spread_first.md

> Builtins cases > Ai math > Math atan call ctx spread first
>
> Test Math.atan called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.atan.call({}, 4, 5, 6));
// Expected: 1.3258176636680326
`````


## Settled


`````js filename=intro
$(1.3258176636680326);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.3258176636680326);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.3258176636680326 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 4, 5, 6);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atan


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.3258176636680326
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
