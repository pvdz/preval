# Preval test case

# math_imul_call_ctx_1arg.md

> Builtins cases > Ai math > Math imul call ctx 1arg
>
> Test: Math.imul.call with 1 argument and a context

## Input

`````js filename=intro
// Input: Math.imul.call({}, 7)
// Expected: 0 (context is ignored, missing second argument is treated as 0)
$(Math.imul.call({}, 7))
// => 0
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_imul;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 7);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
