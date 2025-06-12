# Preval test case

# math_atan2_call_ctx_spread_first.md

> Builtins cases > Ai math > Math atan2 call ctx spread first
>
> Test Math.atan2 called with .call and object context, spread as first argument (three values, only first two are used)

## Input

`````js filename=intro
$(Math.atan2.call({}, 5, 6, 7));
// Expected: 0.6947382761967034
`````


## Settled


`````js filename=intro
$(0.6947382761967033);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.6947382761967033);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.6947382761967033 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 5, 6, 7);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atan2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.6947382761967033
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
