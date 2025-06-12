# Preval test case

# math_cbrt_call_ctx_2args.md

> Builtins cases > Ai math > Math cbrt call ctx 2args
>
> Test Math.cbrt called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.cbrt.call({}, -8, 1));
// Expected: -2
`````


## Settled


`````js filename=intro
$(-2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cbrt;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -8, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cbrt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
