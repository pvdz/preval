# Preval test case

# math_cos_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math cos call ctx spread first 4args
>
> Test Math.cos called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.cos.call({}, 7, 8, 9, 10));
// Expected: 0.7539022543433046
`````


## Settled


`````js filename=intro
$(0.7539022543433046);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.7539022543433046);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.7539022543433046 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 7, 8, 9, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.7539022543433046
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
