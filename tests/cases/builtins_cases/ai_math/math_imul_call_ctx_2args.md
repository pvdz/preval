# Preval test case

# math_imul_call_ctx_2args.md

> Builtins cases > Ai math > Math imul call ctx 2args
>
> Test: Math.imul.call with 2 arguments and a context

## Input

`````js filename=intro
// Input: Math.imul.call({}, 6, 3)
// Expected: 18 (context is ignored, 6 * 3)
$(Math.imul.call({}, 6, 3))
// => 18
`````


## Settled


`````js filename=intro
$(18);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(18);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 18 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_imul;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 6, 3);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 18
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
