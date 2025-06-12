# Preval test case

# math_exp_call_ctx_2args.md

> Builtins cases > Ai math > Math exp call ctx 2args
>
> Test Math.exp called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.exp.call({}, -2, 1));
// Expected: 0.1353352832366127
`````


## Settled


`````js filename=intro
$(0.1353352832366127);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.1353352832366127);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.1353352832366127 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_exp;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -2, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_exp


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.1353352832366127
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
