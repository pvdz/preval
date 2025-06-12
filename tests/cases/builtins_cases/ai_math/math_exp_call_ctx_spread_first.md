# Preval test case

# math_exp_call_ctx_spread_first.md

> Builtins cases > Ai math > Math exp call ctx spread first
>
> Test Math.exp called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.exp.call({}, 6, 7, 8));
// Expected: 403.4287934927351
`````


## Settled


`````js filename=intro
$(403.4287934927351);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(403.4287934927351);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 403.4287934927351 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_exp;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 6, 7, 8);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_exp


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 403.4287934927351
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
