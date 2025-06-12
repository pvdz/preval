# Preval test case

# math_fround_call_ctx_2args.md

> Builtins cases > Ai math > Math fround call ctx 2args
>
> Test Math.fround called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.fround.call({}, -3.14, 1));
// Expected: -3.140000104904175
`````


## Settled


`````js filename=intro
$(-3.140000104904175);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-3.140000104904175);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -3.140000104904175 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_fround;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -3.14, 1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -3.140000104904175
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
