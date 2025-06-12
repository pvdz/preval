# Preval test case

# math_asin_call_ctx_4args.md

> Builtins cases > Ai math > Math asin call ctx 4args
>
> Test Math.asin called with .call and object context, four arguments (only first is used)

## Input

`````js filename=intro
$(Math.asin.call({}, 0.1, 2, 3, 4));
// Expected: 0.1001674211615598
`````


## Settled


`````js filename=intro
$(0.1001674211615598);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.1001674211615598);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.1001674211615598 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asin;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.1, 2, 3, 4);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.1001674211615598
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
