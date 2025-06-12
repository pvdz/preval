# Preval test case

# math_acos_call_ctx_3args.md

> Builtins cases > Ai math > Math acos call ctx 3args
>
> Test Math.acos called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.acos.call({}, 0.75, 0, 1));
// Expected: 0.7227342478134157
`````


## Settled


`````js filename=intro
$(0.7227342478134157);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.7227342478134157);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.7227342478134157 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.75, 0, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_acos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.7227342478134157
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
