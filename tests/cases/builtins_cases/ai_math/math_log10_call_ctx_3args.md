# Preval test case

# math_log10_call_ctx_3args.md

> Builtins cases > Ai math > Math log10 call ctx 3args
>
> Test: Math.log10.call with 3 arguments and a context

## Input

`````js filename=intro
// Input: Math.log10.call({}, 10000, 2, 3)
// Expected: 4 (context is ignored, only the first argument is used)
$(Math.log10.call({}, 10000, 2, 3))
// => 4
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log10;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 10000, 2, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log10


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
