# Preval test case

# math_sinh_call_ctx_spread_second.md

> Builtins cases > Ai math > Math sinh call ctx spread second
>
> Test Math.sinh with call context and spread operator on second argument

## Input

`````js filename=intro
const num = 1;
const args = [2];
$(Math.sinh.call(null, num, ...args));
// Expected: 1.1752011936438014
`````


## Settled


`````js filename=intro
$(1.1752011936438014);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.1752011936438014);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.1752011936438014 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = 1;
const args = [2];
const tmpMCOO = $Math_sinh;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, null, num, ...args);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_sinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.1752011936438014
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
