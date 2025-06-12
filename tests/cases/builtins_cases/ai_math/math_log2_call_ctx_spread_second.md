# Preval test case

# math_log2_call_ctx_spread_second.md

> Builtins cases > Ai math > Math log2 call ctx spread second
>
> Test: Math.log2.call({}, 16, ...[2]) (spread as second argument with context)

## Input

`````js filename=intro
// Input: Math.log2.call({}, 16, ...[2])
// Expected: 4 (context is ignored, only the first argument is used)
$(Math.log2.call({}, 16, ...[2]))
// => 4
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
const tmpMCSP = [2];
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 16, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
