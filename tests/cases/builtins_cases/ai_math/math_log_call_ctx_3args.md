# Preval test case

# math_log_call_ctx_3args.md

> Builtins cases > Ai math > Math log call ctx 3args
>
> Test: Math.log.call with 3 arguments and a context

## Input

`````js filename=intro
// Input: Math.log.call({}, 100, 2, 3)
// Expected: 4.605170185988092 (context is ignored, only the first argument is used)
$(Math.log.call({}, 100, 2, 3))
// => 4.605170185988092
`````


## Settled


`````js filename=intro
$(4.605170185988092);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4.605170185988092);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4.605170185988092 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 100, 2, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4.605170185988092
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
