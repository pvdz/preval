# Preval test case

# math_log2_call_ctx_3args.md

> Builtins cases > Ai math > Math log2 call ctx 3args
>
> Test: Math.log2.call with 3 arguments and a context

## Input

`````js filename=intro
// Input: Math.log2.call({}, 32, 2, 3)
// Expected: 5 (context is ignored, only the first argument is used)
$(Math.log2.call({}, 32, 2, 3))
// => 5
`````


## Settled


`````js filename=intro
$(5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 32, 2, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
