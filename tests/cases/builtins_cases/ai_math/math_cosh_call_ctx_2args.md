# Preval test case

# math_cosh_call_ctx_2args.md

> Builtins cases > Ai math > Math cosh call ctx 2args
>
> Test Math.cosh called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.cosh.call({}, -2, 1));
// Expected: 3.7621956910836314
`````


## Settled


`````js filename=intro
$(3.7621956910836314);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3.7621956910836314);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3.7621956910836314 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cosh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -2, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3.7621956910836314
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
