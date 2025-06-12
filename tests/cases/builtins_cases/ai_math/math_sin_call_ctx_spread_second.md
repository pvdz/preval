# Preval test case

# math_sin_call_ctx_spread_second.md

> Builtins cases > Ai math > Math sin call ctx spread second
>
> Test Math.sin with call context and spread operator on second argument

## Input

`````js filename=intro
const num = 0;
const args = [2];
$(Math.sin.call(null, num, ...args));
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = 0;
const args = [2];
const tmpMCOO = $Math_sin;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, null, num, ...args);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_sin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
