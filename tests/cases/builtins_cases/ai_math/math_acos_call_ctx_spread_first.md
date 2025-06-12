# Preval test case

# math_acos_call_ctx_spread_first.md

> Builtins cases > Ai math > Math acos call ctx spread first
>
> Test Math.acos called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.acos.call({}, 0.8, 0.5, 0.2));
// Expected: 0.6435011090005064
`````


## Settled


`````js filename=intro
$(0.6435011087932843);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.6435011087932843);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.6435011087932843 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.8, 0.5, 0.2);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_acos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.6435011087932843
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
