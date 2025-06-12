# Preval test case

# math_expm1_call_ctx_1arg.md

> Builtins cases > Ai math > Math expm1 call ctx 1arg
>
> Test Math.expm1 called with .call and object context, one argument (3)

## Input

`````js filename=intro
$(Math.expm1.call({}, 3));
// Expected: 19.085536923187668
`````


## Settled


`````js filename=intro
$(19.085536923187668);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(19.085536923187668);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 19.085536923187668 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_expm1;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_expm1


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 19.085536923187668
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
