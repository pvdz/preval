# Preval test case

# math_hypot_call_ctx_spread_first.md

> Builtins cases > Ai math > Math hypot call ctx spread first
>
> Test Math.hypot called with .call and object context, spread as first argument (three values)

## Input

`````js filename=intro
$(Math.hypot.call({}, 6, 8, 10));
// Expected: 14
`````


## Settled


`````js filename=intro
$(14.142135623730951);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(14.142135623730951);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 14.142135623730951 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_hypot;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 6, 8, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_hypot


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 14.142135623730951
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
