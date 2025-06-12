# Preval test case

# math_sqrt_call_ctx_spread_second.md

> Builtins cases > Ai math > Math sqrt call ctx spread second
>
> Test Math.sqrt with call context and spread operator on second argument

## Input

`````js filename=intro
const num = 4;
const args = [9];
$(Math.sqrt.call(null, num, ...args));
// Expected: 2
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = 4;
const args = [9];
const tmpMCOO = $Math_sqrt;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, null, num, ...args);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_sqrt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
