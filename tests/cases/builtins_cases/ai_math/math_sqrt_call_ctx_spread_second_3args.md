# Preval test case

# math_sqrt_call_ctx_spread_second_3args.md

> Builtins cases > Ai math > Math sqrt call ctx spread second 3args
>
> Test Math.sqrt with call context and spread operator on second argument with 3 total arguments

## Input

`````js filename=intro
const num = 4;
const args = [2, 3];
$(Math.sqrt.call(null, num, ...args));
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
const args = [2, 3];
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
