# Preval test case

# math_atan_call_ctx_4args.md

> Builtins cases > Ai math > Math atan call ctx 4args
>
> Test Math.atan called with .call and object context, four arguments (only first is used)

## Input

`````js filename=intro
$(Math.atan.call({}, 12, 2, 3, 4));
// Expected: 1.4876550949064553
`````


## Settled


`````js filename=intro
$(1.4876550949064553);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.4876550949064553);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.4876550949064553 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 12, 2, 3, 4);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atan


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.4876550949064553
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
