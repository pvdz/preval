# Preval test case

# math_log10_call_ctx_1arg.md

> Builtins cases > Ai math > Math log10 call ctx 1arg
>
> Test: Math.log10.call with 1 argument and a context

## Input

`````js filename=intro
// Input: Math.log10.call({}, 100)
// Expected: 2 (context is ignored, log10(100) is 2)
$(Math.log10.call({}, 100))
// => 2
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_log10;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 100);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log10


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
