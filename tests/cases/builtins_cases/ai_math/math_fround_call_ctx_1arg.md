# Preval test case

# math_fround_call_ctx_1arg.md

> Builtins cases > Ai math > Math fround call ctx 1arg
>
> Test Math.fround called with .call and object context, one argument (2.71828)

## Input

`````js filename=intro
$(Math.fround.call({}, 2.71828));
// Expected: 2.718280076980591
`````


## Settled


`````js filename=intro
$(2.718280076980591);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.718280076980591);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.718280076980591 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_fround;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 2.71828);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.718280076980591
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
