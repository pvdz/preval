# Preval test case

# math_acos_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math acos call ctx spread first 4args
>
> Test Math.acos called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.acos.call({}, 0.4, 0.6, 0.8, 1.0));
// Expected: 1.1592794807274085
`````


## Settled


`````js filename=intro
$(1.1592794807274085);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.1592794807274085);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.1592794807274085 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.4, 0.6, 0.8, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_acos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.1592794807274085
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
