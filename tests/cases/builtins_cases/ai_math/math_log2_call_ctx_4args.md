# Preval test case

# math_log2_call_ctx_4args.md

> Builtins cases > Ai math > Math log2 call ctx 4args
>
> Test: Math.log2.call with 4 arguments and a context

## Input

`````js filename=intro
// Input: Math.log2.call({}, 64, 2, 3, 4)
// Expected: 6 (context is ignored, only the first argument is used)
$(Math.log2.call({}, 64, 2, 3, 4))
// => 6
`````


## Settled


`````js filename=intro
$(6);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(6);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 6 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 64, 2, 3, 4);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
