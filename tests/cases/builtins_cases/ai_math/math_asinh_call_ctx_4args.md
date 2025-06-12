# Preval test case

# math_asinh_call_ctx_4args.md

> Builtins cases > Ai math > Math asinh call ctx 4args
>
> Test Math.asinh called with .call and object context, four arguments (only first is used)

## Input

`````js filename=intro
$(Math.asinh.call({}, 12, 2, 3, 4));
// Expected: 3.1780538303479458
`````


## Settled


`````js filename=intro
$(3.179785437699879);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3.179785437699879);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3.179785437699879 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asinh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 12, 2, 3, 4);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3.179785437699879
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
