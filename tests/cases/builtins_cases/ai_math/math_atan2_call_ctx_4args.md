# Preval test case

# math_atan2_call_ctx_4args.md

> Builtins cases > Ai math > Math atan2 call ctx 4args
>
> Test Math.atan2 called with .call and object context, four arguments (only first two are used)

## Input

`````js filename=intro
$(Math.atan2.call({}, 0, -2, 1, 3));
// Expected: 3.141592653589793
`````


## Settled


`````js filename=intro
$(3.141592653589793);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3.141592653589793);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3.141592653589793 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0, -2, 1, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atan2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3.141592653589793
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
