# Preval test case

# math_atanh_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math atanh call ctx spread first 4args
>
> Test Math.atanh called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.atanh.call({}, 0.4, 0.6, 0.8, 1.0));
// Expected: 0.42364893019360184
`````


## Settled


`````js filename=intro
$(0.42364893019360184);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.42364893019360184);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.42364893019360184 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atanh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.4, 0.6, 0.8, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atanh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.42364893019360184
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
