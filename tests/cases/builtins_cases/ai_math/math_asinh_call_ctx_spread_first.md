# Preval test case

# math_asinh_call_ctx_spread_first.md

> Builtins cases > Ai math > Math asinh call ctx spread first
>
> Test Math.asinh called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.asinh.call({}, 4, 5, 6));
// Expected: 2.0947125472611012
`````


## Settled


`````js filename=intro
$(2.0947125472611012);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.0947125472611012);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.0947125472611012 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asinh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 4, 5, 6);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.0947125472611012
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
