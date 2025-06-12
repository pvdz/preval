# Preval test case

# math_atanh_call_ctx_3args.md

> Builtins cases > Ai math > Math atanh call ctx 3args
>
> Test Math.atanh called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.atanh.call({}, 0.75, 0, 1));
// Expected: 0.9729550745276566
`````


## Settled


`````js filename=intro
$(0.9729550745276566);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.9729550745276566);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.9729550745276566 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atanh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.75, 0, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atanh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.9729550745276566
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
