# Preval test case

# math_atanh_call_ctx_1arg.md

> Builtins cases > Ai math > Math atanh call ctx 1arg
>
> Test Math.atanh called with .call and object context, one argument (0.25)

## Input

`````js filename=intro
$(Math.atanh.call({}, 0.25));
// Expected: 0.25541281188299536
`````


## Settled


`````js filename=intro
$(0.25541281188299536);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.25541281188299536);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.25541281188299536 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atanh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.25);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atanh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.25541281188299536
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
