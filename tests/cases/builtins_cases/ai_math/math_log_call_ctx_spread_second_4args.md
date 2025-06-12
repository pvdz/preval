# Preval test case

# math_log_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math log call ctx spread second 4args
>
> Test: Math.log.call({}, 1000, ...[2, 3, 4]) (spread as second argument with context, 4 values)

## Input

`````js filename=intro
// Input: Math.log.call({}, 1000, ...[2, 3, 4])
// Expected: 6.907755278982137 (context is ignored, only the first argument is used)
$(Math.log.call({}, 1000, ...[2, 3, 4]))
// => 6.907755278982137
`````


## Settled


`````js filename=intro
$(6.907755278982137);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(6.907755278982137);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 6.907755278982137 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
const tmpMCSP = [2, 3, 4];
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 1000, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6.907755278982137
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
