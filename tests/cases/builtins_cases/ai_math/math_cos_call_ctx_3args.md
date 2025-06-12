# Preval test case

# math_cos_call_ctx_3args.md

> Builtins cases > Ai math > Math cos call ctx 3args
>
> Test Math.cos called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.cos.call({}, 1, 0, 1));
// Expected: 0.5403023058681398
`````


## Settled


`````js filename=intro
$(0.5403023058681398);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.5403023058681398);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.5403023058681398 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 1, 0, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.5403023058681398
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
