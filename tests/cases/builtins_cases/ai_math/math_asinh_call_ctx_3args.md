# Preval test case

# math_asinh_call_ctx_3args.md

> Builtins cases > Ai math > Math asinh call ctx 3args
>
> Test Math.asinh called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.asinh.call({}, 7, 1, 0));
// Expected: 2.644120761058629
`````


## Settled


`````js filename=intro
$(2.644120761058629);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.644120761058629);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.644120761058629 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asinh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 7, 1, 0);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.644120761058629
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
