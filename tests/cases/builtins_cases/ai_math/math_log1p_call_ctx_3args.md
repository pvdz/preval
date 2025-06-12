# Preval test case

# math_log1p_call_ctx_3args.md

> Builtins cases > Ai math > Math log1p call ctx 3args
>
> Test: Math.log1p.call with 3 arguments and a context

## Input

`````js filename=intro
// Input: Math.log1p.call({}, 3, 4, 5)
// Expected: 1.3862943611198906 (context is ignored, only the first argument is used)
$(Math.log1p.call({}, 3, 4, 5))
// => 1.3862943611198906
`````


## Settled


`````js filename=intro
$(1.3862943611198906);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.3862943611198906);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.3862943611198906 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log1p;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 3, 4, 5);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log1p


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.3862943611198906
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
