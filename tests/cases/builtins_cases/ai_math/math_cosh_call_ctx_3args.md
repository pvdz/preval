# Preval test case

# math_cosh_call_ctx_3args.md

> Builtins cases > Ai math > Math cosh call ctx 3args
>
> Test Math.cosh called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.cosh.call({}, 1, 0, 1));
// Expected: 1.5430806348152437
`````


## Settled


`````js filename=intro
$(1.5430806348152437);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.5430806348152437);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.5430806348152437 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cosh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 1, 0, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.5430806348152437
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
