# Preval test case

# math_cbrt_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math cbrt call ctx spread first 4args
>
> Test Math.cbrt called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.cbrt.call({}, 512, 729, 1000, 1331));
// Expected: 8
`````


## Settled


`````js filename=intro
$(8);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(8);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 8 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cbrt;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 512, 729, 1000, 1331);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cbrt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
