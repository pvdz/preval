# Preval test case

# math_asin_call_ctx_1arg.md

> Builtins cases > Ai math > Math asin call ctx 1arg
>
> Test Math.asin called with .call and object context, one argument (0.25)

## Input

`````js filename=intro
$(Math.asin.call({}, 0.25));
// Expected: 0.25268025514207865
`````


## Settled


`````js filename=intro
$(0.25268025514207865);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.25268025514207865);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.25268025514207865 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asin;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.25);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.25268025514207865
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
