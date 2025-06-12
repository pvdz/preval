# Preval test case

# math_round_call_ctx_spread_first.md

> Builtins cases > Ai math > Math round call ctx spread first
>
> Test Math.round with call context and spread operator on first argument

## Input

`````js filename=intro
const args = [3.7];
$(Math.round.call(null, ...args));
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const args = [3.7];
const tmpMCOO = $Math_round;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, null, ...args);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
