# Preval test case

# math_hypot_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math hypot call ctx spread first 4args
>
> Test Math.hypot called with .call and object context, spread as first argument (four values)

## Input

`````js filename=intro
$(Math.hypot.call({}, 2, 4, 6, 8));
// Expected: 10.198039027185569
`````


## Settled


`````js filename=intro
$(10.954451150103322);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10.954451150103322);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10.954451150103322 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_hypot;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 2, 4, 6, 8);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_hypot


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10.954451150103322
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
