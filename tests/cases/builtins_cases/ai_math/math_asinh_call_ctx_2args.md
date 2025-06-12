# Preval test case

# math_asinh_call_ctx_2args.md

> Builtins cases > Ai math > Math asinh call ctx 2args
>
> Test Math.asinh called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.asinh.call({}, 4, 2));
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
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 4, 2);
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
