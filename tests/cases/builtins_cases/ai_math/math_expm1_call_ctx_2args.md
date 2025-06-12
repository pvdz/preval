# Preval test case

# math_expm1_call_ctx_2args.md

> Builtins cases > Ai math > Math expm1 call ctx 2args
>
> Test Math.expm1 called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.expm1.call({}, -2, 1));
// Expected: -0.8646647167633873
`````


## Settled


`````js filename=intro
$(-0.8646647167633873);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-0.8646647167633873);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -0.8646647167633873 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_expm1;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -2, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_expm1


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -0.8646647167633873
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
