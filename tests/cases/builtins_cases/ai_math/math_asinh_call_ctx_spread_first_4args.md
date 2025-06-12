# Preval test case

# math_asinh_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math asinh call ctx spread first 4args
>
> Test Math.asinh called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.asinh.call({}, 8, 9, 10, 11));
// Expected: 2.776472280523045
`````


## Settled


`````js filename=intro
$(2.7764722807237177);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.7764722807237177);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.7764722807237177 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asinh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 8, 9, 10, 11);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_asinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.7764722807237177
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
