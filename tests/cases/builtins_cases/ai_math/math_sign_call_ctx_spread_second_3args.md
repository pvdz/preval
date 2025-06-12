# Preval test case

# math_sign_call_ctx_spread_second_3args.md

> Builtins cases > Ai math > Math sign call ctx spread second 3args
>
> Test Math.sign with call context and spread operator on second argument with 3 total arguments

## Input

`````js filename=intro
const num = -5;
const args = [2, 3];
$(Math.sign.call(null, num, ...args));
`````


## Settled


`````js filename=intro
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = -5;
const args = [2, 3];
const tmpMCOO = $Math_sign;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, null, num, ...args);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
