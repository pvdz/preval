# Preval test case

# math_imul_call_ctx_spread_first.md

> Builtins cases > Ai math > Math imul call ctx spread first
>
> Test: Math.imul.call({}, ...[2, 4]) (spread as first argument with context)

## Input

`````js filename=intro
// Input: Math.imul.call({}, ...[2, 4])
// Expected: 8 (context is ignored, 2 * 4)
$(Math.imul.call({}, ...[2, 4]))
// => 8
`````


## Settled


`````js filename=intro
$(8);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(8);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 8 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_imul;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
const tmpMCSP = [2, 4];
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
