# Preval test case

# math_fround_call_ctx_spread_first.md

> Builtins cases > Ai math > Math fround call ctx spread first
>
> Test Math.fround called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.fround.call({}, 6.28, 7.39, 8.41));
// Expected: 6.28000020980835
`````


## Settled


`````js filename=intro
$(6.28000020980835);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(6.28000020980835);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 6.28000020980835 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_fround;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 6.28, 7.39, 8.41);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6.28000020980835
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
