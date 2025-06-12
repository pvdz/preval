# Preval test case

# math_log1p_call_ctx_1arg.md

> Builtins cases > Ai math > Math log1p call ctx 1arg
>
> Test: Math.log1p.call with 1 argument and a context

## Input

`````js filename=intro
// Input: Math.log1p.call({}, 1)
// Expected: 0.6931471805599453 (context is ignored, log1p(1) is ln(2))
$(Math.log1p.call({}, 1))
// => 0.6931471805599453
`````


## Settled


`````js filename=intro
$(0.6931471805599453);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.6931471805599453);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.6931471805599453 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log1p;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log1p


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.6931471805599453
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
