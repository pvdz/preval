# Preval test case

# math_acos_call_ctx_2args.md

> Builtins cases > Ai math > Math acos call ctx 2args
>
> Test Math.acos called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.acos.call({}, -0.5, 1));
// Expected: 2.0943951023931957
`````


## Settled


`````js filename=intro
$(2.0943951023931957);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.0943951023931957);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.0943951023931957 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -0.5, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_acos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.0943951023931957
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
