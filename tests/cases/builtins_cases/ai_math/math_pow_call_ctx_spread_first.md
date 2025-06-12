# Preval test case

# math_pow_call_ctx_spread_first.md

> Builtins cases > Ai math > Math pow call ctx spread first
>
> Test Math.pow with call context and spread operator on first argument

## Input

`````js filename=intro
const args = [2, 3];
const result = Math.pow.call(null, ...args);
$(result === 8);
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const args = [2, 3];
const tmpMCOO = $Math_pow;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, null, ...args);
let tmpCalleeParam = result === 8;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_pow


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
