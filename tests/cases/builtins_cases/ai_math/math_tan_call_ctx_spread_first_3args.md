# Preval test case

# math_tan_call_ctx_spread_first_3args.md

> Builtins cases > Ai math > Math tan call ctx spread first 3args
>
> Test Math.tan with call context and spread operator on first argument with 3 total arguments

## Input

`````js filename=intro
const args = [0, 2, 3];
$(Math.tan.call(null, ...args));
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
const args = [0, 2, 3];
const tmpMCOO = $Math_tan;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, null, ...args);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_tan


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
