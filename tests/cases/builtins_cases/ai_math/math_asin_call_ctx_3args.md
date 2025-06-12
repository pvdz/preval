# Preval test case

# math_asin_call_ctx_3args.md

> Builtins cases > Ai math > Math asin call ctx 3args
>
> Test Math.asin called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.asin.call({}, 0.75, 0, 1));
// Expected: 0.848062078981481
`````


## Settled


`````js filename=intro
$(0.848062078981481);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.848062078981481);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.848062078981481 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asin;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.75, 0, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.848062078981481
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
