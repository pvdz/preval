# Preval test case

# math_fround_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math fround call ctx spread first 4args
>
> Test Math.fround called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.fround.call({}, 7.77, 8.88, 9.99, 10.1));
// Expected: 7.769999980926514
`````


## Settled


`````js filename=intro
$(7.769999980926514);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(7.769999980926514);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 7.769999980926514 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_fround;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 7.77, 8.88, 9.99, 10.1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7.769999980926514
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
