# Preval test case

# math_asinh_call_ctx_1arg.md

> Builtins cases > Ai math > Math asinh call ctx 1arg
>
> Test Math.asinh called with .call and object context, one argument (3)

## Input

`````js filename=intro
$(Math.asinh.call({}, 3));
// Expected: 1.8184464592320668
`````


## Settled


`````js filename=intro
$(1.8184464592320668);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.8184464592320668);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.8184464592320668 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asinh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.8184464592320668
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
