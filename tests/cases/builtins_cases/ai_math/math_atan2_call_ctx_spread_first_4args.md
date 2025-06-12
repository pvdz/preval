# Preval test case

# math_atan2_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math atan2 call ctx spread first 4args
>
> Test Math.atan2 called with .call and object context, spread as first argument (four values, only first two are used)

## Input

`````js filename=intro
$(Math.atan2.call({}, 9, 10, 11, 12));
// Expected: 0.7328151017865066
`````


## Settled


`````js filename=intro
$(0.7328151017865066);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.7328151017865066);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.7328151017865066 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 9, 10, 11, 12);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atan2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.7328151017865066
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
