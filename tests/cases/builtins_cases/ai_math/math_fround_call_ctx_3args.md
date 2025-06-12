# Preval test case

# math_fround_call_ctx_3args.md

> Builtins cases > Ai math > Math fround call ctx 3args
>
> Test Math.fround called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.fround.call({}, 1.61803, 0, 1));
// Expected: 1.618030071258545
`````


## Settled


`````js filename=intro
$(1.6180299520492554);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.6180299520492554);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.6180299520492554 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_fround;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 1.61803, 0, 1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.6180299520492554
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
