# Preval test case

# math_log10_call_ctx_4args.md

> Builtins cases > Ai math > Math log10 call ctx 4args
>
> Test: Math.log10.call with 4 arguments and a context

## Input

`````js filename=intro
// Input: Math.log10.call({}, 100000, 2, 3, 4)
// Expected: 5 (context is ignored, only the first argument is used)
$(Math.log10.call({}, 100000, 2, 3, 4))
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
const tmpMCOO = $Math_log10;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 100000, 2, 3, 4);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log10


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
