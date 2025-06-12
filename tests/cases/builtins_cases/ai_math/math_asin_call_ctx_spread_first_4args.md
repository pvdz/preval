# Preval test case

# math_asin_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math asin call ctx spread first 4args
>
> Test Math.asin called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.asin.call({}, 0.4, 0.6, 0.8, 1.0));
// Expected: 0.41151684606748806
`````


## Settled


`````js filename=intro
$(0.41151684606748806);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.41151684606748806);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.41151684606748806 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asin;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.4, 0.6, 0.8, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.41151684606748806
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
