# Preval test case

# math_log1p_call_ctx_4args.md

> Builtins cases > Ai math > Math log1p call ctx 4args
>
> Test: Math.log1p.call with 4 arguments and a context

## Input

`````js filename=intro
// Input: Math.log1p.call({}, 4, 5, 6, 7)
// Expected: 1.6094379124341003 (context is ignored, only the first argument is used)
$(Math.log1p.call({}, 4, 5, 6, 7))
// => 1.6094379124341003
`````


## Settled


`````js filename=intro
$(1.6094379124341003);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.6094379124341003);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.6094379124341003 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log1p;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 4, 5, 6, 7);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log1p


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.6094379124341003
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
