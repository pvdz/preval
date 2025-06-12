# Preval test case

# math_cosh_call_ctx_1arg.md

> Builtins cases > Ai math > Math cosh call ctx 1arg
>
> Test Math.cosh called with .call and object context, one argument (3)

## Input

`````js filename=intro
$(Math.cosh.call({}, 3));
// Expected: 10.067661995777765
`````


## Settled


`````js filename=intro
$(10.067661995777765);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10.067661995777765);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10.067661995777765 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cosh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_cosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10.067661995777765
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
