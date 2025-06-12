# Preval test case

# math_cos_call_ctx_spread_first.md

> Builtins cases > Ai math > Math cos call ctx spread first
>
> Test Math.cos called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.cos.call({}, 6, 7, 8));
// Expected: 0.960170286650366
`````


## Settled


`````js filename=intro
$(0.9601702866503661);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.9601702866503661);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.9601702866503661 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 6, 7, 8);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.9601702866503661
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
