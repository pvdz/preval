# Preval test case

# math_atan2_call_ctx_3args.md

> Builtins cases > Ai math > Math atan2 call ctx 3args
>
> Test Math.atan2 called with .call and object context, three arguments (only first two are used)

## Input

`````js filename=intro
$(Math.atan2.call({}, -2, 0, 1));
// Expected: -1.5707963267948966
`````


## Settled


`````js filename=intro
$(-1.5707963267948966);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1.5707963267948966);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1.5707963267948966 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -2, 0, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atan2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1.5707963267948966
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
