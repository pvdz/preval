# Preval test case

# math_cosh_call_ctx_spread_first.md

> Builtins cases > Ai math > Math cosh call ctx spread first
>
> Test Math.cosh called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.cosh.call({}, 6, 7, 8));
// Expected: 201.7156361224559
`````


## Settled


`````js filename=intro
$(201.7156361224559);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(201.7156361224559);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 201.7156361224559 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cosh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 6, 7, 8);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 201.7156361224559
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
