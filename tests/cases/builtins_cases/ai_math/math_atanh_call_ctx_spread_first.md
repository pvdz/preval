# Preval test case

# math_atanh_call_ctx_spread_first.md

> Builtins cases > Ai math > Math atanh call ctx spread first
>
> Test Math.atanh called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.atanh.call({}, 0.8, 0.5, 0.2));
// Expected: 1.0986122886681098
`````


## Settled


`````js filename=intro
$(1.0986122886681098);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.0986122886681098);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.0986122886681098 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atanh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.8, 0.5, 0.2);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atanh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.0986122886681098
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
