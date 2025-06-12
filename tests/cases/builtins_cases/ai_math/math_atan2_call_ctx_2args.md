# Preval test case

# math_atan2_call_ctx_2args.md

> Builtins cases > Ai math > Math atan2 call ctx 2args
>
> Test Math.atan2 called with .call and object context, two arguments (2, 2)

## Input

`````js filename=intro
$(Math.atan2.call({}, 2, 2));
// Expected: 0.7853981633974483
`````


## Settled


`````js filename=intro
$(0.7853981633974483);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.7853981633974483);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.7853981633974483 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 2, 2);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atan2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.7853981633974483
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
