# Preval test case

# math_cosh_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math cosh call ctx spread first 4args
>
> Test Math.cosh called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.cosh.call({}, 7, 8, 9, 10));
// Expected: 548.3170351552122
`````


## Settled


`````js filename=intro
$(548.317035155212);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(548.317035155212);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 548.317035155212 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cosh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 7, 8, 9, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 548.317035155212
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
