# Preval test case

# math_log2_call_ctx_2args.md

> Builtins cases > Ai math > Math log2 call ctx 2args
>
> Test: Math.log2.call with 2 arguments and a context

## Input

`````js filename=intro
// Input: Math.log2.call({}, 16, 2)
// Expected: 4 (context is ignored, only the first argument is used)
$(Math.log2.call({}, 16, 2))
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
const tmpMCOO = $Math_log2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 16, 2);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log2


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
